'use client'

import {
  useActionState,
  useEffect,
  useRef,
  useState,
  useTransition,
} from 'react'
import { useSearchParams } from 'next/navigation'
import Link from '@mui/material/Link'
import InputField from '@/components/UI/InputField/InputField'
import Button from '@/components/UI/Button/Button'
import { signIn } from '@/actions/action-signin'
import { PATH_SIGN_UP } from '@/libs/definition-route'
import { getClientCookieValue } from '@/libs/cookie/utils'
import { COOKIE_USER_AUTO_REGISTERED } from '@/libs/cookie/cookieDefinitions'
import { autoRegister } from '@/actions/action-auto-register'
import { nanoid } from 'nanoid'

export function SignInForm() {
  const searchParams = useSearchParams()
  const redirectUrl = searchParams.get('redirectUrl')
  const signInWithRedirectUrl = signIn.bind(null, redirectUrl)

  const [formState, formAction, isPending] = useActionState(
    signInWithRedirectUrl,
    undefined,
  )

  const [isTestSignInPending, startTransition] = useTransition()

  const [userId, setUserId] = useState('')
  const [userPassword, setUserPassword] = useState('')
  const [isTestSignIn, setIsTestSignIn] = useState(false)

  const formRef = useRef<HTMLFormElement>(null)

  const [isAutoRegistered, setIsAutoRegistered] = useState<boolean | undefined>(
    undefined,
  )

  const isAutoRegisterAllowed = process.env.NEXT_PUBLIC_ALLOW_AUTO_REGISTER === '1'

  useEffect(() => {
    setIsAutoRegistered(
      getClientCookieValue(COOKIE_USER_AUTO_REGISTERED) === 'true'
    )
  }, [])

  useEffect(() => {
    if (!isAutoRegisterAllowed) {
      return
    }

    if (isAutoRegistered !== false || userId || userPassword) {
      return
    }

    const tmpUserId = `TEST-${nanoid()}`
    const tmpUserPassword = nanoid()

    setUserId(tmpUserId)
    setUserPassword(tmpUserPassword)
  }, [isAutoRegistered, userId, userPassword])

  useEffect(() => {
    if (!isAutoRegisterAllowed) {
      return
    }

    if (isAutoRegistered !== false || !userId || !userPassword) {
      return
    }

    const executeAutoRegister = async () => {
      await autoRegister(userId, userPassword)
    }

    executeAutoRegister()
  }, [isAutoRegistered, userId, userPassword])

  const isAutoRegistering = isAutoRegistered === false && isAutoRegisterAllowed

  return (
    <form
      ref={formRef}
      action={formAction}
      className="mt-0 flex h-full w-full flex-col gap-7 bg-black px-6 pt-20 text-white
        opacity-100 sm:h-fit sm:w-[28.5rem] sm:px-12 sm:pt-10 sm:pb-12 sm:opacity-80"
    >
      <div className="pb-3 text-3xl font-extrabold">Sign In</div>

      <InputField
        type="text"
        id="userId"
        name="userId"
        value={userId}
        label="User ID"
        size="small"
        helperText={<span>{formState?.errors?.userId?.at(0)}</span>}
        error={!!formState?.errors?.userId}
        onChange={(e) => setUserId(e.target.value)}
      />
      <InputField
        type="password"
        id="userPassword"
        name="userPassword"
        value={userPassword}
        label="Password"
        size="small"
        helperText={<span>{formState?.errors?.userPassword}</span>}
        error={!!formState?.errors?.userPassword}
        onChange={(e) => setUserPassword(e.target.value)}
      />

      {formState?.signInError && (
        <div className="rounded-md border-1 bg-[#d89d31] p-3 text-base text-black">
          <span className="font-extrabold">{formState?.signInError}</span>
          <br />
          Please try again.
        </div>
      )}

      <Button
        type="submit"
        size="medium"
        loading={isPending && !isTestSignIn}
        disabled={isTestSignIn || isAutoRegistering}
      >
        Sign In
      </Button>

      <div className="flex flex-wrap gap-2 text-base">
        <div>New to NetflixClone?</div>
        <Link href={PATH_SIGN_UP}>
          <span className="font-bold text-white hover:underline">
            Sign Up now.
          </span>
        </Link>
      </div>

      <div className="flex w-full justify-center py-2">OR</div>

      <div className="flex flex-col gap-5">
        <div className="flex flex-col items-center justify-center">
          <Button
            size="medium"
            fullWidth
            loading={(isTestSignInPending && isTestSignIn) || isAutoRegistering}
            onClick={() => {
              const tmpUserId = process.env.NEXT_PUBLIC_TESTID || ''
              const tmpUserPassword = process.env.NEXT_PUBLIC_TESTPW || ''

              setUserId(tmpUserId)
              setUserPassword(tmpUserPassword)

              setIsTestSignIn(true)

              startTransition(() => {
                if (!formRef.current) {
                  return
                }

                const formData = new FormData(formRef.current)
                formData.set('userId', tmpUserId)
                formData.set('userPassword', tmpUserPassword)
                formAction(formData)
              })
            }}
          >
            <span className="text-xl font-extrabold">
              Try Now – No Signup Needed
            </span>
          </Button>
        </div>
      </div>
    </form>
  )
}
