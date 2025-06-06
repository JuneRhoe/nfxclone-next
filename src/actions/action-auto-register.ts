'use server'

import { redirect } from 'next/navigation'
import { encryptData } from './utils-auth'
import { createSession } from '@/libs/session/session'
import { SIGNED_IN_DEFAULT_ROUTE } from '@/libs/middleware/mwDefinitions'
import { drizzleDB } from '@/libs/drizzle/drizzle-db'
import { nfxCloneUsers } from 'drizzle-definitions/table-aliases'
import { PATH_ROOT } from '@/libs/definition-route'
import { cookies } from 'next/headers'
import {
  COOKIE_EXPIRATION_TIME,
  COOKIE_USER_AUTO_REGISTERED,
} from '@/libs/cookie/cookieDefinitions'

export async function autoRegister(userId: string, userPassword: string) {
  let insertedUser = null

  try {
    const insertedRecords = await drizzleDB
      .insert(nfxCloneUsers)
      .values({
        userId,
        userPassword: encryptData(userPassword),
      })
      .returning({ userId: nfxCloneUsers.userId })

    insertedUser = insertedRecords[0]
  } catch (e) {
    console.error('Failed to register', e)
  }

  if (!insertedUser) {
    redirect(PATH_ROOT)
  }

  await createSession(insertedUser.userId)

  const cookieStore = await cookies()

  cookieStore.set(COOKIE_USER_AUTO_REGISTERED, 'true', {
    httpOnly: false,
    secure: false,
    expires: new Date(Date.now() + COOKIE_EXPIRATION_TIME),
    sameSite: 'lax',
    path: '/',
  })

  redirect(SIGNED_IN_DEFAULT_ROUTE)
}
