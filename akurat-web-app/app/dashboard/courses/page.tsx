'use client'

import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import { ArrowRight, BookOpen, Filter, Search, Sparkles } from 'lucide-react'

import CourseCard from '@/components/dashboard/course-card'
import { getCourses, type Course } from '@/features/course/services/course.service'

const DIFFICULTY_FILTERS: Array<{ id: string; label: string }> = [
  { id: 'all', label: 'Semua tingkat' },
  { id: 'beginner', label: 'Pemula' },
  { id: 'intermediate', label: 'Menengah' },
  { id: 'advanced', label: 'Lanjutan' },
]

function CourseCardSkeleton() {
  return (
    <div className="flex h-full flex-col overflow-hidden rounded-[24px] border border-[#E2E8F0] bg-white">
      <div className="h-32 animate-pulse bg-[#F1F5F9]" />
      <div className="flex flex-1 flex-col gap-3 p-6">
        <div className="h-5 w-24 animate-pulse rounded-full bg-[#F1F5F9]" />
        <div className="h-6 w-3/4 animate-pulse rounded bg-[#F1F5F9]" />
        <div className="h-4 w-full animate-pulse rounded bg-[#F1F5F9]" />
        <div className="h-4 w-5/6 animate-pulse rounded bg-[#F1F5F9]" />
        <div className="mt-auto h-10 w-full animate-pulse rounded-full bg-[#F1F5F9]" />
      </div>
    </div>
  )
}

export default function CoursesPage() {
  const [courses, setCourses] = useState<Course[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [filter, setFilter] = useState<string>('all')
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    let cancelled = false
    async function loadCourses() {
      try {
        const data = await getCourses()
        if (!cancelled) {
          setCourses(data)
          setLoading(false)
        }
      } catch (err) {
        console.error(err)
        if (!cancelled) {
          setError('Gagal memuat materi. Silakan coba beberapa saat lagi.')
          setLoading(false)
        }
      }
    }
    loadCourses()
    return () => {
      cancelled = true
    }
  }, [])

  const filteredCourses = useMemo(() => {
    const lowered = searchTerm.trim().toLowerCase()
    return courses.filter((course) => {
      const matchesDifficulty = filter === 'all' || course.difficulty === filter
      const matchesSearch =
        !lowered ||
        course.title.toLowerCase().includes(lowered) ||
        course.description?.toLowerCase().includes(lowered)
      return matchesDifficulty && matchesSearch
    })
  }, [courses, filter, searchTerm])

  return (
    <div className="space-y-8">
      {/* Hero */}
      <section className="relative overflow-hidden rounded-[28px] border border-[#D9EEF2] bg-[linear-gradient(135deg,#F8FEFF_0%,#EAF3FF_100%)] p-8">
        <div className="absolute -right-12 -top-16 h-56 w-56 rounded-full bg-[#1A73E8]/10 blur-3xl" />
        <div className="absolute -bottom-20 left-12 h-48 w-48 rounded-full bg-[#FF9500]/10 blur-3xl" />

        <div className="relative z-10 flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-[#BFEFFF] bg-white/80 px-3 py-1 text-[11px] font-bold uppercase tracking-widest text-[#1A73E8] backdrop-blur">
              <Sparkles className="h-3.5 w-3.5" />
              Learning library
            </span>
            <h1 className="mt-4 text-balance text-3xl font-black text-[#0F172A] sm:text-4xl">
              Materi kimia adaptif yang siap kamu eksplorasi.
            </h1>
            <p className="mt-3 text-sm leading-relaxed text-[#475569] sm:text-base">
              Setiap materi tersusun rapi per modul dan pelajaran. Selesaikan secara berurutan
              atau loncat ke topik yang sedang kamu butuhkan.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 text-sm">
            <div className="rounded-2xl border border-[#D9EEF2] bg-white px-4 py-3">
              <p className="text-[11px] font-semibold uppercase tracking-widest text-[#94A3B8]">
                Total materi
              </p>
              <p className="mt-1 text-2xl font-extrabold text-[#0F172A]">{courses.length}</p>
            </div>
            <Link
              href="/dashboard/progress"
              className="inline-flex h-12 items-center gap-2 rounded-2xl bg-[#1A73E8] px-5 text-sm font-bold text-white shadow-[0_18px_36px_-22px_rgba(26,115,232,0.95)] transition hover:-translate-y-0.5 hover:bg-[#155FC3]"
            >
              <BookOpen className="h-4 w-4" />
              Lihat progresku
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="rounded-[24px] border border-[#E2E8F0] bg-white p-4 shadow-sm sm:p-5">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#94A3B8]">
            <Filter className="h-3.5 w-3.5" />
            Filter cepat
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <div className="relative w-full sm:w-72">
              <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#94A3B8]" />
              <input
                type="search"
                placeholder="Cari materi…"
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
                className="h-11 w-full rounded-xl border border-[#E2E8F0] bg-[#F8FAFB] pl-10 pr-4 text-sm text-[#0F172A] outline-none transition placeholder:text-[#94A3B8] focus:border-[#1A73E8] focus:bg-white focus:ring-2 focus:ring-[#BFEFFF]"
              />
            </div>

            <div className="flex flex-wrap gap-2">
              {DIFFICULTY_FILTERS.map((option) => {
                const active = filter === option.id
                return (
                  <button
                    key={option.id}
                    type="button"
                    onClick={() => setFilter(option.id)}
                    className={`inline-flex items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-xs font-bold transition ${
                      active
                        ? 'border-[#1A73E8] bg-[#1A73E8] text-white shadow-[0_8px_18px_-12px_rgba(26,115,232,0.95)]'
                        : 'border-[#E2E8F0] bg-white text-[#475569] hover:border-[#BFEFFF] hover:text-[#1A73E8]'
                    }`}
                    aria-pressed={active}
                  >
                    {option.label}
                  </button>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Courses grid */}
      <section>
        {loading ? (
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {Array.from({ length: 6 }).map((_, index) => (
              <CourseCardSkeleton key={index} />
            ))}
          </div>
        ) : error ? (
          <div className="rounded-3xl border border-[#FECACA] bg-[#FEF2F2] p-8 text-center text-[#B91C1C]">
            <p className="font-bold">{error}</p>
          </div>
        ) : filteredCourses.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-[#CBD5E1] bg-white p-12 text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-[#F8FEFF] text-[#1A73E8]">
              <BookOpen className="h-5 w-5" />
            </div>
            <h2 className="mt-4 text-lg font-extrabold text-[#0F172A]">
              Belum ada materi yang cocok
            </h2>
            <p className="mt-1 text-sm text-[#64748B]">
              Coba ubah filter atau kata kunci pencarian.
            </p>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {filteredCourses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        )}
      </section>
    </div>
  )
}
