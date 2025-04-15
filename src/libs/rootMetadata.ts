import { Metadata } from 'next'

export const ROOT_METADATA: Metadata = {
  title: 'Netflix Clone',
  icons: '/favicon.ico',
  description: 'Netflix Clone using ReactJS / NextJS',
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}
