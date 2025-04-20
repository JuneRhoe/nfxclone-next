'use server'

import { redirect } from 'next/navigation'
import { PATH_ROOT } from '@/libs/definition-route'
import { deleteSession } from '@/libs/session/session'

export async function signOut() {
  await deleteSession()
  redirect(PATH_ROOT)
}
