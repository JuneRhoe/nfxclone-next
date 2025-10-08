'use server'

import { cache } from 'react'
import { asc, ilike, or, eq, getTableColumns } from 'drizzle-orm'
import {
  mediaCasts,
  mediaGenres,
  medias,
} from '@/drizzle-definitions/table-aliases'
import { drizzleDB } from '@/libs/drizzle/drizzle-db'

export const searchMedias = cache(async (searchKey: string) => {
  return await drizzleDB
    .selectDistinct({
      ...getTableColumns(medias),
    })
    .from(medias)
    .innerJoin(mediaCasts, eq(medias.id, mediaCasts.mediaId))
    .innerJoin(mediaGenres, eq(medias.id, mediaGenres.mediaId))
    .where(
      or(
        ilike(medias.title, `%${searchKey}%`),
        ilike(mediaCasts.cast, `%${searchKey}%`),
        ilike(mediaGenres.genre, `%${searchKey}%`),
      ),
    )
    .orderBy(asc(medias.id))
})
