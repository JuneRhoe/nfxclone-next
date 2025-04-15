export const dynamic = 'force-dynamic'

export default async function AboutLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return <>About layout{children}</>
}
