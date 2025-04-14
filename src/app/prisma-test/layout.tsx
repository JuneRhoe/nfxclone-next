export const dynamic = 'force-dynamic'

export default function TestLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return <div>{children}</div>
}
