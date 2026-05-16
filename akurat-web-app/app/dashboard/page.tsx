'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import {
  AlertTriangle,
  Brain,
  ChevronRight,
  Clock,
  FileText,
  Target,
} from 'lucide-react'

import DashboardHero from '@/components/dashboard/hero-section'
import StatsCard from '@/components/dashboard/stats-card'
import { getMyProfile, type Profile } from '@/features/profile/services/profile.service'

interface ProgressItem {
  topic: string
  pct: number
  color: string
}

interface DayActivity {
  day: string
  materi: number
  quiz: number
}

interface Misconception {
  title: string
  desc: string
}

interface QuizHistoryItem {
  quiz: string
  score: number
  status: string
  statusColor: string
}

interface AdaptiveStep {
  label: string
  level: string
  done: boolean
  current?: boolean
  last?: boolean
}

const progressData: ProgressItem[] = [
  { topic: 'Konsep Mol', pct: 100, color: '#1A73E8' },
  { topic: 'Rumus Kimia & Massa Molar', pct: 100, color: '#1A73E8' },
  { topic: 'Persamaan Kimia', pct: 85, color: '#1A73E8' },
  { topic: 'Stoikiometri Larutan', pct: 60, color: '#FF9500' },
  { topic: 'Reagent Pembatas', pct: 40, color: '#FF9500' },
  { topic: 'Persen Hasil Reaksi', pct: 0, color: '#E2E8F0' },
]

const weekActivity: DayActivity[] = [
  { day: 'Sen', materi: 40, quiz: 20 },
  { day: 'Sel', materi: 55, quiz: 30 },
  { day: 'Rab', materi: 35, quiz: 25 },
  { day: 'Kam', materi: 70, quiz: 50 },
  { day: 'Jum', materi: 80, quiz: 60 },
  { day: 'Sab', materi: 90, quiz: 75 },
  { day: 'Min', materi: 15, quiz: 10 },
]

const misconceptions: Misconception[] = [
  {
    title: 'Subscript vs. koefisien',
    desc: 'Cenderung mengubah subscript saat menyetarakan persamaan reaksi.',
  },
  {
    title: 'Konversi mol ↔ massa',
    desc: 'Sesekali keliru memilih antara mol dan gram pada perhitungan dasar.',
  },
  {
    title: 'Hukum kekekalan massa',
    desc: 'Masih ada keraguan saat menyelesaikan soal stoikiometri bertingkat.',
  },
]

const quizHistory: QuizHistoryItem[] = [
  {
    quiz: 'Konsep Mol — Quiz 3',
    score: 92,
    status: 'Paham',
    statusColor: 'text-[#15803D] bg-[#DCFCE7]',
  },
  {
    quiz: 'Penyetaraan Persamaan',
    score: 65,
    status: 'Paham Sebagian',
    statusColor: 'text-[#B45309] bg-[#FEF3C7]',
  },
  {
    quiz: 'Massa Molar & Mr',
    score: 88,
    status: 'Paham',
    statusColor: 'text-[#15803D] bg-[#DCFCE7]',
  },
  {
    quiz: 'Stoikiometri Larutan',
    score: 44,
    status: 'Miskonsepsi',
    statusColor: 'text-[#B91C1C] bg-[#FEE2E2]',
  },
]

const adaptivePath: AdaptiveStep[] = [
  { label: 'Su', level: 'Sulit', done: true },
  { label: 'Se', level: 'Sedang', done: true },
  { label: 'Se', level: 'Sedang', done: true, current: true },
  { label: 'Mu', level: 'Mudah', done: false },
  { label: 'Mu', level: 'Mudah', done: false },
  { label: '?', level: 'Selesai', done: false, last: true },
]

export default function DashboardPage() {
  const [profile, setProfile] = useState<Profile | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let cancelled = false
    async function loadProfile() {
      const data = await getMyProfile()
      if (cancelled) return
      setProfile(data)
      setLoading(false)
    }
    loadProfile()
    return () => {
      cancelled = true
    }
  }, [])

  if (loading) {
    return (
      <div className="flex h-full items-center justify-center p-10">
        <div className="flex flex-col items-center gap-3">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-[#1A73E8] border-t-transparent" />
          <p className="text-sm text-[#94A3B8]">Memuat data dashboard…</p>
        </div>
      </div>
    )
  }

  const name = profile?.full_name?.trim() || 'Belajar AKURAT'
  const maxBar = Math.max(...weekActivity.map((day) => day.materi + day.quiz))

  return (
    <div className="space-y-6">
      <DashboardHero name={name} />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatsCard
          title="Materi selesai"
          value="8/15"
          description="53% dari total materi"
          icon={<FileText className="h-5 w-5" />}
        />
        <StatsCard
          title="Rata-rata quiz"
          value="78%"
          description="12 quiz selesai"
          icon={<Target className="h-5 w-5" />}
          valueColor="text-[#1A73E8]"
        />
        <StatsCard
          title="Total belajar"
          value="32 jam"
          description="Pekan ini: 4.5 jam"
          icon={<Clock className="h-5 w-5" />}
        />
        <StatsCard
          title="Kesiapan ujian"
          value="72%"
          description="Estimasi: Baik"
          icon={<Brain className="h-5 w-5" />}
          valueColor="text-[#FF9500]"
        />
      </div>

      <div className="grid gap-5 lg:grid-cols-[1.4fr_1fr]">
        <div className="rounded-[24px] border border-[#E2E8F0] bg-white p-6 shadow-[0_18px_50px_-42px_rgba(15,23,42,0.45)]">
          <div className="mb-5 flex items-center justify-between">
            <div>
              <h2 className="text-base font-bold text-[#0F172A]">Progres materi stoikiometri</h2>
              <p className="text-xs text-[#94A3B8]">Pelajari dari konsep dasar sampai aplikasi.</p>
            </div>
            <Link
              href="/dashboard/courses"
              className="inline-flex items-center gap-1 rounded-full bg-[#F8FEFF] px-3 py-1.5 text-xs font-semibold text-[#1A73E8] transition hover:bg-[#EAF3FF]"
            >
              Lihat semua
              <ChevronRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          <div className="space-y-4">
            {progressData.map((item) => (
              <div key={item.topic}>
                <div className="mb-1.5 flex items-center justify-between">
                  <span className="text-sm font-medium text-[#1E293B]">{item.topic}</span>
                  <span className="text-xs font-bold text-[#64748B]">{item.pct}%</span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-[#F1F5F9]">
                  <div
                    className="h-full rounded-full transition-[width] duration-700"
                    style={{ width: `${item.pct}%`, backgroundColor: item.color }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-[24px] border border-[#E2E8F0] bg-white p-6 shadow-[0_18px_50px_-42px_rgba(15,23,42,0.45)]">
          <div className="mb-5 flex items-center justify-between">
            <div>
              <h2 className="text-base font-bold text-[#0F172A]">Aktivitas pekan ini</h2>
              <p className="text-xs text-[#94A3B8]">Materi vs. quiz harian.</p>
            </div>
          </div>

          <div className="flex h-48 items-end gap-2">
            {weekActivity.map((day) => (
              <div key={day.day} className="flex flex-1 flex-col items-center gap-1.5">
                <div
                  className="flex w-full flex-col items-center justify-end gap-0.5"
                  style={{ height: '160px' }}
                >
                  <div
                    className="w-full rounded-t-md bg-[#1A73E8]"
                    style={{ height: `${(day.materi / maxBar) * 140}px` }}
                  />
                  <div
                    className="w-full bg-[#9FD6FF]"
                    style={{ height: `${(day.quiz / maxBar) * 140}px` }}
                  />
                </div>
                <span className="text-[10px] font-semibold text-[#94A3B8]">{day.day}</span>
              </div>
            ))}
          </div>

          <div className="mt-4 flex items-center gap-4 text-xs text-[#64748B]">
            <div className="flex items-center gap-1.5">
              <span className="h-2.5 w-2.5 rounded-sm bg-[#1A73E8]" />
              Materi
            </div>
            <div className="flex items-center gap-1.5">
              <span className="h-2.5 w-2.5 rounded-sm bg-[#9FD6FF]" />
              Quiz
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-5 lg:grid-cols-2">
        <div className="rounded-[24px] border border-[#FEF3C7] bg-[#FFFBEB] p-6 shadow-[0_18px_50px_-42px_rgba(15,23,42,0.4)]">
          <div className="mb-4 flex items-center gap-2.5">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#FFE4A1] text-[#B45309]">
              <AlertTriangle className="h-4 w-4" />
            </span>
            <div>
              <h2 className="text-sm font-bold text-[#92400E]">Area perlu perhatian</h2>
              <p className="text-xs text-[#B45309]">Miskonsepsi yang terdeteksi dari respons terbarumu.</p>
            </div>
          </div>

          <div className="space-y-3.5">
            {misconceptions.map((item) => (
              <div key={item.title} className="flex gap-3">
                <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-[#FF9500]" />
                <div>
                  <p className="text-sm font-bold text-[#0F172A]">{item.title}</p>
                  <p className="mt-0.5 text-xs leading-relaxed text-[#64748B]">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-[24px] border border-[#E2E8F0] bg-white p-6 shadow-[0_18px_50px_-42px_rgba(15,23,42,0.45)]">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h2 className="text-base font-bold text-[#0F172A]">Riwayat quiz terakhir</h2>
              <p className="text-xs text-[#94A3B8]">Capaian terbaru pada quiz adaptif.</p>
            </div>
            <Link
              href="/dashboard/progress"
              className="inline-flex items-center gap-1 rounded-full bg-[#F8FEFF] px-3 py-1.5 text-xs font-semibold text-[#1A73E8] transition hover:bg-[#EAF3FF]"
            >
              Lihat semua
              <ChevronRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          <div className="divide-y divide-[#F1F5F9]">
            <div className="grid grid-cols-[1fr_auto_auto] gap-3 pb-2.5 text-[10px] font-bold uppercase tracking-widest text-[#94A3B8]">
              <span>Quiz</span>
              <span>Skor</span>
              <span>Status</span>
            </div>
            {quizHistory.map((quiz) => (
              <div
                key={quiz.quiz}
                className="grid grid-cols-[1fr_auto_auto] items-center gap-3 py-2.5"
              >
                <span className="text-sm font-medium text-[#1E293B]">{quiz.quiz}</span>
                <span className="text-sm font-bold text-[#0F172A]">{quiz.score}%</span>
                <span
                  className={`rounded-full px-2.5 py-1 text-[11px] font-bold ${quiz.statusColor}`}
                >
                  {quiz.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="rounded-[24px] border border-[#E2E8F0] bg-white p-6 shadow-[0_18px_50px_-42px_rgba(15,23,42,0.45)]">
        <div className="mb-1 flex items-center justify-between">
          <h2 className="text-base font-bold text-[#0F172A]">Jalur adaptif terakhir (MSAT)</h2>
          <span className="rounded-full bg-[#F8FEFF] px-3 py-1 text-[11px] font-bold uppercase tracking-widest text-[#1A73E8]">
            Adaptive
          </span>
        </div>
        <p className="mb-6 text-xs text-[#94A3B8]">Penyetaraan persamaan — sesi 3 November 2024</p>

        <div className="flex items-center gap-0">
          {adaptivePath.map((step, index) => (
            <div key={`${step.label}-${index}`} className="flex flex-1 flex-col items-center">
              <div className="flex w-full items-center">
                <div
                  className={`mx-auto flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 text-xs font-bold transition-all ${
                    step.current
                      ? 'border-[#1A73E8] bg-[#EAF3FF] text-[#1A73E8] ring-4 ring-[#1A73E8]/20'
                      : step.done
                        ? 'border-[#1A73E8] bg-[#1A73E8] text-white'
                        : step.last
                          ? 'border-[#E2E8F0] bg-[#F8FEFF] text-[#FF9500]'
                          : 'border-[#E2E8F0] bg-white text-[#94A3B8]'
                  }`}
                >
                  {step.label}
                </div>
                {index < adaptivePath.length - 1 && (
                  <div
                    className={`h-0.5 flex-1 ${step.done ? 'bg-[#1A73E8]' : 'bg-[#E2E8F0]'}`}
                  />
                )}
              </div>
              <p className="mt-2 text-center text-[10px] font-semibold text-[#94A3B8]">
                {step.level}
              </p>
            </div>
          ))}
        </div>

        <p className="mt-5 text-xs text-[#64748B]">
          Estimasi kemampuan: <strong className="text-[#0F172A]">θ = -0.42 (Sedang-Bawah)</strong>
        </p>
      </div>
    </div>
  )
}
