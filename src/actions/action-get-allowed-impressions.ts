'use server'

import { sql } from 'drizzle-orm';
import { drizzleDB } from '@/libs/drizzle/drizzle-db'

type Row = { unique_impressions: string[] | null };

let cache:
  | { values: string[]; fetchedAt: number }
  | null = null;

// Adjust TTL as needed
const TTL_MS = 5 * 60 * 1000; // 5 minutes

function normalizeImpressions(impressions: unknown[]): string[] {
  // Basic normalization: trim, collapse spaces, dedupe (case-sensitive by default)
  const cleaned = (impressions as string[])
    .filter((g) => typeof g === 'string')
    .map((g) => g.trim().replace(/\s+/g, ' '))
    .filter((g) => g.length > 0);
    
  // Ensure uniqueness and sort for stability
  return Array.from(new Set(cleaned)).sort();
}

export async function getAllowedImpressions(): Promise<string[]> {
  // Serve from cache if fresh
  if (cache && Date.now() - cache.fetchedAt < TTL_MS) {
    return cache.values;
  }

  // Raw SQL using Drizzle's tagged template
  const rows = (await drizzleDB.execute<Row>(sql`
    SELECT ARRAY_AGG(DISTINCT impression) AS unique_impressions
    FROM (
      SELECT unnest(impressions) AS impression
      FROM develop.medias
    ) AS all_impressions;
  `)) as unknown as Row[];

  const list = normalizeImpressions(rows?.[0]?.unique_impressions ?? []);
  cache = { values: list, fetchedAt: Date.now() };

  return list;
}
