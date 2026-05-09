'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import {
  LayoutDashboard,
  BookOpen,
  ClipboardList,
  FileText,
  TrendingUp,
  LogOut,
  ChevronRight,
} from 'lucide-react'
import { useRouter } from 'next/navigation'
import { signOut } from '@/features/auth/services/auth.service'

const menuItems = [
  { icon: LayoutDashboard, label: 'Dashboard', href: '/dashboard' },
  { icon: BookOpen, label: 'Learning Material', href: '/dashboard/courses', badge: 12 },
  { icon: ClipboardList, label: 'Practice & Quizzes', href: '/dashboard/progress', badge: 5 },
  { icon: FileText, label: 'Exams', href: '/dashboard/achievements', badge: 1 },
]

const analyticsItems = [
  { icon: TrendingUp, label: 'My Progress', href: '/dashboard/progress' },
]

export default function Sidebar() {
  const pathname = usePathname()
  const router = useRouter()

  async function handleLogout() {
    await signOut()
    router.push('/login')
    router.refresh()
  }

  return (
    <aside className="flex h-screen w-64 flex-col border-r border-[#F1F5F9] bg-white shadow-sm sticky top-0">
      {/* Logo */}
      <div className="flex h-[72px] items-center border-b border-[#F1F5F9] px-5">
        <Link href="/" aria-label="AKURAT home">
          <Image
            src="/akurat-logo.svg"
            alt="AKURAT"
            width={130}
            height={36}
            className="h-8 w-auto"
          />
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto px-4 py-6">
        {/* MENU section */}
        <div className="mb-6">
          <p className="mb-3 px-3 text-[10px] font-bold uppercase tracking-widest text-[#94A3B8]">Menu</p>
          <div className="space-y-1">
            {menuItems.map((item) => {
              const Icon = item.icon
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-150 ${
                    isActive
                      ? 'bg-[#EEF2FF] text-[#4F46E5]'
                      : 'text-[#64748B] hover:bg-[#F8FAFC] hover:text-[#0F172A]'
                  }`}
                >
                  <Icon
                    className={`h-4.5 w-4.5 shrink-0 ${isActive ? 'text-[#4F46E5]' : 'text-[#94A3B8] group-hover:text-[#64748B]'}`}
                    style={{ width: '18px', height: '18px' }}
                  />
                  <span className="flex-1">{item.label}</span>
                  {item.badge && (
                    <span className={`rounded-full px-1.5 py-0.5 text-[10px] font-bold ${
                      isActive ? 'bg-[#4F46E5] text-white' : 'bg-[#F1F5F9] text-[#64748B]'
                    }`}>
                      {item.badge}
                    </span>
                  )}
                </Link>
              )
            })}
          </div>
        </div>

        {/* ANALYTICS section */}
        <div>
          <p className="mb-3 px-3 text-[10px] font-bold uppercase tracking-widest text-[#94A3B8]">Analytics</p>
          <div className="space-y-1">
            {analyticsItems.map((item) => {
              const Icon = item.icon
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-150 ${
                    isActive
                      ? 'bg-[#EEF2FF] text-[#4F46E5]'
                      : 'text-[#64748B] hover:bg-[#F8FAFC] hover:text-[#0F172A]'
                  }`}
                >
                  <Icon
                    className={`shrink-0 ${isActive ? 'text-[#4F46E5]' : 'text-[#94A3B8] group-hover:text-[#64748B]'}`}
                    style={{ width: '18px', height: '18px' }}
                  />
                  <span className="flex-1">{item.label}</span>
                  <ChevronRight className="h-3.5 w-3.5 text-[#CBD5E1] group-hover:text-[#94A3B8]" />
                </Link>
              )
            })}
          </div>
        </div>
      </nav>

      {/* Bottom: User + Logout */}
      <div className="border-t border-[#F1F5F9] p-4">
        <div className="mb-3 flex items-center gap-3 rounded-xl p-2">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#4F46E5] to-[#7C3AED] text-sm font-bold text-white">
            AR
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-semibold text-[#0F172A]">Andi Rizky</p>
            <p className="truncate text-xs text-[#94A3B8]">Siswa Kelas XII</p>
          </div>
        </div>
        <button
          onClick={handleLogout}
          className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2 text-sm font-medium text-[#EF4444] transition-colors hover:bg-[#FEF2F2]"
        >
          <LogOut className="h-4 w-4" />
          Logout
        </button>
      </div>
    </aside>
  )
}
