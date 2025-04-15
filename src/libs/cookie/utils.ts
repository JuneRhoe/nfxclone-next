import { SignJWT } from 'jose/jwt/sign'
import { jwtVerify } from 'jose/jwt/verify'
import {
  COOKIE_ENCRYPT_ALGORITHM,
  COOKIE_ENCRYPT_KEY,
  COOKIE_EXPIRATION_DAYS,
  SessionPayload,
} from './cookieDefinitions'

export function getClientCookieValue(cookieName: string): string | undefined {
  const cookieValue = document.cookie
    .split('; ')
    .find((row) => row.startsWith(`${cookieName}=`))
    ?.split('=')[1]

  return cookieValue
}

export async function encryptCookie(payload: SessionPayload) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: COOKIE_ENCRYPT_ALGORITHM })
    .setIssuedAt()
    .setExpirationTime(COOKIE_EXPIRATION_DAYS)
    .sign(COOKIE_ENCRYPT_KEY)
}

export async function decryptCookie(
  session: string | undefined = '',
): Promise<SessionPayload | undefined> {
  if (!session) {
    return
  }

  try {
    const { payload } = await jwtVerify<SessionPayload>(
      session,
      COOKIE_ENCRYPT_KEY,
      {
        algorithms: [COOKIE_ENCRYPT_ALGORITHM],
      },
    )

    return payload
  } catch (error) {
    console.log(`Failed to verify session (${session})`, error)
  }
}
