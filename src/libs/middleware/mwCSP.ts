import { NextRequest, NextResponse } from 'next/server'

const REGEX_IGNORE_PATHS = /\/api\/|_next\/static|_next\/image|favicon.ico/i

export default function mwCSP(
  request: NextRequest,
  response: NextResponse<unknown>,
): NextResponse<unknown> {
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

  if (request.headers.has('next-router-prefetch')) {
    return response
  }

  if ((request.headers.get('purpose') || '').toLowerCase() === 'prefetch') {
    return response
  }

  const nonce = Buffer.from(crypto.randomUUID()).toString('base64')

  //  https://github.com/vercel/next.js/issues/74319
  //  style-src 'self' 'nonce-${nonce}';
  //  style-src 'self' 'unsafe-inline';

  const cspHeader = `
    default-src 'self';
    script-src 'self' 'nonce-${nonce}' 'strict-dynamic' https:;
    style-src 'self' 'unsafe-inline';
    img-src 'self' blob: data:;
    font-src 'self';
    object-src 'none';
    base-uri 'self';
    form-action 'self';
    frame-ancestors 'none';
    upgrade-insecure-requests;
  `

  // const cspHeader = `
  //   default-src 'self';
  //   script-src 'self' 'nonce-${nonce}' 'strict-dynamic' https: http: ${
  //     process.env.NODE_ENV === 'production' ? '' : `'unsafe-eval'`
  //   };
  //   style-src 'self' 'nonce-${nonce}';
  //   img-src 'self' blob: data:;
  //   font-src 'self';
  //   object-src 'none';
  //   base-uri 'self';
  //   form-action 'self';
  //   frame-ancestors 'none';
  //   upgrade-insecure-requests;
  // `

  // Replace newline characters and spaces
  const contentSecurityPolicyHeaderValue = cspHeader
    .replace(/\s{2,}/g, ' ')
    .trim()

  response.headers.set('x-nonce', nonce)
  response.headers.set(
    'Content-Security-Policy',
    contentSecurityPolicyHeaderValue,
  )

  return response
}
