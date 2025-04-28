'use server'

import { asc, ilike, or, eq, getTableColumns } from 'drizzle-orm'
import {
  mediaCasts,
  mediaGenres,
  medias,
} from '@/drizzle-definitions/table-aliases'
import { drizzleDB } from '@/libs/drizzle/drizzle-db'

export const searchMedias = async (queryKey: string) => {
  return await drizzleDB
    .selectDistinct({
      ...getTableColumns(medias),
    })
    .from(medias)
    .innerJoin(mediaCasts, eq(medias.id, mediaCasts.mediaId))
    .innerJoin(mediaGenres, eq(medias.id, mediaGenres.mediaId))
    .where(
      or(
        ilike(medias.title, `%${queryKey}%`),
        ilike(mediaCasts.cast, `%${queryKey}%`),
        ilike(mediaGenres.genre, `%${queryKey}%`),
      ),
    )
    .orderBy(asc(medias.id))
}
