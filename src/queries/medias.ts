'use server'

import { cache } from 'react'
import { asc, eq } from 'drizzle-orm'
import { getTableColumns } from 'drizzle-orm/utils'
import {
  browsePreviewMediaList,
  mediaBrowseDisplay,
  mediaMainCategories,
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

export const getBrowseDisplayMediaInfo = cache(async () => {
  const mediaInfoList = await drizzleDB
    .select({
      mainCateIndex: mediaBrowseDisplay.mainCategory,
      mainCateLabel: mediaMainCategories.label,
      mediaInfo: {
        ...getTableColumns(medias),
      },
    })
    .from(mediaBrowseDisplay)
    .innerJoin(medias, eq(mediaBrowseDisplay.mainCategory, medias.mainCategory))
    .innerJoin(
      mediaMainCategories,
      eq(mediaBrowseDisplay.mainCategory, mediaMainCategories.id),
    )
    .orderBy(asc(mediaBrowseDisplay.id), asc(medias.id))

  const mainCategoryInfoMap = new Map<number, string>()
  const mediaInfoMap = new Map<number, MediaSelect[]>()

  for (const mediaInfo of mediaInfoList) {
    mainCategoryInfoMap.set(mediaInfo.mainCateIndex, mediaInfo.mainCateLabel)

    const mediaInfoList = mediaInfoMap.get(mediaInfo.mainCateIndex) || []
    mediaInfoList.push(mediaInfo.mediaInfo)
    mediaInfoMap.set(mediaInfo.mainCateIndex, mediaInfoList)
  }

  return {
    mainCategoryInfoMap,
    mediaInfoArray: Array.from(mediaInfoMap),
  }
})
