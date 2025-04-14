import { NextRequest, NextResponse } from 'next/server'

const ALLOWED_ORIGINS = ['https://vecel.app']
const CORS_OPTIONS = {
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
}
const REGEX_MATCH_PATHS = /\/api\//i

export default function mwCORS(
  request: NextRequest,
  response: NextResponse<unknown>,
): NextResponse<unknown> {
  if (!request.nextUrl.pathname.match(REGEX_MATCH_PATHS)) {
    //
    //  * Match /api/:path*
    //
    return response
  }

  // Check the origin from the request
  const origin = request.headers.get('origin') ?? ''
  const isAllowedOrigin = ALLOWED_ORIGINS.includes(origin)

  // Handle preflighted requests
  const isPreflight = request.method === 'OPTIONS'

  if (isPreflight) {
    const preflightHeaders = {
      ...(isAllowedOrigin && { 'Access-Control-Allow-Origin': origin }),
      ...CORS_OPTIONS,
    }
    return NextResponse.json({}, { headers: preflightHeaders })
  }

  if (isAllowedOrigin) {
    response.headers.set('Access-Control-Allow-Origin', origin)
  }

  Object.entries(CORS_OPTIONS).forEach(([key, value]) => {
    response.headers.set(key, value)
  })

  return response
}
