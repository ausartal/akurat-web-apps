import Link from 'next/link'
import { ArrowUpRight, BookOpenCheck, Layers } from 'lucide-react'

import type { Course } from '@/features/course/services/course.service'

interface CourseCardProps {
  course: Course
  /** Optional override for module count when known (avoids extra DB call). */
  moduleCount?: number
  /** Optional accent color used for the gradient swatch. */
  accent?: string
}

const DIFFICULTY_LABELS: Record<string, { label: string; tone: string }> = {
  beginner: { label: 'Pemula', tone: 'bg-[#ECFDF5] text-[#047857]' },
  intermediate: { label: 'Menengah', tone: 'bg-[#EFF6FF] text-[#1A73E8]' },
  advanced: { label: 'Lanjutan', tone: 'bg-[#FFF3DF] text-[#B86200]' },
}

const COURSE_ACCENTS = ['#1A73E8', '#00A9D6', '#FF9500', '#7C3AED']

function getAccent(seed: string): string {
  let hash = 0
  for (let index = 0; index < seed.length; index += 1) {
    hash = (hash * 31 + seed.charCodeAt(index)) >>> 0
  }
  return COURSE_ACCENTS[hash % COURSE_ACCENTS.length] ?? COURSE_ACCENTS[0]
}

export default function CourseCard({ course, moduleCount, accent }: CourseCardProps) {
  const difficulty = DIFFICULTY_LABELS[course.difficulty] ?? {
    label: course.difficulty,
    tone: 'bg-[#F1F5F9] text-[#475569]',
  }
  const cardAccent = accent ?? getAccent(course.id)

  return (
    <Link
      href={`/dashboard/courses/${course.slug}`}
      className="group relative flex h-full flex-col overflow-hidden rounded-[24px] border border-[#E2E8F0] bg-white shadow-sm transition-all hover:-translate-y-1 hover:border-[#BFEFFF] hover:shadow-[0_28px_60px_-32px_rgba(15,23,42,0.55)]"
    >
      <div
        className="relative h-32 overflow-hidden"
        style={{ background: `linear-gradient(135deg, ${cardAccent} 0%, #0F172A 140%)` }}
      >
        <div
          className="absolute inset-0 opacity-25"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.4) 1px, transparent 1px)',
            backgroundSize: '32px 32px',
          }}
        />
        <div className="absolute right-4 top-4 inline-flex items-center gap-1.5 rounded-full bg-white/15 px-2.5 py-1 text-[11px] font-bold text-white backdrop-blur">
          <Layers className="h-3 w-3" />
          {moduleCount ?? 'Multi'} modul
        </div>
        <div className="absolute bottom-3 left-4 inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-white/15 text-white backdrop-blur">
          <BookOpenCheck className="h-5 w-5" />
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-3 p-6">
        <span
          className={`inline-flex w-fit items-center gap-1.5 rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-widest ${difficulty.tone}`}
        >
          {difficulty.label}
        </span>

        <h2 className="text-xl font-extrabold leading-snug text-[#0F172A] group-hover:text-[#1A73E8]">
          {course.title}
        </h2>

        {course.description && (
          <p className="line-clamp-3 text-sm leading-relaxed text-[#64748B]">
            {course.description}
          </p>
        )}

        <div className="mt-auto flex items-center justify-between border-t border-[#F1F5F9] pt-3 text-sm font-bold text-[#1A73E8]">
          Buka materi
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#F8FEFF] transition-colors group-hover:bg-[#1A73E8] group-hover:text-white">
            <ArrowUpRight className="h-4 w-4" />
          </span>
        </div>
      </div>
    </Link>
  )
}
