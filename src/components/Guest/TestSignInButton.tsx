import { useActionState, useRef, useTransition } from 'react'
import Button from '@/components/UI/Button/Button'
import { signIn } from '@/actions/action-signin'

export default function TestSignInButton() {
  const [, formAction] = useActionState(signIn.bind(null, null), undefined)
  const [isTestSignInPending, startTransition] = useTransition()

  const formRef = useRef<HTMLFormElement>(null)

  return (
    <form ref={formRef} action={formAction}>
      <Button
        variant="contained"
        size="medium"
        loading={isTestSignInPending}
        onClick={() => {
          startTransition(() => {
            if (!formRef.current) {
              return
            }

            const formData = new FormData(formRef.current)
            formData.set('userId', process.env.NEXT_PUBLIC_TESTID || '')
            formData.set('userPassword', process.env.NEXT_PUBLIC_TESTPW || '')
            formAction(formData)
          })
        }}
      >
        Test SignIn
      </Button>
    </form>
  )
}
