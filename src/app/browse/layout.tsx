export const dynamic = 'force-dynamic'

import 'server-only'

import BrowseRootLayoutServer from '@/components/Browse/BrowseRootLayoutServer'

export default async function BrowseLayoutServer({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return <BrowseRootLayoutServer>{children}</BrowseRootLayoutServer>
}
