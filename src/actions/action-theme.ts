'use server'

import { cookies } from 'next/headers'
import { ThemeMode } from '@/styles/styleVariables'

export async function changeThemeMode(themeMode: ThemeMode) {
  const cookieStore = await cookies()

  cookieStore.set({
    name: 'themeMode',
    value: themeMode,
    path: '/',
  })
}
