'use server'

import { sql } from 'drizzle-orm'
import { drizzleDB } from '@/libs/drizzle/drizzle-db'

type Row = { unique_genres: string[] | null }

let cache: { values: string[]; fetchedAt: number } | null = null

// Adjust TTL as needed
const TTL_MS = 5 * 60 * 1000 // 5 minutes

function normalizeGenres(genres: unknown[]): string[] {
  // Basic normalization: trim, collapse spaces, dedupe (case-sensitive by default)
  const cleaned = (genres as string[])
    .filter((g) => typeof g === 'string')
    .map((g) => g.trim().replace(/\s+/g, ' '))
    .filter((g) => g.length > 0)

  // Ensure uniqueness and sort for stability
  return Array.from(new Set(cleaned)).sort()
}

export async function getAllowedGenres(): Promise<string[]> {
  // Serve from cache if fresh
  if (cache && Date.now() - cache.fetchedAt < TTL_MS) {
    return cache.values
  }

  // Raw SQL using Drizzle's tagged template
  const rows = (await drizzleDB.execute<Row>(sql`
    SELECT ARRAY_AGG(DISTINCT genre) AS unique_genres
    FROM (
      SELECT unnest(genres) AS genre
      FROM develop.medias
    ) AS all_genres;
  `)) as unknown as Row[]

  const list = normalizeGenres(rows?.[0]?.unique_genres ?? [])
  cache = { values: list, fetchedAt: Date.now() }

  return list
}
