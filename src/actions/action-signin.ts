'use server'

import { z } from 'zod'
import { prisma } from '@/libs/prisma/prisma-db'
import { encryptData } from './auth-utils'
import { redirect } from 'next/navigation'
import { upsertSession } from '@/libs/session/session'
import { SIGNED_IN_DEFAULT_ROUTE } from '@/libs/middleware/mwDefinitions'

const SigninFormSchema = z.object({
  userId: z
    .string()
    .min(3, { message: 'User ID must be at least 3 characters long.' })
    .regex(/^[A-Za-z0-9]+$/, {
      message: 'User ID can only contain numbers and letters.',
    })
    .trim(),
  userPassword: z
    .string()
    .min(4, { message: 'Be at least 4 characters long' })
    // .regex(/[a-zA-Z]/, { message: 'Contain at least one letter.' })
    // .regex(/[0-9]/, { message: 'Contain at least one number.' })
    // .regex(/[^a-zA-Z0-9]/, {
    //   message: 'Contain at least one special character.',
    // })
    .trim(),
})

type FormState =
  | {
      errors?: {
        userId?: string[]
        userPassword?: string[]
      }
      message?: string
      signInError?: string
    }
  | undefined

const getSignedInUser = async (userId: string, userPassword: string) => {
  try {
    return await prisma.nfxCloneUsers.findFirst({
      where: {
        userId: {
          equals: userId,
          mode: 'insensitive',
        },
        userPassword: encryptData(userPassword),
      },
      select: {
        userId: true,
      },
    })
  } catch (e) {
    console.error('Failed to signed in', e)

    return null
  }
}

export async function signIn(
  redirectUrl: string | null,
  prevState: FormState | undefined,
  formData: FormData,
) {
  const validatedFields = SigninFormSchema.safeParse({
    userId: formData.get('userId'),
    userPassword: formData.get('userPassword'),
  })

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    }
  }

  const { userId, userPassword } = validatedFields.data

  const signedInUser = await getSignedInUser(userId, userPassword)

  if (!signedInUser) {
    return {
      signInError: 'Account information is not correct.',
    }
  }

  const upsertedSession = await upsertSession(signedInUser.userId)

  if (!upsertedSession) {
    return {
      signInError: 'Account information is not correct.',
    }
  }

  redirect(redirectUrl || SIGNED_IN_DEFAULT_ROUTE)
}
