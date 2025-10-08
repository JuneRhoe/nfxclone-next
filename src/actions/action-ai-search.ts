'use server'

import { cache } from 'react'
import {
  asc,
  ilike,
  or,
  eq,
  getTableColumns,
  sql,
  inArray,
  and,
  SQL,
} from 'drizzle-orm'
import type { AnyPgColumn } from 'drizzle-orm/pg-core'
import {
  mediaCasts,
  mediaGenres,
  medias,
} from '@/drizzle-definitions/table-aliases'
import { drizzleDB } from '@/libs/drizzle/drizzle-db'
import { type ParsedFilters } from 'types/filters'
import { MediaSelect } from '@/drizzle-definitions/data-types'

export interface SearchResult {
  filteredMedias: MediaSelect[]
  parsedFilters: ParsedFilters
}

/* Escape % and _ for LIKE/ILIKE patterns */
function escLike(v: string): string {
  return v.replace(/([\\%_])/g, '\\$1')
}

/* Toggle unaccent() usage (requires: CREATE EXTENSION IF NOT EXISTS unaccent;) */
const USE_UNACCENT = false

/* ILIKE helper that supports unaccent() when enabled */
function buildIlike(
  col: AnyPgColumn | SQL<unknown>,
  pattern: string,
): SQL<unknown> {
  if (USE_UNACCENT) {
    return sql`unaccent(${col}) ILIKE unaccent(${pattern})`
  }
  return ilike(col, pattern)
}

/* Case-insensitive equality helper (optionally with unaccent) */
function buildLowerEq(
  col: AnyPgColumn | SQL<unknown>,
  value: string,
): SQL<unknown> {
  if (USE_UNACCENT) {
    return sql`LOWER(unaccent(${col})) = LOWER(unaccent(${value}))`
  }
  return sql`LOWER(${col}) = LOWER(${value})`
}

/* Extract meaningful tokens from title phrases to enable partial matching. */
function titleTokens(title: string): string[] {
  const norm = (title ?? '')
    .toLowerCase()
    .replace(/&/g, ' ')
    .replace(/[^a-z0-9\u00c0-\u024f\- ]+/gi, ' ')
    .replace(/\s+/g, ' ')
    .trim()

  // Stopwords and overly generic tokens to avoid overmatching
  const STOP = new Set([
    'the',
    'a',
    'an',
    'of',
    'and',
    'in',
    'on',
    'for',
    'to',
    'with',
    'days',
    'future',
    'past',
    'real',
    'van',
    'kate',
    'les',
  ])

  const tokens = new Set<string>()

  for (const w of norm.split(' ')) {
    if (!w) continue
    if (STOP.has(w)) continue
    if (w.length < 4) continue // avoid very short tokens
    tokens.add(w)
  }

  // Preserve hyphenated tokens if base length >= 3 (e.g., x-men, john-wick)
  for (const w of norm.split(' ')) {
    if (w.includes('-') && w.replace(/-/g, '').length >= 3) {
      tokens.add(w)
    }
  }

  // Cap max tokens to keep SQL concise
  return Array.from(tokens).slice(0, 20)
}

/* Normalize incoming genre labels to canonical values if needed. Adjust map for your DB. */
function normalizeGenres(genres: unknown[]): string[] {
  // Basic normalization: trim, collapse spaces, dedupe (case-sensitive by default)
  const cleaned = (genres as string[])
    .filter((g) => typeof g === 'string')
    .map((g) => g.trim().replace(/\s+/g, ' '))
    .filter((g) => g.length > 0)

  // Ensure uniqueness and sort for stability
  return Array.from(new Set(cleaned)).sort()
}

/**
 * AI-driven search using parsed filters (genres, casts, titles, keywords).
 * Ensures partial title matching works (e.g., DB has "Matrix" when AI titles has "The Matrix").
 * Fallback chain avoids empty results without using any non-existent popularity column.
 */
export const aiSearchMedias = cache(async (pf: ParsedFilters) => {
  // --- Title clause: exact/phrase ILIKE OR token-based ILIKE ---
  let titleClause: SQL<unknown> | undefined
  if (Array.isArray(pf.titles) && pf.titles.length > 0) {
    const phraseOrs: (SQL<unknown> | undefined)[] = []
    for (const t of pf.titles) {
      const s = (t ?? '').trim()
      if (!s) continue
      phraseOrs.push(
        or(
          buildLowerEq(medias.title, s),
          buildIlike(medias.title, `%${escLike(s)}%`),
        ),
      )
    }

    const tokenSet = new Set<string>()
    for (const t of pf.titles)
      for (const tok of titleTokens(t)) tokenSet.add(tok)

    const tokenOrs: (SQL<unknown> | undefined)[] = []
    for (const tok of tokenSet) {
      tokenOrs.push(buildIlike(medias.title, `%${escLike(tok)}%`))
    }

    const combined = [...phraseOrs, ...tokenOrs].filter(
      Boolean,
    ) as SQL<unknown>[]
    if (combined.length) titleClause = or(...combined)
  }

  // --- Cast clause: any-of partial ILIKE ---
  let castClause: SQL<unknown> | undefined
  if (Array.isArray(pf.casts) && pf.casts.length > 0) {
    const ors = pf.casts
      .filter(Boolean)
      .map((name) => buildIlike(mediaCasts.cast, `%${escLike(name)}%`))
    if (ors.length) castClause = or(...ors)
  }

  // --- Genre clause: exact IN after normalization ---
  let genreClause: SQL<unknown> | undefined
  const normGenres = normalizeGenres(pf.genres)
  if (normGenres.length > 0) {
    genreClause = inArray(mediaGenres.genre, normGenres)
  }

  // --- Keyword fallback clause ---
  let kwClause: SQL<unknown> | undefined
  const kw = (pf.keywords ?? '').trim()
  if (kw.length > 0) {
    const like = `%${escLike(kw)}%`
    kwClause = or(
      buildIlike(medias.title, like),
      buildIlike(mediaCasts.cast, like),
      buildIlike(mediaGenres.genre, like),
    )
  }

  // --- Primary clause prefers (title OR cast) to avoid over-restricting ---
  let primary: SQL<unknown> | undefined
  if (titleClause && castClause) primary = or(titleClause, castClause)
  else primary = titleClause ?? castClause

  // --- Executor helper with light debug logging ---
  async function run(whereExpr: SQL<unknown> | undefined, limit = 60) {
    const filteredMedias = await drizzleDB
      .selectDistinct({ ...getTableColumns(medias) })
      .from(medias)
      .innerJoin(mediaCasts, eq(medias.id, mediaCasts.mediaId))
      .innerJoin(mediaGenres, eq(medias.id, mediaGenres.mediaId))
      .where(whereExpr ?? sql`TRUE`)
      .orderBy(asc(medias.id))
      .limit(limit)

    return { filteredMedias, parsedFilters: pf }
  }

  // -------------------- Fallback chain --------------------
  // 0) Title-only first → guarantees partial title hits appear (e.g., "Matrix" from "The Matrix")
  if (titleClause) {
    const rows = await run(titleClause)
    if (rows.filteredMedias.length) return rows
  }

  // 1) (title OR cast) AND genre
  if (primary && genreClause) {
    const rows = await run(and(primary, genreClause))
    if (rows.filteredMedias.length) return rows
  }

  // 2) title AND genre
  if (titleClause && genreClause) {
    const rows = await run(and(titleClause, genreClause))
    if (rows.filteredMedias.length) return rows
  }

  // 3) title OR cast
  if (titleClause && castClause) {
    const rows = await run(or(titleClause, castClause))
    if (rows.filteredMedias.length) return rows
  }

  // 4) cast AND genre
  if (castClause && genreClause) {
    const rows = await run(and(castClause, genreClause))
    if (rows.filteredMedias.length) return rows
  }

  // 5) cast only
  if (castClause) {
    const rows = await run(castClause)
    if (rows.filteredMedias.length) return rows
  }

  // 6) keywords (+ optional genre)
  if (kwClause && genreClause) {
    const rows = await run(and(kwClause, genreClause))
    if (rows.filteredMedias.length) return rows
  }
  if (kwClause) {
    const rows = await run(kwClause)
    if (rows.filteredMedias.length) return rows
  }

  // 7) final fallback: unfiltered minimal list (stable order; NO popularity)
  const filteredMedias = await drizzleDB
    .selectDistinct({ ...getTableColumns(medias) })
    .from(medias)
    .orderBy(asc(medias.id))
    .limit(30)

  return { filteredMedias, parsedFilters: pf }
})
