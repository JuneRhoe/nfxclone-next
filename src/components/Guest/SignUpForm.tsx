'use client'

import { useActionState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronRight } from '@fortawesome/free-solid-svg-icons'
import InputField from '@/components/UI/InputField/InputField'
import Button from '@/components/UI/Button/Button'
import { signUp } from '@/actions/action-signup'

export function SignUpForm() {
  const [formState, formAction, isPending] = useActionState(signUp, undefined)

  return (
    <form
      action={formAction}
      className="relative flex h-full w-full flex-col items-center gap-5 pt-10 text-white
        sm:justify-center sm:pt-0"
    >
      <div
        className="z-1 flex max-w-90 flex-col justify-center text-center text-4xl leading-12
          font-extrabold text-white"
      >
        <div>Unlimited movies, TV shows, and more</div>
        <div className="pt-1 text-base font-normal">
          Starts at $0.00. Cancel anytime.
        </div>
      </div>
      <div className="z-1 pt-1 text-base font-normal text-white">
        Ready to watch? Enter your user ID to create your membership.
      </div>
      <div className="z-1 flex h-[4rem] flex-wrap items-start justify-center gap-2 px-6 sm:p-0">
        <InputField
          type="text"
          id="userId"
          name="userId"
          label="User ID"
          size="small"
          helperText={<span>{formState?.errors?.userId?.at(0)}</span>}
          error={!!formState?.errors?.userId}
        />
        <Button type="submit" size="large" loading={isPending}>
          <div className="flex h-8 items-center gap-1">
            <div>Get Started</div>
            <FontAwesomeIcon icon={faChevronRight} fixedWidth />
          </div>
        </Button>
      </div>
    </form>
  )
}
