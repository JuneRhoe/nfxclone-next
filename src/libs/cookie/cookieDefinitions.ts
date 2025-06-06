export const COOKIE_EXPIRATION_TIME = 7 * 24 * 60 * 60 * 1000
export const COOKIE_TMP_USER_ID_NAME = 'cookie_tmp_user_id'
export const COOKIE_SESSION_NAME = process.env.SESSION_NAME || ''
export const COOKIE_ENCRYPT_ALGORITHM = 'HS256'
export const COOKIE_EXPIRATION_DAYS = '7d'
export const COOKIE_ENCRYPT_KEY = new TextEncoder().encode(
  process.env.SESSION_SECRET,
)

export const COOKIE_USER_AUTO_REGISTERED = 'nfxcln_user_auto_registered'

export type SessionPayload = {
  id: string
  userId: string
  expiresAt: string
}
