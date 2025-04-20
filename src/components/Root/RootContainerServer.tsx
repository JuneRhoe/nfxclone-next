import 'server-only'

export default function RootContainerServer({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className="'flex justify-start' h-full min-h-[100vh] w-full flex-col items-start">
      {children}
    </div>
  )
}
