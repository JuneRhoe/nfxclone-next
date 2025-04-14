export const dynamic = 'force-dynamic'

import GuestRootLayout from '@/components/Guest/GuestRootLayout'

export default function GuestHome({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return <GuestRootLayout>{children}</GuestRootLayout>
}
