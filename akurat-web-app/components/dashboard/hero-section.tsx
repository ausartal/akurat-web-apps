type DashboardHeroProps = {
  name: string
}

export default function DashboardHero({ name }: DashboardHeroProps) {
  const today = new Date()
  const dateStr = today.toLocaleDateString('id-ID', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })

  return (
    <section className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#2563EB] via-[#4F46E5] to-[#7C3AED] p-8 text-white shadow-lg">
      {/* Decorative blobs */}
      <div className="absolute -right-8 -top-8 h-48 w-48 rounded-full bg-[#FACC15] opacity-25 blur-2xl" />
      <div className="absolute right-24 -bottom-10 h-40 w-40 rounded-full bg-[#06B6D4] opacity-20 blur-2xl" />

      <div className="relative z-10">
        <p className="mb-1 text-sm font-medium text-blue-200">{dateStr}</p>
        <h1 className="text-2xl font-bold text-white sm:text-3xl">
          Selamat Datang, {name}! 👋
        </h1>
        <p className="mt-1.5 text-sm text-blue-100">
          Kamu sudah belajar 3 hari berturut-turut. Pertahankan streakmu!
        </p>

        {/* Badges */}
        <div className="mt-5 flex flex-wrap gap-2.5">
          <span className="flex items-center gap-1.5 rounded-full bg-white/15 px-3.5 py-1.5 text-xs font-semibold backdrop-blur-sm">
            🔥 3 Hari Streak
          </span>
          <span className="flex items-center gap-1.5 rounded-full bg-white/15 px-3.5 py-1.5 text-xs font-semibold backdrop-blur-sm">
            ⭐ Top 15%
          </span>
          <span className="flex items-center gap-1.5 rounded-full bg-white/15 px-3.5 py-1.5 text-xs font-semibold backdrop-blur-sm">
            📈 Meningkat +12% minggu ini
          </span>
        </div>
      </div>
    </section>
  )
}
