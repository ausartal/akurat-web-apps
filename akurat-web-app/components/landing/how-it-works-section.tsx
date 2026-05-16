'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, BookOpen, Brain, CheckCircle, TrendingUp, Zap } from 'lucide-react'
import { FadeIn, StaggerContainer, staggerItemVariants } from '@/components/animations/motion'

const steps = [
  {
    number: '01',
    icon: BookOpen,
    title: 'Pelajari Materi',
    description:
      'Mulai dari mol, massa molar, persamaan reaksi, sampai pereaksi pembatas dengan jalur belajar bertahap.',
    color: '#1A73E8',
    bg: '#EAF3FF',
  },
  {
    number: '02',
    icon: Brain,
    title: 'Kerjakan Quiz Adaptif',
    description:
      'Pertanyaan menyesuaikan respons dan confidence, sehingga latihan terasa menantang tanpa membuat siswa tersesat.',
    color: '#00A9D6',
    bg: '#E8FAFF',
  },
  {
    number: '03',
    icon: Zap,
    title: 'Ikuti Ujian MSAT',
    description:
      'Router, adaptive module, refinement, dan confidence rating bekerja untuk mengukur kemampuan lebih presisi.',
    color: '#FF9500',
    bg: '#FFFBEB',
  },
  {
    number: '04',
    icon: TrendingUp,
    title: 'Baca Rekomendasi',
    description:
      'Laporan kompetensi memberi area kuat, miskonsepsi, dan prioritas remedial untuk siswa maupun guru.',
    color: '#00B84D',
    bg: '#ECFDF5',
  },
]

const olympiadFeatures = [
  'Bank soal HOTS stoikiometri dan olimpiade',
  'Pembahasan konsep untuk pola miskonsepsi utama',
  'Progress persiapan ujian dan remedial',
  'Materi kimia tingkat lanjut yang tetap bertahap',
  'Simulasi ujian dengan timer dan autosave',
  'Analitik kelas untuk guru dan mentor',
]

const readinessScores = [
  { q: 'Konsep mol dan massa molar', score: 85, color: '#00B84D' },
  { q: 'Rasio koefisien reaksi', score: 72, color: '#00C2FF' },
  { q: 'Pereaksi pembatas', score: 56, color: '#FF9500' },
  { q: 'Volume gas pada STP', score: 42, color: '#E63946' },
]

export function HowItWorksSection() {
  return (
    <section id="how-it-works" className="bg-white py-24">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        <FadeIn direction="up" className="mb-16 text-center">
          <span className="mb-4 inline-block rounded-full bg-[#EAF3FF] px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-[#1A73E8]">
            Alur Belajar
          </span>
          <h2 className="text-3xl font-extrabold text-[#0F172A] sm:text-4xl lg:text-5xl">
            Belajar yang <span className="text-[#1A73E8]">terstruktur</span>
            <br />
            dan mudah ditindaklanjuti
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base text-[#64748B]">
            AKURAT dirancang agar siswa tahu harus belajar apa, guru tahu harus membantu di mana,
            dan hasil ujian bisa dipakai sebagai peta tindakan.
          </p>
        </FadeIn>

        <StaggerContainer staggerDelay={0.12} className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step) => {
            const Icon = step.icon
            return (
              <motion.div
                key={step.number}
                variants={staggerItemVariants}
                className="group relative overflow-hidden rounded-[28px] border border-[#E2E8F0] bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_24px_60px_-42px_rgba(15,23,42,0.55)]"
              >
                <div className="absolute right-4 top-4 select-none text-7xl font-black leading-none text-[#F8FAFC]">
                  {step.number}
                </div>
                <div
                  className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl"
                  style={{ backgroundColor: step.bg }}
                >
                  <Icon className="h-6 w-6" style={{ color: step.color }} />
                </div>
                <h3 className="mb-2.5 text-base font-bold text-[#0F172A]">{step.title}</h3>
                <p className="text-sm leading-relaxed text-[#64748B]">{step.description}</p>
                <div
                  className="absolute bottom-0 left-0 h-1 w-full origin-left scale-x-0 rounded-full transition-transform duration-300 group-hover:scale-x-100"
                  style={{ backgroundColor: step.color }}
                />
              </motion.div>
            )
          })}
        </StaggerContainer>

        <FadeIn direction="up" delay={0.4} className="mt-12 text-center">
          <Link
            href="/register"
            className="inline-flex items-center gap-2 rounded-2xl bg-[#1A73E8] px-8 py-4 text-sm font-bold text-white shadow-lg shadow-[#1A73E8]/25 transition-all hover:-translate-y-0.5 hover:bg-[#155FC3]"
          >
            Mulai Belajar Sekarang
            <ArrowRight className="h-4 w-4" />
          </Link>
        </FadeIn>
      </div>
    </section>
  )
}

export function OlympiadSection() {
  return (
    <section id="olympiad" className="bg-[#F8FAFB] py-24">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <FadeIn direction="right">
            <span className="mb-4 inline-block rounded-full bg-[#FFF3DF] px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-[#B86200]">
              Exam readiness
            </span>
            <h2 className="text-3xl font-extrabold text-[#0F172A] sm:text-4xl lg:text-5xl">
              Siap untuk ujian sekolah,
              <span className="text-[#FF9500]"> olimpiade,</span> dan
              <br />
              riset pembelajaran.
            </h2>
            <p className="mt-4 text-[#64748B]">
              Satu platform untuk pembelajaran stoikiometri, ujian adaptif, dan data
              miskonsepsi yang bisa dipakai untuk intervensi kelas maupun penelitian.
            </p>

            <ul className="mt-8 space-y-3">
              {olympiadFeatures.map((feature) => (
                <li key={feature} className="flex items-center gap-3 text-sm text-[#334155]">
                  <CheckCircle className="h-4 w-4 shrink-0 text-[#00B84D]" />
                  {feature}
                </li>
              ))}
            </ul>

            <Link
              href="/register"
              className="mt-8 inline-flex items-center gap-2 rounded-2xl bg-[#FF9500] px-7 py-3.5 text-sm font-bold text-white shadow-lg shadow-[#FF9500]/20 transition-all hover:-translate-y-0.5 hover:bg-[#E58700]"
            >
              Mulai Persiapan
              <ArrowRight className="h-4 w-4" />
            </Link>
          </FadeIn>

          <FadeIn direction="left" delay={0.2}>
            <div className="rounded-[30px] border border-[#D9EEF2] bg-white p-6 shadow-[0_24px_70px_-48px_rgba(15,23,42,0.55)]">
              <div className="mb-4 flex items-center justify-between">
                <h3 className="font-bold text-[#0F172A]">Simulasi Ujian Adaptif</h3>
                <span className="rounded-full bg-[#E8FAFF] px-3 py-1 text-xs font-bold text-[#00A9D6]">
                  MSAT
                </span>
              </div>
              <div className="space-y-3">
                {readinessScores.map((item) => (
                  <div key={item.q} className="rounded-xl border border-[#E2E8F0] bg-[#F8FAFB] p-3">
                    <div className="mb-1.5 flex justify-between gap-3 text-xs">
                      <span className="text-[#475569]">{item.q}</span>
                      <span className="font-bold text-[#0F172A]">{item.score}%</span>
                    </div>
                    <div className="h-1.5 overflow-hidden rounded-full bg-white">
                      <motion.div
                        className="h-full rounded-full"
                        style={{ backgroundColor: item.color }}
                        initial={{ width: 0 }}
                        whileInView={{ width: `${item.score}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, ease: 'easeOut' }}
                      />
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4 flex items-center justify-between rounded-xl bg-[#FFF3DF] p-3">
                <span className="text-sm font-semibold text-[#B86200]">Prioritas remedial</span>
                <span className="text-xl font-extrabold text-[#FF9500]">STP</span>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  )
}
