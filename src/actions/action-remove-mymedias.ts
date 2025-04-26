'use server'

import { and, eq } from 'drizzle-orm'
import {
  nfxCloneUsers,
  usersMyMedias,
} from '@/drizzle-definitions/table-aliases'
import { drizzleDB } from '@/libs/drizzle/drizzle-db'

export const removeUsersMyMedia = async (
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
    .delete(usersMyMedias)
    .where(
      and(
        eq(usersMyMedias.userUuid, userUuidRecord[0].userUuid),
        eq(usersMyMedias.mediaId, mediaId),
      ),
    )
}
