'use client'

import { useEffect } from 'react'
import { useMainStore } from '@/libs/stores/mainStoreProvider'
import { SignUpForm } from '@/components/Guest/SignUpForm'

export default function SignUp() {
  const { changeThemeModeAction } = useMainStore((state) => state)

  useEffect(() => {
    changeThemeModeAction('dark')
  }, [changeThemeModeAction])

  return (
    <div className="flex h-full w-full items-center justify-center gap-5">
      <SignUpForm />
    </div>
  )
}
