'use client'

import Link from 'next/link'
import { use, useEffect, useMemo, useState } from 'react'
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  ChevronRight,
  Clock,
  Layers,
  PlayCircle,
  Target,
} from 'lucide-react'

import {
  getCourseBySlug,
  type CourseDetail,
  type CourseLesson,
  type CourseModule,
} from '@/features/course/services/course-detail.service'

interface CourseDetailPageProps {
  params: Promise<{
    slug: string
  }>
}

const DIFFICULTY_LABELS: Record<string, string> = {
  beginner: 'Pemula',
  intermediate: 'Menengah',
  advanced: 'Lanjutan',
}

function CourseDetailSkeleton() {
  return (
    <div className="space-y-8">
      <div className="h-56 animate-pulse rounded-[28px] bg-[#F1F5F9]" />
      <div className="grid gap-5 lg:grid-cols-[2fr_1fr]">
        <div className="space-y-4">
          {Array.from({ length: 3 }).map((_, index) => (
            <div key={index} className="h-32 animate-pulse rounded-3xl bg-[#F1F5F9]" />
          ))}
        </div>
        <div className="h-64 animate-pulse rounded-3xl bg-[#F1F5F9]" />
      </div>
    </div>
  )
}

export default function CourseDetailPage({ params }: CourseDetailPageProps) {
  const { slug } = use(params)
  const [course, setCourse] = useState<CourseDetail | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let cancelled = false
    async function loadCourse() {
      const data = await getCourseBySlug(slug)
      if (cancelled) return
      setCourse(data)
      setLoading(false)
    }
    loadCourse()
    return () => {
      cancelled = true
    }
  }, [slug])

  const stats = useMemo(() => {
    if (!course) return { lessons: 0, minutes: 0 }
    const lessons = course.modules.reduce(
      (count: number, module: CourseModule) => count + module.lessons.length,
      0,
    )
    const minutes = course.modules.reduce(
      (count: number, module: CourseModule) =>
        count +
        module.lessons.reduce(
          (sum: number, lesson: CourseLesson) => sum + (lesson.estimated_minutes ?? 0),
          0,
        ),
      0,
    )
    return { lessons, minutes }
  }, [course])

  if (loading) return <CourseDetailSkeleton />

  if (!course) {
    return (
      <div className="rounded-[24px] border border-[#FECACA] bg-[#FEF2F2] p-10 text-center">
        <h1 className="text-xl font-extrabold text-[#B91C1C]">Materi tidak ditemukan</h1>
        <p className="mt-2 text-sm text-[#7F1D1D]">
          Materi yang kamu cari tidak tersedia atau sudah dihapus.
        </p>
        <Link
          href="/dashboard/courses"
          className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[#1A73E8] px-5 py-2.5 text-sm font-bold text-white transition hover:bg-[#155FC3]"
        >
          <ArrowLeft className="h-4 w-4" />
          Kembali ke daftar materi
        </Link>
      </div>
    )
  }

  const difficultyLabel = DIFFICULTY_LABELS[course.difficulty] ?? course.difficulty

  return (
    <div className="space-y-8">
      <Link
        href="/dashboard/courses"
        className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-[#1A73E8] hover:text-[#155FC3]"
      >
        <ArrowLeft className="h-3.5 w-3.5" />
        Semua materi
      </Link>

      <section className="relative overflow-hidden rounded-[28px] border border-white/15 bg-[linear-gradient(135deg,#0E4DAA_0%,#1A73E8_55%,#00C2FF_100%)] p-8 text-white shadow-[0_28px_80px_-48px_rgba(15,23,42,0.55)] sm:p-10">
        <div
          className="absolute inset-0 opacity-[0.18]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.4) 1px, transparent 1px)',
            backgroundSize: '52px 52px',
            maskImage: 'radial-gradient(circle at top right, rgba(0,0,0,1), rgba(0,0,0,0) 65%)',
          }}
        />
        <div className="absolute -right-12 -top-16 h-64 w-64 rounded-full bg-[#FF9500]/30 blur-3xl" />
        <div className="absolute -bottom-20 left-12 h-56 w-56 rounded-full bg-white/15 blur-3xl" />

        <div className="relative z-10 grid gap-6 lg:grid-cols-[1.6fr_1fr] lg:items-end">
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1 text-[11px] font-bold uppercase tracking-widest backdrop-blur">
                {difficultyLabel}
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1 text-[11px] font-bold uppercase tracking-widest backdrop-blur">
                <Layers className="h-3 w-3" />
                {course.modules.length} modul
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1 text-[11px] font-bold uppercase tracking-widest backdrop-blur">
                <BookOpen className="h-3 w-3" />
                {stats.lessons} pelajaran
              </span>
              {stats.minutes > 0 && (
                <span className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1 text-[11px] font-bold uppercase tracking-widest backdrop-blur">
                  <Clock className="h-3 w-3" />
                  ~{stats.minutes} menit
                </span>
              )}
            </div>

            <h1 className="mt-5 text-balance text-4xl font-black leading-tight sm:text-5xl">
              {course.title}
            </h1>

            {course.description && (
              <p className="mt-4 max-w-2xl text-base leading-7 text-white/85">
                {course.description}
              </p>
            )}

            <div className="mt-7 flex flex-wrap gap-3">
              {course.modules[0]?.lessons[0] ? (
                <Link
                  href={`/dashboard/lessons/${course.modules[0].lessons[0].slug}`}
                  className="group inline-flex h-12 items-center gap-2 rounded-xl bg-white px-5 text-sm font-bold text-[#1A73E8] shadow-md transition hover:-translate-y-0.5 hover:bg-[#F8FEFF]"
                >
                  <PlayCircle className="h-4 w-4" />
                  Mulai pelajaran pertama
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              ) : null}
              <button
                type="button"
                className="inline-flex h-12 items-center gap-2 rounded-xl border border-white/30 bg-white/0 px-5 text-sm font-bold text-white transition hover:border-white/60 hover:bg-white/10"
              >
                <Target className="h-4 w-4" />
                Tetapkan target
              </button>
            </div>
          </div>

          <div className="relative">
            <div className="rounded-3xl border border-white/15 bg-white/10 p-5 backdrop-blur">
              <p className="text-xs font-bold uppercase tracking-widest text-white/75">
                Garis besar
              </p>
              <ul className="mt-3 space-y-2">
                {course.modules.slice(0, 4).map((module: CourseModule, index: number) => (
                  <li
                    key={module.id}
                    className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm font-semibold"
                  >
                    <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-white/15 text-xs font-bold">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <span className="truncate">{module.title}</span>
                  </li>
                ))}
                {course.modules.length > 4 && (
                  <li className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs font-semibold text-white/85">
                    +{course.modules.length - 4} modul lainnya
                  </li>
                )}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="mb-5 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-extrabold text-[#0F172A]">Modul pembelajaran</h2>
            <p className="text-sm text-[#64748B]">
              Selesaikan setiap modul secara berurutan untuk membangun konsep kuat.
            </p>
          </div>
        </div>

        {course.modules.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-[#CBD5E1] bg-white p-10 text-center">
            <p className="text-sm font-semibold text-[#475569]">
              Belum ada modul yang dipublikasikan untuk materi ini.
            </p>
          </div>
        ) : (
          <div className="space-y-5">
            {course.modules.map((module: CourseModule, moduleIndex: number) => (
              <article
                key={module.id}
                className="overflow-hidden rounded-[24px] border border-[#E2E8F0] bg-white shadow-sm"
              >
                <header className="flex flex-col gap-3 border-b border-[#F1F5F9] bg-[#F8FEFF] p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
                  <div className="flex items-center gap-4">
                    <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-sm font-extrabold text-[#1A73E8] shadow-sm">
                      {String(moduleIndex + 1).padStart(2, '0')}
                    </span>
                    <div>
                      <h3 className="text-lg font-extrabold text-[#0F172A]">{module.title}</h3>
                      {module.description && (
                        <p className="mt-1 text-sm text-[#64748B]">{module.description}</p>
                      )}
                    </div>
                  </div>
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 text-[11px] font-bold uppercase tracking-widest text-[#1A73E8]">
                    {module.lessons.length} pelajaran
                  </span>
                </header>

                {module.lessons.length === 0 ? (
                  <p className="px-6 py-5 text-sm text-[#64748B]">
                    Belum ada pelajaran pada modul ini.
                  </p>
                ) : (
                  <ul className="divide-y divide-[#F1F5F9]">
                    {module.lessons.map((lesson: CourseLesson, lessonIndex: number) => (
                      <li key={lesson.id}>
                        <Link
                          href={`/dashboard/lessons/${lesson.slug}`}
                          className="group flex items-center justify-between gap-4 px-5 py-4 transition hover:bg-[#F8FEFF] sm:px-6"
                        >
                          <div className="flex min-w-0 items-center gap-4">
                            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#F1F5F9] text-xs font-bold text-[#475569] transition group-hover:bg-[#1A73E8] group-hover:text-white">
                              {String(lessonIndex + 1).padStart(2, '0')}
                            </span>
                            <div className="min-w-0">
                              <p className="truncate text-sm font-bold text-[#0F172A]">
                                {lesson.title}
                              </p>
                              <p className="mt-0.5 flex items-center gap-1.5 text-xs text-[#64748B]">
                                <Clock className="h-3 w-3" />
                                {lesson.estimated_minutes ?? 5} menit baca
                              </p>
                            </div>
                          </div>

                          <div className="flex shrink-0 items-center gap-2 text-xs font-bold text-[#1A73E8]">
                            <span className="hidden sm:inline">Buka</span>
                            <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                          </div>
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </article>
            ))}
          </div>
        )}
      </section>
    </div>
  )
}
