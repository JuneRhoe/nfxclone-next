import { NextRequest, NextResponse } from 'next/server'
import { COOKIE_SESSION_NAME } from '@/libs/cookie/cookieDefinitions'
import { decryptCookie } from '@/libs/cookie/utils'
import {
  REGEX_IGNORE_PATHS,
  REGEX_PROTECTED_ROUTES,
  REGEX_SIGNED_IN_DEFAULT_ROUTE,
  SIGNED_IN_DEFAULT_ROUTE,
} from './mwDefinitions'

export default async function mwAuth(
  request: NextRequest,
  response: NextResponse<unknown>,
) {
  if (request.nextUrl.pathname.match(REGEX_IGNORE_PATHS)) {
    //
    //  * Match all request paths except for the ones starting with:
    //  * - api (API routes)
    //  * - _next/static (static files)
    //  * - _next/image (image optimization files)
    //  * - favicon.ico (favicon file)
    //
    return response
  }

  const isProtectedRoute = request.nextUrl.pathname.match(
    REGEX_PROTECTED_ROUTES,
  )

  const encryptedSession = request.cookies.get(COOKIE_SESSION_NAME)?.value
  const decryptedSession = await decryptCookie(encryptedSession)

  if (isProtectedRoute && !decryptedSession?.userId) {
    return NextResponse.redirect(new URL('/', request.nextUrl))
  }

  if (
    !isProtectedRoute &&
    decryptedSession?.userId &&
    !request.nextUrl.pathname.match(REGEX_SIGNED_IN_DEFAULT_ROUTE)
  ) {
    return NextResponse.redirect(
      new URL(SIGNED_IN_DEFAULT_ROUTE, request.nextUrl),
    )
  }

  return response
}
