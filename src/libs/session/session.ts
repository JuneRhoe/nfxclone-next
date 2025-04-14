import 'server-only'

import { cookies } from 'next/headers'
import {
  COOKIE_EXPIRATION_TIME,
  COOKIE_SESSION_NAME,
  SessionPayload,
} from '@/libs/cookie/cookieDefinitions'
import { prisma } from '../prisma/prisma-db'
import { decryptCookie, encryptCookie } from '../cookie/utils'

export async function createSession(userId: string) {
  const expiresAt = new Date(Date.now() + COOKIE_EXPIRATION_TIME)

  let insertedSession = null

  try {
    insertedSession = await prisma.nfxCloneSessions.create({
      data: { userId, expiresAt },
    })
  } catch (e) {
    console.error('Failed to create session', e)
  }

  if (!insertedSession) {
    return
  }

  const encryptedSession = await encryptCookie({
    id: insertedSession.id,
    userId: insertedSession.userId,
    expiresAt,
  })

  const cookieStore = await cookies()

  cookieStore.set(COOKIE_SESSION_NAME, encryptedSession, {
    httpOnly: true,
    secure: true,
    expires: expiresAt,
    sameSite: 'lax',
    path: '/',
  })
}

export async function updateSession(
  encryptedSessionParam?: string,
  decryptedSessionParam?: SessionPayload,
) {
  const cookieStore = await cookies()

  const encryptedSession =
    encryptedSessionParam || cookieStore.get(COOKIE_SESSION_NAME)?.value
  const decryptedSession =
    decryptedSessionParam || (await decryptCookie(encryptedSession))

  if (!encryptedSession || !decryptedSession) {
    return null
  }

  const prevExpires = new Date(decryptedSession.expiresAt)
  const expires = new Date(Date.now() + COOKIE_EXPIRATION_TIME)

  const isNoNeedToUpdate =
    (expires.getTime() - prevExpires.getTime()) / (24 * 60 * 60 * 1000) > 1

  if (isNoNeedToUpdate) {
    return
  }

  try {
    await prisma.nfxCloneSessions.update({
      where: {
        userId: decryptedSession?.userId,
      },
      data: {
        expiresAt: expires,
      },
    })
  } catch (e) {
    console.error('Failed to update session.', e)
  }

  cookieStore.set(COOKIE_SESSION_NAME, encryptedSession, {
    httpOnly: true,
    secure: true,
    expires,
    sameSite: 'lax',
    path: '/',
  })
}

export async function upsertSession(userId: string) {
  const expiresAt = new Date(Date.now() + COOKIE_EXPIRATION_TIME)

  let upsertedSession: SessionPayload | null = null

  try {
    upsertedSession = await prisma.nfxCloneSessions.upsert({
      where: { userId },
      update: { expiresAt },
      create: { userId, expiresAt },
    })
  } catch (e) {
    console.error('Failed to update session.', e)
  }

  if (!upsertedSession) {
    return null
  }

  const encryptedSession = await encryptCookie(upsertedSession)

  const cookieStore = await cookies()
  cookieStore.set(COOKIE_SESSION_NAME, encryptedSession, {
    httpOnly: true,
    secure: true,
    expires: expiresAt,
    sameSite: 'lax',
    path: '/',
  })

  return upsertedSession
}

export async function deleteSession() {
  const cookieStore = await cookies()

  // const encryptedSession = cookieStore.get(COOKIE_SESSION_NAME)?.value
  // const decryptedSession = await decryptCookie(encryptedSession)

  // try {
  //   await prisma.nfxCloneSessions.delete({
  //     where: { id: decryptedSession?.id },
  //   })
  // } catch (e) {
  //   console.error('Failed to delete session', e)
  // }

  cookieStore.delete(COOKIE_SESSION_NAME)
}
