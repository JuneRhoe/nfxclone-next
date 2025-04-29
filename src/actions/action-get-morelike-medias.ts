'use server'

import { cache } from 'react'
import { countDistinct, or, eq } from 'drizzle-orm'
import { getTableColumns } from 'drizzle-orm/utils'
import {
  mediaMainCategories,
  medias,
} from '@/drizzle-definitions/table-aliases'
import { drizzleDB } from '@/libs/drizzle/drizzle-db'

const getMainCategorySize = cache(async () => {
  return (
    await drizzleDB
      .select({ value: countDistinct(mediaMainCategories.id) })
      .from(mediaMainCategories)
  )[0].value
})

const getMorelikeMedias = cache(
  async (firstCategoryIndex: number, secondCategoryIndex: number) =>
    await drizzleDB
      .select({
        ...getTableColumns(medias),
      })
      .from(medias)
      .where(
        or(
          eq(medias.mainCategory, firstCategoryIndex),
          eq(medias.mainCategory, secondCategoryIndex),
        ),
      ),
)

export const getMoreLikeMedias = cache(async (mainCategory: number) => {
  const firstCategoryIndex = mainCategory

  const categorySize = await getMainCategorySize()

  const getSecondCategoryIndex = () => {
    let secondCategoryIndex = firstCategoryIndex
    while (secondCategoryIndex === firstCategoryIndex) {
      secondCategoryIndex = Math.floor(Math.random() * categorySize + 1)
    }
    return secondCategoryIndex
  }
  const secondCategoryIndex = getSecondCategoryIndex()

  return await getMorelikeMedias(firstCategoryIndex, secondCategoryIndex)
})
