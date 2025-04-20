import 'server-only'

import { cache } from 'react'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { drizzleDB } from '@/libs/drizzle/drizzle-db'
import { decryptCookie } from '../cookie/utils'
import { COOKIE_SESSION_NAME } from '../cookie/cookieDefinitions'
import { deleteSession, updateSession } from './session'
import {
  nfxCloneSessions,
  nfxCloneUsers,
} from 'drizzle-definitions/table-aliases'
import { sql } from 'drizzle-orm'
import { PATH_ROOT } from '@/libs/definition-route'

export const getUserIdFromSession = async (fromDB?: boolean) => {
  const encryptedSession = (await cookies()).get(COOKIE_SESSION_NAME)?.value
  const decryptedSession = await decryptCookie(encryptedSession)

  // Optimistic check
  if (!decryptedSession?.userId) {
    await deleteSession()
    return null
  }

  // Secure check
  if (fromDB) {
    let storedSession = null

    try {
      const sessionRecords = await drizzleDB
        .select({ userId: nfxCloneSessions.userId })
        .from(nfxCloneSessions)
        .where(sql`${nfxCloneSessions.id} = ${decryptedSession.id}`)
        .limit(1)

      storedSession = sessionRecords[0]
    } catch (e) {
      console.error('Failed to find session', e)
    }

    if (!storedSession) {
      await deleteSession()
      return null
    }
  }

  await updateSession(encryptedSession, decryptedSession)

  return decryptedSession.userId
}

export const getUserInfo = cache(async () => {
  const userId = await getUserIdFromSession(true)

  if (!userId) {
    redirect(PATH_ROOT)
  }

  try {
    const recordUsers = await drizzleDB
      .select({ id: nfxCloneUsers.id, userId: nfxCloneUsers.userId })
      .from(nfxCloneUsers)
      .where(sql`${nfxCloneUsers.userId} = ${userId}`)
      .limit(1)

    return recordUsers[0]
  } catch (e) {
    console.log('Failed to fetch user', e)

    return null
  }
})
