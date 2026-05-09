import Sidebar from '@/components/layout/sidebar'
import Topbar from '@/components/layout/topbar'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen bg-[#F8FAFC]">
      <Sidebar />

      <div className="flex flex-1 flex-col overflow-hidden">
        <Topbar title="Dashboard" subtitle="Selamat belajar, Andi!" />

        <main className="flex-1 overflow-y-auto p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  )
}

