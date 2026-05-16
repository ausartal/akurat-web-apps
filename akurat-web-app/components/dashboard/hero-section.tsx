import Link from 'next/link'
import { ArrowRight, Flame, Sparkles, Star, TrendingUp } from 'lucide-react'

interface DashboardHeroProps {
  name: string
}

const STREAK_BADGES = [
  { icon: Flame, label: '3 hari streak', tone: 'text-[#FF9500]' },
  { icon: Star, label: 'Top 15% kelas', tone: 'text-[#FFC857]' },
  { icon: TrendingUp, label: '+12% pekan ini', tone: 'text-[#7BE38F]' },
]

export default function DashboardHero({ name }: DashboardHeroProps) {
  const today = new Date()
  const dateStr = today.toLocaleDateString('id-ID', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })

  const firstName = name.split(' ')[0]?.trim() || name

  return (
    <section className="relative overflow-hidden rounded-[28px] border border-white/15 bg-[linear-gradient(135deg,#0E4DAA_0%,#1A73E8_55%,#00C2FF_100%)] p-7 text-white shadow-[0_28px_80px_-48px_rgba(15,23,42,0.55)]">
      {/* Decorative grid */}
      <div
        className="absolute inset-0 opacity-[0.18]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.4) 1px, transparent 1px)',
          backgroundSize: '52px 52px',
          maskImage: 'radial-gradient(circle at top right, rgba(0,0,0,1), rgba(0,0,0,0) 65%)',
        }}
      />
      <div className="absolute -right-12 -top-16 h-56 w-56 rounded-full bg-[#FF9500]/35 blur-3xl" />
      <div className="absolute -bottom-20 left-12 h-48 w-48 rounded-full bg-white/15 blur-3xl" />

      <div className="relative z-10 grid gap-6 lg:grid-cols-[1.5fr_1fr] lg:items-center">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-[11px] font-bold uppercase tracking-widest backdrop-blur">
            <Sparkles className="h-3.5 w-3.5" />
            {dateStr}
          </div>

          <h1 className="mt-4 text-balance text-3xl font-black leading-tight sm:text-4xl">
            Halo, {firstName} 👋
            <br />
            <span className="text-white/90">Lanjutkan jalur belajar stoikiometrimu hari ini.</span>
          </h1>

          <p className="mt-3 max-w-xl text-sm leading-relaxed text-white/85 sm:text-base">
            Kamu sudah belajar 3 hari berturut-turut. Pertahankan momentum dengan menyelesaikan
            modul pereaksi pembatas dan ujian latihan singkat.
          </p>

          <div className="mt-6 flex flex-wrap gap-2">
            {STREAK_BADGES.map((badge) => {
              const Icon = badge.icon
              return (
                <span
                  key={badge.label}
                  className="inline-flex items-center gap-1.5 rounded-full bg-white/12 px-3 py-1.5 text-xs font-bold backdrop-blur"
                >
                  <Icon className={`h-3.5 w-3.5 ${badge.tone}`} />
                  {badge.label}
                </span>
              )
            })}
          </div>

          <div className="mt-7 flex flex-wrap items-center gap-3">
            <Link
              href="/dashboard/courses"
              className="group inline-flex h-11 items-center gap-2 rounded-xl bg-white px-5 text-sm font-bold text-[#1A73E8] shadow-md transition hover:-translate-y-0.5 hover:bg-[#F8FEFF]"
            >
              Lanjutkan materi
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              href="/dashboard/progress"
              className="inline-flex h-11 items-center gap-2 rounded-xl border border-white/30 bg-white/0 px-5 text-sm font-bold text-white transition hover:border-white/60 hover:bg-white/10"
            >
              Lihat progres
            </Link>
          </div>
        </div>

        {/* Mini progress preview */}
        <div className="relative">
          <div className="rounded-3xl border border-white/15 bg-white/10 p-5 backdrop-blur">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-white/75">
                  Estimasi kesiapan ujian
                </p>
                <p className="mt-1 text-3xl font-black">72%</p>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/15">
                <TrendingUp className="h-5 w-5" />
              </div>
            </div>
            <div className="mt-4 space-y-3">
              {[
                { topic: 'Konsep mol', value: 92, tone: '#7BE38F' },
                { topic: 'Pereaksi pembatas', value: 64, tone: '#FFB95A' },
                { topic: 'Volume gas (STP)', value: 38, tone: '#FF9F8A' },
              ].map((item) => (
                <div key={item.topic}>
                  <div className="mb-1 flex justify-between text-xs font-semibold text-white/85">
                    <span>{item.topic}</span>
                    <span>{item.value}%</span>
                  </div>
                  <div className="h-1.5 overflow-hidden rounded-full bg-white/15">
                    <div
                      className="h-full rounded-full"
                      style={{ width: `${item.value}%`, backgroundColor: item.tone }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
