import 'server-only'

import { cache } from 'react'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { prisma } from '@/libs/prisma/prisma-db'
import { decryptCookie } from '../cookie/utils'
import { COOKIE_SESSION_NAME } from '../cookie/cookieDefinitions'
import { deleteSession, updateSession } from './session'

export const verifySession = async (secureCheck?: boolean) => {
  const encryptedSession = (await cookies()).get(COOKIE_SESSION_NAME)?.value
  const decryptedSession = await decryptCookie(encryptedSession)

  // Optimistic check
  if (!decryptedSession?.userId) {
    await deleteSession()
    redirect('/')
  }

  // Secure check
  if (secureCheck) {
    let storedSession = null

    try {
      storedSession = await prisma.nfxCloneSessions.findUnique({
        where: { id: decryptedSession.id },
      })
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
  const session = await verifySession(true)

  if (!session) {
    return null
  }

  try {
    return await prisma.nfxCloneUsers.findUnique({
      where: { userId: session.userId },
      select: { id: true, userId: true },
    })
  } catch (e) {
    console.log('Failed to fetch user', e)

    return null
  }
})
