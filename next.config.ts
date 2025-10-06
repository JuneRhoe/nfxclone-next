import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  devIndicators: false,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: process.env.ASSETS_HOST_NAME || '',
        pathname: process.env.ASSETS_PATH_NAME || '',
        port: process.env.ASSETS_PORT || '',
        search: '',
      }
    ],
  }
}

export default nextConfig
