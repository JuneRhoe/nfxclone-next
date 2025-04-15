import 'server-only'

import { cache } from 'react'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { drizzleDB } from '@/libs/drizzle/drizzle-db'
import { decryptCookie } from '../cookie/utils'
import { COOKIE_SESSION_NAME } from '../cookie/cookieDefinitions'
import { deleteSession, updateSession } from './session'
import { nfxCloneSessions, nfxCloneUsers } from '@/drizzle-schema/table-aliases'
import { sql } from 'drizzle-orm'

export const verifySession = async (secureCheck?: boolean) => {
  console.log('-----verify--11111--')

  const encryptedSession = (await cookies()).get(COOKIE_SESSION_NAME)?.value
  const decryptedSession = await decryptCookie(encryptedSession)

  console.log('-----verify--2222--', encryptedSession, decryptedSession)

  // Optimistic check
  if (!decryptedSession?.userId) {
    await deleteSession()
    redirect('/')
  }

  // Secure check
  if (secureCheck) {
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
      redirect('/')
    }
  }

  await updateSession(encryptedSession, decryptedSession)

  return { isAuth: true, userId: decryptedSession.userId }
}

export const getUserInfo = cache(async () => {
  console.log('-----getUserInfo--11111--')
  const session = await verifySession(true)
  console.log('-----getUserInfo--22222--')

  if (!session) {
    return null
  }

  try {
    const recordUsers = await drizzleDB
      .select({ id: nfxCloneUsers.id, userId: nfxCloneUsers.userId })
      .from(nfxCloneUsers)
      .where(sql`${nfxCloneUsers.userId} = ${session.userId}`)
      .limit(1)

    return recordUsers[0]
  } catch (e) {
    console.log('Failed to fetch user', e)

    return null
  }
})
