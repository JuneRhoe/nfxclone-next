import { z } from 'zod'

export const MAX_NUM_TITLE_FILTERS = 30

export type ParsedFilters = {
  genres: string[] // constrained to DB list
  impressions?: string[] // optional; UI/re-ranking only
  yearRange?: [number, number] // inclusive [from, to]
  keywords?: string // optional fallback keywords
  titles?: string[]
  titleExact?: string // exact movie/series title (case-insensitive compare)
  titleKeywords?: string // partial title keywords
  casts?: string[] // actor/actress names (max 3 recommended)
}

export const ParsedFiltersSchema = z.object({
  genres: z.array(z.string()).default([]),
  impressions: z.array(z.string()).optional(),
  yearRange: z.tuple([z.number().int(), z.number().int()]).optional(),
  keywords: z.string().optional(),
  titles: z.array(z.string()).max(MAX_NUM_TITLE_FILTERS).default([]), // <- required key with default([])
  titleExact: z.string().optional(),
  titleKeywords: z.string().optional(),
  casts: z.array(z.string()).max(3).optional(),
})

export type ParsedFiltersSafe = z.infer<typeof ParsedFiltersSchema>
