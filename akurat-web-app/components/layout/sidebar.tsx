'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import {
  BookOpen,
  ClipboardList,
  FileText,
  LayoutDashboard,
  LogOut,
  MessageCircle,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  Trophy,
} from 'lucide-react'

import { signOut } from '@/features/auth/services/auth.service'
import { getMyProfile, type Profile } from '@/features/profile/services/profile.service'

interface NavItem {
  icon: typeof LayoutDashboard
  label: string
  href: string
  description?: string
  badge?: string
  exact?: boolean
}

const learningItems: NavItem[] = [
  {
    icon: LayoutDashboard,
    label: 'Dashboard',
    href: '/dashboard',
    description: 'Ringkasan harianmu',
    exact: true,
  },
  {
    icon: BookOpen,
    label: 'Materi',
    href: '/dashboard/courses',
    description: 'Bab dan sub-bab kimia',
  },
  {
    icon: ClipboardList,
    label: 'Latihan & Quiz',
    href: '/dashboard/progress',
    description: 'Soal adaptif harian',
  },
  {
    icon: FileText,
    label: 'Ujian MSAT',
    href: '/dashboard/achievements',
    description: 'Trial dan ujian resmi',
    badge: 'Soon',
  },
]

const insightItems: NavItem[] = [
  {
    icon: TrendingUp,
    label: 'Progres',
    href: '/dashboard/progress',
    description: 'Tren belajar mingguan',
  },
  {
    icon: Trophy,
    label: 'Penghargaan',
    href: '/dashboard/achievements',
    description: 'XP dan badge',
  },
  {
    icon: MessageCircle,
    label: 'Komunikasi',
    href: '/dashboard/communication',
    description: 'Diskusi dengan mentor',
    badge: 'Soon',
  },
]

function NavLink({
  item,
  isActive,
}: {
  item: NavItem
  isActive: boolean
}) {
  const Icon = item.icon
  return (
    <Link
      href={item.href}
      className={`group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold transition-all ${
        isActive
          ? 'bg-[#1A73E8] text-white shadow-[0_18px_32px_-22px_rgba(26,115,232,0.85)]'
          : 'text-[#475569] hover:bg-[#F1F5F9] hover:text-[#0F172A]'
      }`}
    >
      <span
        className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg transition-colors ${
          isActive ? 'bg-white/15 text-white' : 'bg-[#F8FAFB] text-[#1A73E8] group-hover:bg-white'
        }`}
      >
        <Icon className="h-4 w-4" />
      </span>
      <span className="flex-1 truncate">{item.label}</span>
      {item.badge && (
        <span
          className={`rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${
            isActive ? 'bg-white/20 text-white' : 'bg-[#FFF3DF] text-[#B86200]'
          }`}
        >
          {item.badge}
        </span>
      )}
    </Link>
  )
}

function isItemActive(pathname: string, item: NavItem): boolean {
  if (item.exact) return pathname === item.href
  return pathname === item.href || pathname.startsWith(`${item.href}/`)
}

export default function Sidebar() {
  const pathname = usePathname() ?? '/dashboard'
  const router = useRouter()
  const [profile, setProfile] = useState<Profile | null>(null)
  const [loggingOut, setLoggingOut] = useState(false)

  useEffect(() => {
    let cancelled = false
    async function loadProfile() {
      const data = await getMyProfile()
      if (!cancelled) setProfile(data)
    }
    loadProfile()
    return () => {
      cancelled = true
    }
  }, [])

  async function handleLogout() {
    setLoggingOut(true)
    await signOut()
    router.push('/login')
    router.refresh()
  }

  const fullName = profile?.full_name?.trim() || 'Belajar AKURAT'
  const role = profile?.role ?? 'Siswa'
  const initials = fullName
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part.charAt(0).toUpperCase())
    .join('') || 'AK'

  return (
    <aside className="sticky top-0 hidden h-screen w-72 shrink-0 flex-col border-r border-[#E2E8F0] bg-white lg:flex">
      <div className="flex h-[72px] items-center border-b border-[#E2E8F0] px-6">
        <Link href="/" aria-label="AKURAT home" className="inline-flex items-center">
          <Image
            src="/akurat-logo.svg"
            alt="AKURAT"
            width={140}
            height={36}
            className="h-9 w-auto"
            priority
          />
        </Link>
      </div>

      <nav className="flex-1 overflow-y-auto px-4 py-6">
        <div className="mb-6 rounded-2xl border border-[#D9EEF2] bg-[#F8FEFF] p-3">
          <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest text-[#1A73E8]">
            <Sparkles className="h-3.5 w-3.5" />
            Fokus pekan ini
          </div>
          <p className="mt-2 text-sm font-semibold text-[#0F172A]">Pereaksi pembatas</p>
          <p className="mt-1 text-xs text-[#64748B]">Selesaikan latihan untuk membuka modul Gas STP.</p>
        </div>

        <div className="mb-7">
          <p className="mb-3 px-2 text-[10px] font-bold uppercase tracking-widest text-[#94A3B8]">
            Belajar
          </p>
          <div className="space-y-1">
            {learningItems.map((item) => (
              <NavLink key={item.label} item={item} isActive={isItemActive(pathname, item)} />
            ))}
          </div>
        </div>

        <div>
          <p className="mb-3 px-2 text-[10px] font-bold uppercase tracking-widest text-[#94A3B8]">
            Insight
          </p>
          <div className="space-y-1">
            {insightItems.map((item) => (
              <NavLink
                key={`${item.label}-${item.href}`}
                item={item}
                isActive={isItemActive(pathname, item)}
              />
            ))}
          </div>
        </div>
      </nav>

      <div className="border-t border-[#E2E8F0] p-4">
        <div className="mb-3 flex items-center gap-3 rounded-2xl border border-[#E2E8F0] bg-white p-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[linear-gradient(135deg,#1A73E8,#00C2FF)] text-sm font-extrabold text-white">
            {initials}
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-bold text-[#0F172A]">{fullName}</p>
            <div className="mt-0.5 flex items-center gap-1.5 text-[11px] font-semibold text-[#64748B]">
              <ShieldCheck className="h-3 w-3 text-[#00B84D]" />
              <span className="capitalize">{role}</span>
            </div>
          </div>
        </div>

        <button
          type="button"
          onClick={handleLogout}
          disabled={loggingOut}
          className="flex w-full items-center justify-center gap-2 rounded-xl border border-[#FECACA] bg-white px-3 py-2.5 text-sm font-bold text-[#DC2626] transition hover:bg-[#FEF2F2] disabled:cursor-not-allowed disabled:opacity-60"
        >
          <LogOut className="h-4 w-4" />
          {loggingOut ? 'Keluar…' : 'Keluar'}
        </button>
      </div>
    </aside>
  )
}
