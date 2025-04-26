'use server'

import { eq } from 'drizzle-orm'
import {
  nfxCloneUsers,
  usersMyMedias,
} from '@/drizzle-definitions/table-aliases'
import { drizzleDB } from '@/libs/drizzle/drizzle-db'

export const addUsersMyMedia = async (
  userId: string | undefined,
  mediaId: number,
) => {
  if (!userId) {
    return
  }

  const userUuidRecord = await drizzleDB
    .select({ userUuid: nfxCloneUsers.id })
    .from(nfxCloneUsers)
    .where(eq(nfxCloneUsers.userId, userId))
    .limit(1)

  await drizzleDB
    .insert(usersMyMedias)
    .values({ userUuid: userUuidRecord[0].userUuid, mediaId })
}
