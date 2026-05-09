'use client'

import { useEffect, useState } from 'react'
import { FileText, Target, Clock, Brain, AlertTriangle, ChevronRight } from 'lucide-react'

import DashboardHero from '@/components/dashboard/hero-section'
import StatsCard from '@/components/dashboard/stats-card'
import { getMyProfile } from '@/features/profile/services/profile.service'

// Static mock data representing the reference design
const progressData = [
  { topic: 'Konsep Mol', pct: 100, color: '#2563EB' },
  { topic: 'Rumus Kimia & Massa Molar', pct: 100, color: '#2563EB' },
  { topic: 'Persamaan Kimia', pct: 85, color: '#2563EB' },
  { topic: 'Stoikiometri Larutan', pct: 60, color: '#F97316' },
  { topic: 'Reagent Pembatas', pct: 40, color: '#F97316' },
  { topic: 'Persen Hasil Reaksi', pct: 0, color: '#E2E8F0' },
]

const weekActivity = [
  { day: 'Sen', materi: 40, quiz: 20 },
  { day: 'Sel', materi: 55, quiz: 30 },
  { day: 'Rab', materi: 35, quiz: 25 },
  { day: 'Kam', materi: 70, quiz: 50 },
  { day: 'Jum', materi: 80, quiz: 60 },
  { day: 'Sab', materi: 90, quiz: 75 },
  { day: 'Min', materi: 15, quiz: 10 },
]

const misconceptions = [
  {
    title: 'Subscript vs. Koefisien',
    desc: 'Kamu cenderung mengubah subscript alih-alih koefisien saat menyetarakan persamaan',
  },
  {
    title: 'Satuan Mol — Massa',
    desc: 'Terkadang keliru antara mol dan gram dalam perhitungan',
  },
  {
    title: 'Hukum Kekekalan Massa',
    desc: 'Masih ada keraguan dalam soal bertingkat',
  },
]

const quizHistory = [
  { quiz: 'Konsep Mol — Quiz 3', score: 92, status: 'Paham', statusColor: 'text-[#16A34A] bg-[#DCFCE7]' },
  { quiz: 'Penyetaraan Persamaan', score: 65, status: 'Paham Sebagian', statusColor: 'text-[#D97706] bg-[#FEF3C7]' },
  { quiz: 'Massa Molar & Mr', score: 88, status: 'Paham', statusColor: 'text-[#16A34A] bg-[#DCFCE7]' },
  { quiz: 'Stoikiometri Larutan', score: 44, status: 'Miskonsepsi!', statusColor: 'text-[#DC2626] bg-[#FEE2E2]' },
]

const adaptivePath = [
  { label: 'Su', level: 'Sulit', done: true },
  { label: 'Se', level: 'Sedang', done: true },
  { label: 'Se', level: 'Sedang', done: true, current: true },
  { label: 'Mu', level: 'Mudah', done: false },
  { label: 'Mu', level: 'Mudah', done: false },
  { label: '?', level: 'Selesai', done: false, last: true },
]

export default function DashboardPage() {
  const [profile, setProfile] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadProfile() {
      const data = await getMyProfile()
      setProfile(data)
      setLoading(false)
    }
    loadProfile()
  }, [])

  if (loading) {
    return (
      <div className="flex h-full items-center justify-center p-10">
        <div className="flex flex-col items-center gap-3">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-[#4F46E5] border-t-transparent" />
          <p className="text-sm text-[#94A3B8]">Memuat data...</p>
        </div>
      </div>
    )
  }

  const name = profile?.full_name ?? 'Pengguna'

  const maxBar = Math.max(...weekActivity.map((d) => d.materi + d.quiz))

  return (
    <div className="space-y-6">
      {/* Hero banner */}
      <DashboardHero name={name} />

      {/* Stats row */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatsCard
          title="Materi Selesai"
          value="8/15"
          description="53% dari total materi"
          icon={<FileText className="h-5 w-5" />}
        />
        <StatsCard
          title="Rata-rata Quiz"
          value="78%"
          description="12 quiz selesai"
          icon={<Target className="h-5 w-5" />}
          valueColor="text-[#2563EB]"
        />
        <StatsCard
          title="Total Belajar"
          value="32 jam"
          description="Minggu ini: 4.5 jam"
          icon={<Clock className="h-5 w-5" />}
        />
        <StatsCard
          title="Kesiapan Exam"
          value="72%"
          description="Estimasi: Baik"
          icon={<Brain className="h-5 w-5" />}
          valueColor="text-[#7C3AED]"
        />
      </div>

      {/* Progress + Activity row */}
      <div className="grid gap-5 lg:grid-cols-[1.4fr_1fr]">
        {/* Progress materi */}
        <div className="rounded-2xl border border-[#F1F5F9] bg-white p-6 shadow-sm">
          <div className="mb-5 flex items-center justify-between">
            <h2 className="text-base font-bold text-[#0F172A]">Progres Materi Stoikiometri</h2>
            <button className="flex items-center gap-1 text-xs font-semibold text-[#4F46E5] hover:text-[#4338CA] transition-colors">
              Lihat semua <ChevronRight className="h-3.5 w-3.5" />
            </button>
          </div>
          <div className="space-y-4">
            {progressData.map((item) => (
              <div key={item.topic}>
                <div className="mb-1.5 flex items-center justify-between">
                  <span className="text-sm text-[#374151]">{item.topic}</span>
                  <span className="text-xs font-semibold text-[#64748B]">{item.pct}%</span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-[#F1F5F9]">
                  <div
                    className="h-full rounded-full transition-all duration-700"
                    style={{ width: `${item.pct}%`, backgroundColor: item.color }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Weekly activity chart */}
        <div className="rounded-2xl border border-[#F1F5F9] bg-white p-6 shadow-sm">
          <h2 className="mb-5 text-base font-bold text-[#0F172A]">Aktivitas Minggu Ini</h2>
          <div className="flex h-48 items-end gap-2">
            {weekActivity.map((d) => (
              <div key={d.day} className="flex flex-1 flex-col items-center gap-1">
                <div className="flex w-full flex-col items-center gap-0.5" style={{ height: '160px', justifyContent: 'flex-end' }}>
                  {/* Materi bar */}
                  <div
                    className="w-full rounded-t-sm bg-[#2563EB]"
                    style={{ height: `${(d.materi / maxBar) * 140}px` }}
                  />
                  {/* Quiz bar */}
                  <div
                    className="w-full bg-[#93C5FD]"
                    style={{ height: `${(d.quiz / maxBar) * 140}px` }}
                  />
                </div>
                <span className="text-[10px] text-[#94A3B8]">{d.day}</span>
              </div>
            ))}
          </div>
          {/* Legend */}
          <div className="mt-3 flex items-center gap-4">
            <div className="flex items-center gap-1.5">
              <div className="h-2.5 w-2.5 rounded-sm bg-[#2563EB]" />
              <span className="text-xs text-[#64748B]">Materi</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="h-2.5 w-2.5 rounded-sm bg-[#93C5FD]" />
              <span className="text-xs text-[#64748B]">Quiz</span>
            </div>
          </div>
        </div>
      </div>

      {/* Misconceptions + Quiz history */}
      <div className="grid gap-5 lg:grid-cols-2">
        {/* Misconceptions */}
        <div className="rounded-2xl border border-[#FEF3C7] bg-[#FFFBEB] p-6 shadow-sm">
          <div className="mb-4 flex items-center gap-2.5">
            <AlertTriangle className="h-4.5 w-4.5 text-[#D97706]" style={{ width: '18px', height: '18px' }} />
            <h2 className="text-sm font-bold text-[#92400E]">Area Perlu Perhatian (Miskonsepsi Terdeteksi)</h2>
          </div>
          <div className="space-y-3.5">
            {misconceptions.map((m) => (
              <div key={m.title} className="flex gap-3">
                <div className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-[#F97316]" />
                <div>
                  <p className="text-sm font-semibold text-[#0F172A]">{m.title}</p>
                  <p className="mt-0.5 text-xs text-[#64748B]">{m.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quiz history */}
        <div className="rounded-2xl border border-[#F1F5F9] bg-white p-6 shadow-sm">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-base font-bold text-[#0F172A]">Riwayat Quiz Terakhir</h2>
            <button className="flex items-center gap-1 text-xs font-semibold text-[#4F46E5] hover:text-[#4338CA] transition-colors">
              Lihat semua <ChevronRight className="h-3.5 w-3.5" />
            </button>
          </div>
          <div className="space-y-0 divide-y divide-[#F8FAFC]">
            <div className="grid grid-cols-[1fr_auto_auto] gap-2 pb-2.5 text-[10px] font-bold uppercase tracking-widest text-[#94A3B8]">
              <span>Quiz</span>
              <span>Skor</span>
              <span>Status</span>
            </div>
            {quizHistory.map((q) => (
              <div key={q.quiz} className="grid grid-cols-[1fr_auto_auto] items-center gap-3 py-2.5">
                <span className="text-sm text-[#374151]">{q.quiz}</span>
                <span className="text-sm font-bold text-[#0F172A]">{q.score}%</span>
                <span className={`rounded-full px-2.5 py-1 text-[11px] font-semibold ${q.statusColor}`}>
                  {q.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Adaptive path */}
      <div className="rounded-2xl border border-[#F1F5F9] bg-white p-6 shadow-sm">
        <h2 className="mb-1 text-base font-bold text-[#0F172A]">Jalur Adaptif Terakhir (MSAT)</h2>
        <p className="mb-5 text-xs text-[#94A3B8]">Penyetaraan Persamaan — 3 Nov 2024</p>
        <div className="flex items-center gap-0">
          {adaptivePath.map((step, i) => (
            <div key={i} className="flex flex-1 flex-col items-center">
              <div className="flex items-center w-full">
                {/* Node */}
                <div
                  className={`mx-auto flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-xs font-bold border-2 transition-all ${
                    step.current
                      ? 'border-[#4F46E5] bg-[#EEF2FF] text-[#4F46E5] ring-4 ring-[#4F46E5]/20'
                      : step.done
                        ? 'border-[#4F46E5] bg-[#4F46E5] text-white'
                        : step.last
                          ? 'border-[#E2E8F0] bg-[#F8FAFC] text-[#FACC15]'
                          : 'border-[#E2E8F0] bg-white text-[#94A3B8]'
                  }`}
                >
                  {step.label}
                </div>
                {/* Connector */}
                {i < adaptivePath.length - 1 && (
                  <div className={`h-0.5 flex-1 ${step.done ? 'bg-[#4F46E5]' : 'bg-[#E2E8F0]'}`} />
                )}
              </div>
              <p className="mt-2 text-center text-[10px] text-[#94A3B8]">{step.level}</p>
            </div>
          ))}
        </div>
        <p className="mt-4 text-xs text-[#64748B]">
          Estimasi kemampuan: <strong>θ = -0.42 (Sedang-Bawah)</strong>
        </p>
      </div>
    </div>
  )
}
