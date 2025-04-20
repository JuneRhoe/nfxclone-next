import { cache } from 'react'
import { asc, eq, getTableColumns } from 'drizzle-orm'
import {
  browsePreviewMediaList,
  mediaBrowseDisplay,
  medias,
} from 'drizzle-definitions/table-aliases'
import { drizzleDB } from '@/libs/drizzle/drizzle-db'
import {
  MediaBrowseDisplaySelect,
  MediaSelect,
} from '@/drizzle-definitions/data-types'

export const getBrowsePreviewMediaInfoList = cache(async () => {
  const mediaInfoList: MediaSelect[] = await drizzleDB
    .select({ ...getTableColumns(medias) })
    .from(medias)
    .innerJoin(
      browsePreviewMediaList,
      eq(medias.id, browsePreviewMediaList.mediaId),
    )

  return mediaInfoList
})

export const getBrowseDisplayInfo = cache(async () => {
  const mainCategoryIds: Pick<MediaBrowseDisplaySelect, 'mainCategory'>[] =
    await drizzleDB
      .select({ mainCategory: mediaBrowseDisplay.mainCategory })
      .from(mediaBrowseDisplay)
      .orderBy(asc(mediaBrowseDisplay.id))

  return mainCategoryIds
})
