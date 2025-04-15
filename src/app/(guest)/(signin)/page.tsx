'use client'

import { useEffect } from 'react'
import { useMainStore } from '@/libs/stores/mainStoreProvider'
import { SignInForm } from '@/components/Guest/SignInForm'

export default function LogIn() {
  const { changeThemeModeAction } = useMainStore((state) => state)

  useEffect(() => {
    changeThemeModeAction('dark')
  }, [changeThemeModeAction])

  return (
    <div className="flex h-full w-full items-center justify-center">
      <SignInForm />
    </div>
  )
}
