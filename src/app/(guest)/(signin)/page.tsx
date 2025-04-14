'use client'

import { useEffect } from 'react'
// import Link from 'next/link'
// import Button from '@/components/UI/Button/Button'
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
      {/* <div className="text-3xl font-bold underline">
        LogIn ({count}) ({themeMode})
      </div>
      <Button
        variant="contained"
        size="medium"
        LinkComponent={Link}
        href="/register"
      >
        Register
      </Button>
      <Button
        variant="contained"
        size="medium"
        LinkComponent={Link}
        href="/postres-test"
      >
        Postres Test
      </Button>
      <Button
        variant="contained"
        size="medium"
        LinkComponent={Link}
        href="/prisma-test"
      >
        Prisma Test
      </Button> */}
    </div>
  )
}
