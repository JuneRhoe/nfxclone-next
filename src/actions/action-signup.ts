'use server'

import { redirect } from 'next/navigation'
import { z } from 'zod'
import { findUser } from './query-utils'
import { cookies } from 'next/headers'
import {
  COOKIE_EXPIRATION_TIME,
  COOKIE_TMP_USER_ID_NAME,
} from '@/libs/cookie/cookieDefinitions'

const SignupFormSchema = z.object({
  userId: z
    .string()
    .min(3, { message: 'User ID must be at least 3 characters long.' })
    .regex(/^[A-Za-z0-9]+$/, {
      message: 'User ID can only contain numbers and letters.',
    })
    .trim(),
})

type FormState =
  | {
      errors?: {
        userId?: string[]
      }
      message?: string
    }
  | undefined

export async function signUp(
  prevState: FormState | undefined,
  formData: FormData,
) {
  const validatedFields = SignupFormSchema.safeParse({
    userId: formData.get('userId'),
  })

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    }
  }

  const { userId } = validatedFields.data

  const user = await findUser(userId)

  if (user) {
    return {
      errors: {
        userId: ['That user ID is already taken. Please try another.'],
      },
    }
  }

  const cookieStore = await cookies()
  cookieStore.set(COOKIE_TMP_USER_ID_NAME, userId, {
    httpOnly: false,
    secure: false,
    expires: new Date(Date.now() + COOKIE_EXPIRATION_TIME),
    sameSite: 'lax',
    path: '/',
  })

  redirect('/register')
}
