'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, Building2, GraduationCap, ShieldCheck, UserRoundCheck } from 'lucide-react'

const userTypes = [
  {
    icon: GraduationCap,
    title: 'Siswa',
    description:
      'Belajar materi, latihan soal, mengikuti ujian coba, dan memahami area yang perlu diperbaiki.',
    color: '#1A73E8',
  },
  {
    icon: UserRoundCheck,
    title: 'Guru dan mentor',
    description:
      'Mengunggah materi, membuat quiz, membaca analytics kelas, dan menindaklanjuti miskonsepsi.',
    color: '#00A9D6',
  },
  {
    icon: ShieldCheck,
    title: 'Admin dan asosiasi',
    description:
      'Mengatur akses eksklusif, approval konten, subscription, dan ekspor data riset secara terkontrol.',
    color: '#FF9500',
  },
]

export function TargetUsersSection() {
  return (
    <section id="about" className="bg-white py-24">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14">
          <motion.div
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <span className="mb-4 inline-flex items-center gap-2 rounded-full bg-[#EDF2F2] px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-[#1A73E8]">
              <Building2 className="h-3.5 w-3.5" />
              Role based platform
            </span>
            <h2 className="text-3xl font-extrabold leading-tight text-[#0F172A] sm:text-4xl lg:text-5xl">
              Dibangun untuk ekosistem belajar yang lengkap.
            </h2>
            <p className="mt-4 max-w-lg text-base leading-relaxed text-[#64748B]">
              AKURAT tidak hanya cantik untuk siswa. Struktur role, analytics, dan akses admin
              disiapkan untuk implementasi sekolah, asosiasi, dan pilot riset.
            </p>
            <Link
              href="/register"
              className="mt-8 inline-flex items-center gap-2 rounded-2xl bg-[#1A73E8] px-7 py-3.5 text-sm font-bold text-white shadow-lg shadow-[#1A73E8]/20 transition hover:-translate-y-0.5 hover:bg-[#155FC3]"
            >
              Coba sebagai pengguna
              <ArrowRight className="h-4 w-4" />
            </Link>
          </motion.div>

          <div className="grid gap-4">
            {userTypes.map((user, index) => {
              const Icon = user.icon
              return (
                <motion.article
                  key={user.title}
                  initial={{ opacity: 0, x: 24 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.08 }}
                  viewport={{ once: true }}
                  className="rounded-[28px] border border-[#E2E8F0] bg-[#F8FAFB] p-5 transition-all hover:bg-white hover:shadow-[0_24px_60px_-44px_rgba(15,23,42,0.55)]"
                >
                  <div className="flex gap-4">
                    <div
                      className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white shadow-sm"
                      style={{ color: user.color }}
                    >
                      <Icon className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="text-lg font-extrabold text-[#0F172A]">{user.title}</h3>
                      <p className="mt-1 text-sm leading-relaxed text-[#64748B]">{user.description}</p>
                    </div>
                  </div>
                </motion.article>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
