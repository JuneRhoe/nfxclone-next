'use server'

import { cache } from 'react'
import { asc, eq } from 'drizzle-orm'
import { getTableColumns } from 'drizzle-orm/utils'
import {
  medias,
  nfxCloneUsers,
  usersMyMedias,
} from '@/drizzle-definitions/table-aliases'
import { drizzleDB } from '@/libs/drizzle/drizzle-db'
import { getUserInfo } from './action-userinfo'

export const getUsersMyMedias = cache(async () => {
  const userId = (await getUserInfo())?.userId || ''

  const userUuidRecord = drizzleDB
    .select({ userUuid: nfxCloneUsers.id })
    .from(nfxCloneUsers)
    .where(eq(nfxCloneUsers.userId, userId))
    .limit(1)

  return await drizzleDB
    .select({
      ...getTableColumns(medias),
    })
    .from(usersMyMedias)
    .where(eq(usersMyMedias.userUuid, userUuidRecord))
    .innerJoin(medias, eq(usersMyMedias.mediaId, medias.id))
    .orderBy(asc(usersMyMedias.id))
})
