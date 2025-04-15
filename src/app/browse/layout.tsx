export const dynamic = 'force-dynamic'

import BrowseRootLayout from '@/components/Browse/BrowseRootLayout'

export default async function BrowseLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return <BrowseRootLayout>BrowseLayout{children}</BrowseRootLayout>
}
