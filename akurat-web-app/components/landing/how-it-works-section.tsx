'use client'

import { motion } from 'framer-motion'
import { FadeIn, StaggerContainer, staggerItemVariants } from '@/components/animations/motion'
import {
  BookOpen,
  Brain,
  TrendingUp,
  Zap,
  CheckCircle,
  ArrowRight,
} from 'lucide-react'
import Link from 'next/link'

const steps = [
  {
    number: '01',
    icon: BookOpen,
    title: 'Pelajari Materi',
    description:
      'Akses materi kimia terstruktur mulai dari konsep dasar hingga olimpiade. Video, teks, dan visualisasi interaktif.',
    color: '#4F46E5',
    bg: '#EEF2FF',
  },
  {
    number: '02',
    icon: Brain,
    title: 'Ambil Quiz Adaptif',
    description:
      'Quiz cerdas yang menyesuaikan tingkat kesulitan berdasarkan pemahamanmu. Identifikasi miskonsepsi secara real-time.',
    color: '#7C3AED',
    bg: '#F5F3FF',
  },
  {
    number: '03',
    icon: Zap,
    title: 'Dapatkan XP & Reward',
    description:
      'Setiap pelajaran dan quiz memberimu XP. Naikkan level, pertahankan streak, dan raih achievement.',
    color: '#F59E0B',
    bg: '#FFFBEB',
  },
  {
    number: '04',
    icon: TrendingUp,
    title: 'Lacak Progresmu',
    description:
      'Dashboard analitik canggih menampilkan area kuat dan lemah. Fokus belajar berdasarkan data, bukan tebakan.',
    color: '#10B981',
    bg: '#ECFDF5',
  },
]

export function HowItWorksSection() {
  return (
    <section id="how-it-works" className="bg-white py-24">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <FadeIn direction="up" className="mb-16 text-center">
          <span className="mb-4 inline-block rounded-full bg-[#EEF2FF] px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-[#4F46E5]">
            Cara Kerja
          </span>
          <h2 className="text-3xl font-extrabold text-[#0F172A] sm:text-4xl lg:text-5xl">
            Belajar yang{' '}
            <span className="bg-gradient-to-r from-[#4F46E5] to-[#7C3AED] bg-clip-text text-transparent">
              Terstruktur
            </span>
            <br />& Menyenangkan
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base text-[#64748B]">
            AKURAT menggabungkan pembelajaran adaptif, gamifikasi, dan analitik untuk
            pengalaman belajar kimia yang paling efektif.
          </p>
        </FadeIn>

        {/* Steps grid */}
        <StaggerContainer staggerDelay={0.12} className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step) => {
            const Icon = step.icon
            return (
              <motion.div
                key={step.number}
                variants={staggerItemVariants}
                className="group relative overflow-hidden rounded-3xl border border-[#F1F5F9] bg-white p-6 shadow-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
              >
                {/* Step number - background */}
                <div className="absolute right-4 top-4 text-7xl font-black text-[#F8FAFC] select-none leading-none">
                  {step.number}
                </div>

                {/* Icon */}
                <div
                  className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl"
                  style={{ backgroundColor: step.bg }}
                >
                  <Icon className="h-6 w-6" style={{ color: step.color }} />
                </div>

                {/* Content */}
                <h3 className="mb-2.5 text-base font-bold text-[#0F172A]">{step.title}</h3>
                <p className="text-sm leading-relaxed text-[#64748B]">{step.description}</p>

                {/* Bottom accent */}
                <motion.div
                  className="absolute bottom-0 left-0 h-1 w-0 rounded-full group-hover:w-full"
                  style={{ backgroundColor: step.color }}
                  transition={{ duration: 0.35 }}
                  whileHover={{ width: '100%' }}
                />
              </motion.div>
            )
          })}
        </StaggerContainer>

        {/* CTA */}
        <FadeIn direction="up" delay={0.4} className="mt-12 text-center">
          <Link
            href="/register"
            className="inline-flex items-center gap-2 rounded-2xl bg-[#4F46E5] px-8 py-4 text-sm font-bold text-white shadow-lg shadow-[#4F46E5]/25 transition-all hover:bg-[#4338CA] hover:-translate-y-0.5"
          >
            Mulai Gratis Sekarang
            <ArrowRight className="h-4 w-4" />
          </Link>
        </FadeIn>
      </div>
    </section>
  )
}

// ─── Olympiad Prep Section ────────────────────────────────────────────────────

const olympiadFeatures = [
  'Soal-soal OSK, OSP, OSN dari tahun sebelumnya',
  'Pembahasan mendalam untuk setiap soal',
  'Track progress persiapan olimpiade',
  'Materi kimia tingkat lanjut',
  'Simulasi ujian dengan waktu nyata',
  'Ranking dan leaderboard kompetitif',
]

export function OlympiadSection() {
  return (
    <section id="olympiad" className="bg-[#0F172A] py-24">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          {/* Left */}
          <FadeIn direction="right">
            <span className="mb-4 inline-block rounded-full bg-[#FACC15]/20 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-[#FACC15]">
              Olimpiade Kimia
            </span>
            <h2 className="text-3xl font-extrabold text-white sm:text-4xl lg:text-5xl">
              Persiapan{' '}
              <span className="text-[#FACC15]">Olimpiade</span>{' '}
              Kimia
              <br />
              Terlengkap
            </h2>
            <p className="mt-4 text-[#94A3B8]">
              Raih medali olimpiade dengan persiapan sistematis. Materi, latihan soal, dan
              pembahasan yang disusun oleh para alumni olimpiade kimia nasional.
            </p>

            <ul className="mt-8 space-y-3">
              {olympiadFeatures.map((f) => (
                <li key={f} className="flex items-center gap-3 text-sm text-[#CBD5E1]">
                  <CheckCircle className="h-4 w-4 shrink-0 text-[#22C55E]" />
                  {f}
                </li>
              ))}
            </ul>

            <Link
              href="/register"
              className="mt-8 inline-flex items-center gap-2 rounded-2xl bg-[#FACC15] px-7 py-3.5 text-sm font-bold text-[#0F172A] shadow-lg shadow-[#FACC15]/20 transition-all hover:bg-[#EAB308] hover:-translate-y-0.5"
            >
              Mulai Persiapan Olimpiade
              <ArrowRight className="h-4 w-4" />
            </Link>
          </FadeIn>

          {/* Right — visual */}
          <FadeIn direction="left" delay={0.2}>
            <div className="relative">
              {/* Main card */}
              <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
                <div className="mb-4 flex items-center justify-between">
                  <h3 className="font-bold text-white">Simulasi Ujian OSK</h3>
                  <span className="rounded-full bg-[#FACC15]/20 px-3 py-1 text-xs font-bold text-[#FACC15]">
                    Live
                  </span>
                </div>
                <div className="space-y-3">
                  {[
                    { q: 'Termokimia — Entalpi Pembentukan', score: 85, color: '#22C55E' },
                    { q: 'Kinetika Reaksi — Orde Reaksi', score: 70, color: '#FACC15' },
                    { q: 'Kesetimbangan Kimia — Le Chatelier', score: 55, color: '#F97316' },
                    { q: 'Elektrokimia — Potensial Sel', score: 40, color: '#EF4444' },
                  ].map((item) => (
                    <div
                      key={item.q}
                      className="rounded-xl border border-white/8 bg-white/5 p-3"
                    >
                      <div className="mb-1.5 flex justify-between text-xs">
                        <span className="text-[#CBD5E1]">{item.q}</span>
                        <span className="font-bold text-white">{item.score}%</span>
                      </div>
                      <div className="h-1.5 overflow-hidden rounded-full bg-white/10">
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
                <div className="mt-4 flex items-center justify-between rounded-xl bg-[#FACC15]/10 p-3">
                  <span className="text-sm text-[#FACC15]">Total Skor</span>
                  <span className="text-xl font-extrabold text-[#FACC15]">62.5%</span>
                </div>
              </div>

              {/* Decorative glow */}
              <div className="absolute -right-8 -top-8 h-48 w-48 rounded-full bg-[#4F46E5]/20 blur-3xl" />
              <div className="absolute -bottom-8 -left-8 h-48 w-48 rounded-full bg-[#FACC15]/15 blur-3xl" />
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  )
}
