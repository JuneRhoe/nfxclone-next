export default function RootContainer({
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
