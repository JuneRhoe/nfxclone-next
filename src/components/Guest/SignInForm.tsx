'use client'

import { useActionState, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from '@mui/material/Link'
import InputField from '@/components/UI/InputField/InputField'
import Button from '@/components/UI/Button/Button'
import { signIn } from '@/actions/action-signin'

export function SignInForm() {
  const searchParams = useSearchParams()
  const redirectUrl = searchParams.get('redirectUrl')
  const signInWithRedirectUrl = signIn.bind(null, redirectUrl)

  const [formState, formAction, isPending] = useActionState(
    signInWithRedirectUrl,
    undefined,
  )

  const [userId, setUserId] = useState('')

  return (
    <form
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
        label="Password"
        size="small"
        helperText={<span>{formState?.errors?.userPassword}</span>}
        error={!!formState?.errors?.userPassword}
      />

      {formState?.signInError && (
        <div className="rounded-md border-1 bg-[#d89d31] p-3 text-base text-black">
          <span className="font-extrabold">{formState?.signInError}</span>
          <br />
          Please try again.
        </div>
      )}

      <div className="flex flex-col gap-3">
        <Button type="submit" size="medium" loading={isPending}>
          Sign In
        </Button>

        <div className="flex w-full justify-center">OR</div>

        <Button size="medium" themeMode="secondary" onClick={() => {}}>
          Sign In with TEST ID
        </Button>
      </div>

      <div className="flex flex-wrap gap-2 text-base">
        <div>New to NetflixClone?</div>
        <Link href="/signup">
          <span className="font-bold text-white hover:underline">
            Sign Up now.
          </span>
        </Link>
      </div>
    </form>
  )
}
