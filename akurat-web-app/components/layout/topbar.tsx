'use client'

import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Bell, ChevronRight, Search, Sparkles } from 'lucide-react'

import { getMyProfile, type Profile } from '@/features/profile/services/profile.service'

interface Breadcrumb {
  label: string
  href?: string
}

const ROUTE_LABELS: Record<string, string> = {
  dashboard: 'Dashboard',
  courses: 'Materi',
  lessons: 'Pelajaran',
  quiz: 'Latihan',
  exams: 'Ujian MSAT',
  progress: 'Progres',
  achievements: 'Penghargaan',
}

function buildBreadcrumbs(pathname: string): Breadcrumb[] {
  if (!pathname) return [{ label: 'Dashboard' }]

  const segments = pathname.split('/').filter(Boolean)
  if (segments.length === 0) return [{ label: 'Dashboard' }]

  const crumbs: Breadcrumb[] = []
  let accumulated = ''

  segments.forEach((segment, index) => {
    accumulated += `/${segment}`
    const isLast = index === segments.length - 1

    // Skip dynamic param segments (e.g. [slug]) by titlecasing them.
    const label =
      ROUTE_LABELS[segment] ??
      decodeURIComponent(segment)
        .replace(/-/g, ' ')
        .replace(/\b\w/g, (char) => char.toUpperCase())

    crumbs.push({ label, href: isLast ? undefined : accumulated })
  })

  return crumbs
}

interface TopbarProps {
  /** Optional override for the page title. Defaults to the last breadcrumb. */
  title?: string
  /** Optional supporting line. */
  subtitle?: string
}

export default function Topbar({ title, subtitle }: TopbarProps) {
  const pathname = usePathname() ?? '/dashboard'
  const breadcrumbs = useMemo(() => buildBreadcrumbs(pathname), [pathname])

  const [profile, setProfile] = useState<Profile | null>(null)

  useEffect(() => {
    let cancelled = false

    async function loadProfile() {
      const data = await getMyProfile()
      if (!cancelled) {
        setProfile(data)
      }
    }

    loadProfile()
    return () => {
      cancelled = true
    }
  }, [])

  const displayName = profile?.full_name?.trim() || 'Belajar AKURAT'
  const computedTitle = title ?? breadcrumbs[breadcrumbs.length - 1]?.label ?? 'Dashboard'
  const computedSubtitle = subtitle ?? `Selamat belajar, ${displayName.split(' ')[0]} 👋`

  return (
    <header className="sticky top-0 z-30 border-b border-[#E2E8F0] bg-white/85 px-6 py-4 backdrop-blur-xl lg:px-8">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <div className="min-w-0 flex-1">
          <nav aria-label="Breadcrumb">
            <ol className="flex flex-wrap items-center gap-1.5 text-xs font-semibold text-[#94A3B8]">
              {breadcrumbs.map((crumb, index) => {
                const isLast = index === breadcrumbs.length - 1
                return (
                  <li key={`${crumb.label}-${index}`} className="flex items-center gap-1.5">
                    {crumb.href ? (
                      <Link
                        href={crumb.href}
                        className="rounded-md px-1 py-0.5 transition-colors hover:bg-[#F1F5F9] hover:text-[#1A73E8]"
                      >
                        {crumb.label}
                      </Link>
                    ) : (
                      <span className="rounded-md px-1 py-0.5 text-[#1A73E8]">{crumb.label}</span>
                    )}
                    {!isLast && <ChevronRight className="h-3 w-3 text-[#CBD5E1]" />}
                  </li>
                )
              })}
            </ol>

            <div className="mt-2 flex flex-wrap items-center gap-3">
              <h1 className="truncate text-2xl font-extrabold text-[#0F172A]">{computedTitle}</h1>
              <span className="hidden h-6 w-px bg-[#E2E8F0] sm:inline-block" />
              <p className="truncate text-sm text-[#64748B]">{computedSubtitle}</p>
            </div>
          </nav>
        </div>

        <div className="flex items-center gap-2 lg:gap-3">
          <label className="relative hidden md:block">
            <span className="sr-only">Cari materi atau soal</span>
            <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#94A3B8]" />
            <input
              type="search"
              placeholder="Cari materi, soal, mentor…"
              className="h-11 w-[260px] rounded-xl border border-[#E2E8F0] bg-white pl-10 pr-4 text-sm text-[#0F172A] outline-none transition placeholder:text-[#94A3B8] focus:w-[320px] focus:border-[#1A73E8] focus:ring-2 focus:ring-[#BFEFFF]"
            />
          </label>

          <button
            type="button"
            className="relative flex h-11 w-11 items-center justify-center rounded-xl border border-[#E2E8F0] bg-white text-[#475569] transition hover:border-[#BFEFFF] hover:bg-[#F8FEFF] hover:text-[#1A73E8]"
            aria-label="Notifikasi"
          >
            <Bell className="h-4 w-4" />
            <span className="absolute right-2.5 top-2.5 h-2 w-2 rounded-full bg-[#FF9500] ring-2 ring-white" />
          </button>

          <Link
            href="/dashboard/quiz"
            className="hidden h-11 items-center gap-2 rounded-xl bg-[#1A73E8] px-4 text-sm font-bold text-white shadow-[0_14px_28px_-18px_rgba(26,115,232,0.95)] transition hover:-translate-y-0.5 hover:bg-[#155FC3] sm:inline-flex"
          >
            <Sparkles className="h-4 w-4" />
            Mulai Adaptive Quiz
          </Link>
        </div>
      </div>
    </header>
  )
}
