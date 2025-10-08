import { NextRequest } from 'next/server'
import { ai, DEFAULT_MODEL } from '@/libs/ai/googleGemini'
import { getAllowedGenres } from '@/actions/action-get-allowed-genres'
import { getAllowedImpressions } from '@/actions/action-get-allowed-impressions'
import {
  MAX_NUM_TITLE_FILTERS,
  ParsedFilters,
  ParsedFiltersSchema,
} from 'types/filters'
import { aiSearchMedias } from '@/actions/action-ai-search'

export const runtime = 'nodejs'

const ENUM_LIMIT = 300
const CACHE_TTL_MS = 5 * 60_000 // 5 minutes

const memoryCache = new Map<string, { at: number; data: ParsedFilters }>()

function cacheGet(key: string) {
  const hit = memoryCache.get(key)
  if (!hit) return null
  if (Date.now() - hit.at > CACHE_TTL_MS) {
    memoryCache.delete(key)
    return null
  }
  return hit.data
}

function cacheSet(key: string, data: ParsedFilters) {
  memoryCache.set(key, { at: Date.now(), data })
}

export async function POST(req: NextRequest) {
  const { query } = await req.json()

  // Simple in-memory cache for identical NL queries
  const cacheKey = `pf:${query}`
  const cached = cacheGet(cacheKey)

  if (cached) {
    const medias = await aiSearchMedias(cached)

    return Response.json(medias)
  }

  // Load enum values for genres
  const allowedGenres = await getAllowedGenres()
  const genreItems =
    allowedGenres.length > 0 && allowedGenres.length <= ENUM_LIMIT
      ? { type: 'string', enum: allowedGenres }
      : { type: 'string' }

  const allowedImpressions = await getAllowedImpressions()
  const impressionItems =
    allowedImpressions.length > 0 && allowedImpressions.length <= ENUM_LIMIT
      ? { type: 'string', enum: allowedImpressions }
      : { type: 'string' }

  // Call Gemini with structured output. No language, no minRating.
  const response = await ai.models.generateContent({
    model: DEFAULT_MODEL,
    contents: [
      {
        text: [
          'You convert natural-language movie or TV intents into strict JSON filters.',
          `Map relative time like 'after 2018' to yearRange [2018, currentYear].`,
          'Only return JSON. Do not add explanations.',
          "- Use only the provided enum for 'genres' and 'impressions'.",
          '- Do not include language or minRating fields.',
          `- Propose up to ${MAX_NUM_TITLE_FILTERS} widely released feature film titles in 'titles'.`,
          "- If the user requests 'Marvel hero movies', include representative MCU films.",
          "- If the user requests 'Hugh Jackman movies', include his notable films.",
          '- Do not invent non-existent or unreleased titles.',
          "- If unsure, leave 'titles' empty; server will handle fallback.",
        ].join('\n'),
      },
      { text: `User query: ${query}` },
    ],
    config: {
      responseMimeType: 'application/json',
      responseSchema: {
        type: 'object',
        properties: {
          genres: { type: 'array', items: genreItems, minItems: 0 },
          impressions: {
            type: 'array',
            items: impressionItems,
            minItems: 0,
            maxItems: 5,
          },
          yearRange: {
            type: 'array',
            items: { type: 'integer' },
            minItems: 2,
            maxItems: 2,
          },
          keywords: { type: 'string' },
          titles: {
            type: 'array',
            items: { type: 'string' },
            minItems: 0,
            maxItems: MAX_NUM_TITLE_FILTERS,
          },
          titleExact: { type: 'string' },
          titleKeywords: { type: 'string' },
          casts: {
            type: 'array',
            items: { type: 'string' },
            minItems: 0,
            maxItems: 5,
          },
        },
        required: ['genres'],
        additionalProperties: false,
      },
    },
  })

  // Defensive parse and normalization
  const raw = response.text ? JSON.parse(response.text) : {}

  // Ensure genres are within DB enum
  if (Array.isArray(raw.genres) && allowedGenres.length > 0) {
    const genresSet = new Set(allowedGenres)
    raw.genres = raw.genres.filter((genre: string) => genresSet.has(genre))
  } else {
    raw.genres = []
  }

  // Ensure impressions are within DB enum
  if (Array.isArray(raw.impressions) && allowedImpressions.length > 0) {
    const impressionSet = new Set(allowedImpressions)
    raw.impressions = raw.impressions.filter((impression: string) =>
      impressionSet.has(impression),
    )
  } else {
    raw.impressions = []
  }

  if (!Array.isArray(raw.titles)) raw.titles = []
  {
    const seen = new Set<string>()
    raw.titles = raw.titles
      .map((t: string) => (typeof t === 'string' ? t.trim() : ''))
      .filter((t: string) => t.length > 0)
      .filter((t: string) => {
        const k = t.toLowerCase()
        if (seen.has(k)) return false
        seen.add(k)
        return true
      })
      .slice(0, MAX_NUM_TITLE_FILTERS)
  }

  // Validate final shape
  const parsed = ParsedFiltersSchema.parse(raw)

  cacheSet(cacheKey, parsed)

  const medias = await aiSearchMedias(parsed)

  return Response.json(medias)
}
