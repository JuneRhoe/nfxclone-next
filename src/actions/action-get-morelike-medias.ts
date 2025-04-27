'use server'

import { cache } from 'react'
import { countDistinct, or, eq } from 'drizzle-orm'
import { getTableColumns } from 'drizzle-orm/utils'
import {
  mediaMainCategories,
  medias,
} from '@/drizzle-definitions/table-aliases'
import { drizzleDB } from '@/libs/drizzle/drizzle-db'

export const getMoreLikeMedias = cache(async (mainCategory: number) => {
  const firstCategoryIndex = mainCategory

  const categorySizeRecord = await drizzleDB
    .select({ value: countDistinct(mediaMainCategories.id) })
    .from(mediaMainCategories)

  const categorySize = categorySizeRecord[0].value

  const secondCategoryIndex = () => {
    let secondCategoryIndex = firstCategoryIndex
    while (secondCategoryIndex === firstCategoryIndex) {
      secondCategoryIndex = Math.floor(Math.random() * categorySize + 1)
    }
    return secondCategoryIndex
  }

  const morelikeMedias = await drizzleDB
    .select({
      ...getTableColumns(medias),
    })
    .from(medias)
    .where(
      or(
        eq(medias.mainCategory, firstCategoryIndex),
        eq(medias.mainCategory, secondCategoryIndex()),
      ),
    )

  return morelikeMedias
})
