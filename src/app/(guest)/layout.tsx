export const dynamic = 'force-dynamic'

import 'server-only'

import GuestRootLayout from '@/components/Guest/GuestRootLayout'

export default function GuestLayoutServer({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return <GuestRootLayout>{children}</GuestRootLayout>
}
