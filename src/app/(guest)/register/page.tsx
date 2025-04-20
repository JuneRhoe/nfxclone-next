'use client'

import { useEffect } from 'react'
import { useMainStore } from '@/libs/stores/mainStoreProvider'
import { RegisterForm } from '@/components/Guest/RegisterForm'

export default function RegisterPage() {
  const { changeThemeModeAction } = useMainStore((state) => state)

  useEffect(() => {
    changeThemeModeAction('light')

    return () => {
      changeThemeModeAction('dark')
    }
  }, [changeThemeModeAction])

  return (
    <div className="flex h-full w-full items-center justify-center">
      <RegisterForm />
    </div>
  )
}
