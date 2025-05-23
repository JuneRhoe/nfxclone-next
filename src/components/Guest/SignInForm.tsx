'use client'

import { useActionState, useRef, useState, useTransition } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from '@mui/material/Link'
import InputField from '@/components/UI/InputField/InputField'
import Button from '@/components/UI/Button/Button'
import { signIn } from '@/actions/action-signin'
import { PATH_SIGN_UP } from '@/libs/definition-route'

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

  return (
    <form
      ref={formRef}
      action={formAction}
      className="mt-0 flex h-full w-full flex-col gap-7 bg-black px-6 pt-20 text-white
        opacity-100 sm:h-fit sm:w-[28.5rem] sm:px-12 sm:pt-10 sm:pb-12 sm:opacity-80"
    >
      <div className="pb-3 text-3xl font-extrabold">Sign In</div>

      <div className="flex flex-col gap-5">
        <div className="flex flex-col items-center justify-center">
          <div className="flex w-full flex-col gap-2 border-t-3 border-b-3 border-blue-400 py-2">
            <div
              className="flex animate-pulse justify-center text-center text-base font-extrabold
                text-blue-400 sm:text-sm"
            >
              * Please click the button below for quick testing.
            </div>

            <Button
              size="medium"
              fullWidth
              onClick={() => {
                setIsTestSignIn(true)

                startTransition(() => {
                  if (!formRef.current) {
                    return
                  }

                  const formData = new FormData(formRef.current)
                  formData.set('userId', process.env.NEXT_PUBLIC_TESTID || '')
                  formData.set(
                    'userPassword',
                    process.env.NEXT_PUBLIC_TESTPW || '',
                  )
                  formAction(formData)
                })
              }}
              loading={isTestSignInPending && isTestSignIn}
            >
              Sign In with TEST ID
            </Button>
          </div>
        </div>

        <div className="flex w-full justify-center">OR</div>
      </div>

      <InputField
        type="text"
        id="userId"
        name="userId"
        value={userId}
        label="User ID"
        size="small"
        helperText={<span>{formState?.errors?.userId?.at(0)}</span>}
        error={!!formState?.errors?.userId}
        disabled={isPending}
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
        disabled={isPending}
        onChange={(e) => setUserPassword(e.target.value)}
      />

      {formState?.signInError && (
        <div className="rounded-md border-1 bg-[#d89d31] p-3 text-base text-black">
          <span className="font-extrabold">{formState?.signInError}</span>
          <br />
          Please try again.
        </div>
      )}

      <Button type="submit" size="medium" loading={isPending && !isTestSignIn}>
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
    </form>
  )
}
