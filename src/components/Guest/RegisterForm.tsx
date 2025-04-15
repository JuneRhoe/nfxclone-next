'use client'

import { useActionState, useEffect, useState } from 'react'
import InputField from '@/components/UI/InputField/InputField'
import Button from '@/components/UI/Button/Button'
import { register } from '@/actions/action-register'
import { getClientCookieValue } from '@/libs/cookie/utils'
import { COOKIE_TMP_USER_ID_NAME } from '@/libs/cookie/cookieDefinitions'

export function RegisterForm() {
  const [formState, formAction, isPending] = useActionState(register, undefined)
  const [userId, setUserId] = useState('')
  const [userPassword, setUserPassword] = useState('')

  useEffect(() => {
    setUserId(getClientCookieValue(COOKIE_TMP_USER_ID_NAME) || '')
  }, [])

  return (
    <form
      action={formAction}
      className="flex h-full w-full flex-col items-start gap-4 px-6 pt-10 sm:w-100
        sm:justify-center sm:p-0 sm:pt-0"
    >
      <div className="pb-5 text-3xl font-extrabold text-gray-800">
        Create a password to start your membership
      </div>

      <InputField
        type="text"
        id="userId"
        name="userId"
        label="User ID"
        size="small"
        colorMode="light"
        value={userId}
        onChange={(e) => setUserId(e.target.value)}
        fullWidth
        helperText={<span>{formState?.errors?.userId?.at(0)}</span>}
        error={!!formState?.errors?.userId}
      />
      <InputField
        type="password"
        id="userPassword"
        name="userPassword"
        label="Password"
        size="small"
        colorMode="light"
        value={userPassword}
        onChange={(e) => setUserPassword(e.target.value)}
        fullWidth
        helperText={<span>{formState?.errors?.userPassword}</span>}
        error={!!formState?.errors?.userPassword}
      />

      <Button type="submit" size="large" loading={isPending} fullWidth>
        Register
      </Button>
    </form>
  )
}
