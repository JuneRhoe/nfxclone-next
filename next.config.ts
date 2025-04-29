import type { NextConfig } from 'next'

// const cspHeader = `
//     default-src 'self';
//     script-src 'self' 'unsafe-eval' 'unsafe-inline';
//     style-src 'self' 'unsafe-inline';
//     img-src 'self' blob: data:;
//     font-src 'self';
//     object-src 'none';
//     base-uri 'self';
//     form-action 'self';
//     frame-ancestors 'none';
//     upgrade-insecure-requests;
// `

const nextConfig: NextConfig = {
  // async headers() {
  //   return [
  //     {
  //       source: '/(.*)',
  //       headers: [
  //         {
  //           key: 'Content-Security-Policy',
  //           value: cspHeader.replace(/\n/g, ''),
  //         },
  //       ],
  //     },
  //   ]
  // },
  // experimental: {
  //   useCache: true,
  // },
  devIndicators: false,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: process.env.ASSETS_HOST_NAME || '',
        pathname: process.env.ASSETS_PATH_NAME || '',
        port: '',
        search: '',
      },
    ],
  },
  /* config options here */
  // sassOptions: {
  //   implementation: 'sass-embedded',
  // },
  // experimental: {
  //   taint: true,
  //   // serverActions: {
  //   //   // allowedOrigins: ['my-proxy.com', '*.my-proxy.com'],
  //   //   allowedOrigins: [`${process.env.NEXT_PUBLIC_VERCEL_URL}`],
  //   // },
  // },
}

export default nextConfig
