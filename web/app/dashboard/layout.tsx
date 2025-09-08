export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className='flex justify-center min-h-screen bg-background'>
      <main className='flex-1 p-6 w-full max-w-5xl'>{children}</main>
    </div>
  )
}
