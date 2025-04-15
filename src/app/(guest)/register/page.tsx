'use client'

import { useEffect } from 'react'
import { useMainStore } from '@/libs/stores/mainStoreProvider'
import { RegisterForm } from '@/components/Guest/RegisterForm'

export default function Register() {
  const { changeThemeModeAction } = useMainStore((state) => state)

  useEffect(() => {
    changeThemeModeAction('light')
  }, [changeThemeModeAction])

  return (
    <div className="flex h-full w-full items-center justify-center">
      <RegisterForm />
    </div>
  )
}
