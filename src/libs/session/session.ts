import 'server-only'

import { cookies } from 'next/headers'
import {
  COOKIE_EXPIRATION_TIME,
  COOKIE_SESSION_NAME,
  SessionPayload,
} from '@/libs/cookie/cookieDefinitions'
import { decryptCookie, encryptCookie } from '../cookie/utils'
import { drizzleDB } from '@/libs/drizzle/drizzle-db'
import { nfxCloneSessions } from 'drizzle-definitions/table-aliases'
import { eq } from 'drizzle-orm'

export async function createSession(userId: string) {
  const expiresAt = new Date(Date.now() + COOKIE_EXPIRATION_TIME)

  let insertedSession = null

  try {
    const insertedRecords = await drizzleDB
      .insert(nfxCloneSessions)
      .values({ userId, expiresAt: expiresAt.toISOString() })
      .returning({ id: nfxCloneSessions.id, userId: nfxCloneSessions.userId })

    insertedSession = insertedRecords[0]
  } catch (e) {
    console.error('Failed to create session', e)
  }

  if (!insertedSession) {
    return
  }

  const encryptedSession = await encryptCookie({
    id: insertedSession.id,
    userId: insertedSession.userId,
    expiresAt: expiresAt.toISOString(),
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
    await drizzleDB
      .update(nfxCloneSessions)
      .set({ expiresAt: expires.toISOString() })
      .where(eq(nfxCloneSessions.userId, decryptedSession?.userId))
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
    const upsertedRecords = await drizzleDB
      .insert(nfxCloneSessions)
      .values({ userId, expiresAt: expiresAt.toISOString() })
      .onConflictDoUpdate({
        target: nfxCloneSessions.userId,
        set: { expiresAt: expiresAt.toISOString() },
      })
      .returning()

    upsertedSession = upsertedRecords[0]
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

  try {
    const encryptedSession = cookieStore.get(COOKIE_SESSION_NAME)?.value
    const decryptedSession = await decryptCookie(encryptedSession)

    await drizzleDB
      .delete(nfxCloneSessions)
      .where(eq(nfxCloneSessions.id, decryptedSession?.id || ''))
  } catch (e) {
    console.error('Failed to delete session', e)
  }

  cookieStore.delete(COOKIE_SESSION_NAME)
}
