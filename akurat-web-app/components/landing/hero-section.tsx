'use client'

import { useRef } from 'react'
import Link from 'next/link'
import { motion, useScroll, useTransform } from 'framer-motion'
import {
  Zap,
  Users,
  TrendingUp,
  Star,
  BookOpen,
  CheckCircle,
  ChevronRight,
  Play,
} from 'lucide-react'
import { FloatingElement, FadeIn, MagneticButton } from '@/components/animations/motion'

// ─── Floating glass card ──────────────────────────────────────────────────────

function GlassCard({
  children,
  className = '',
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <div
      className={`rounded-2xl border border-white/60 bg-white/80 p-4 shadow-xl backdrop-blur-sm ${className}`}
    >
      {children}
    </div>
  )
}

// ─── Dashboard Preview (right panel) ─────────────────────────────────────────

function DashboardPreview() {
  const topics = [
    { name: 'Konsep Mol', pct: 100, color: '#4F46E5' },
    { name: 'Massa Molar', pct: 85, color: '#4F46E5' },
    { name: 'Stoikiometri', pct: 60, color: '#FACC15' },
    { name: 'Reagent Pembatas', pct: 35, color: '#F97316' },
  ]

  return (
    <div className="relative h-full w-full">
      {/* Main dashboard mockup card */}
      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 mx-auto w-full max-w-sm overflow-hidden rounded-3xl border border-[#E2E8F0] bg-white shadow-2xl"
      >
        {/* Top bar */}
        <div className="bg-gradient-to-r from-[#4F46E5] to-[#7C3AED] px-5 py-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-blue-200">Selamat belajar 👋</p>
              <p className="text-sm font-bold text-white">Ahmad Rizky</p>
            </div>
            <div className="flex items-center gap-1.5 rounded-full bg-white/20 px-3 py-1 text-xs font-bold text-white">
              <Zap className="h-3.5 w-3.5 text-[#FACC15]" />
              1,240 XP
            </div>
          </div>
          {/* XP progress bar */}
          <div className="mt-3">
            <div className="mb-1 flex justify-between text-[10px] text-blue-200">
              <span>Level 7</span>
              <span>Level 8</span>
            </div>
            <div className="h-1.5 overflow-hidden rounded-full bg-white/30">
              <motion.div
                className="h-full rounded-full bg-[#FACC15]"
                initial={{ width: 0 }}
                animate={{ width: '72%' }}
                transition={{ delay: 1.2, duration: 1, ease: 'easeOut' }}
              />
            </div>
          </div>
        </div>

        {/* Body */}
        <div className="p-4 space-y-4">
          {/* Stats row */}
          <div className="grid grid-cols-3 gap-2">
            {[
              { label: 'Materi', value: '8/15' },
              { label: 'Quiz', value: '12' },
              { label: 'Streak', value: '3🔥' },
            ].map((stat) => (
              <div key={stat.label} className="rounded-xl bg-[#F8FAFC] p-2.5 text-center">
                <p className="text-base font-extrabold text-[#0F172A]">{stat.value}</p>
                <p className="text-[10px] text-[#94A3B8]">{stat.label}</p>
              </div>
            ))}
          </div>

          {/* Progress bars */}
          <div>
            <p className="mb-3 text-xs font-bold text-[#0F172A]">Progres Stoikiometri</p>
            <div className="space-y-2.5">
              {topics.map((t) => (
                <div key={t.name}>
                  <div className="mb-1 flex justify-between text-[10px]">
                    <span className="text-[#374151]">{t.name}</span>
                    <span className="font-semibold text-[#64748B]">{t.pct}%</span>
                  </div>
                  <div className="h-1.5 overflow-hidden rounded-full bg-[#F1F5F9]">
                    <motion.div
                      className="h-full rounded-full"
                      style={{ backgroundColor: t.color }}
                      initial={{ width: 0 }}
                      animate={{ width: `${t.pct}%` }}
                      transition={{ delay: 1.4, duration: 0.8, ease: 'easeOut' }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Floating badge: Active learners */}
      <FloatingElement
        className="absolute -left-8 top-12 z-20 hidden sm:block"
        amplitude={8}
        duration={3.5}
        delay={0}
      >
        <GlassCard className="min-w-[160px]">
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#DCFCE7]">
              <Users className="h-4 w-4 text-[#22C55E]" />
            </div>
            <div>
              <p className="text-xs font-bold text-[#0F172A]">2,847 Aktif</p>
              <p className="text-[10px] text-[#94A3B8]">Belajar sekarang</p>
            </div>
          </div>
          <div className="mt-2 flex gap-0.5">
            {Array.from({ length: 5 }).map((_, i) => (
              <motion.div
                key={i}
                className="h-1.5 w-1.5 rounded-full bg-[#22C55E]"
                animate={{ opacity: [0.4, 1, 0.4] }}
                transition={{ duration: 1.5, delay: i * 0.2, repeat: Infinity }}
              />
            ))}
          </div>
        </GlassCard>
      </FloatingElement>

      {/* Floating badge: XP earned */}
      <FloatingElement
        className="absolute -right-8 top-32 z-20 hidden sm:block"
        amplitude={10}
        duration={4}
        delay={0.5}
      >
        <GlassCard className="min-w-[140px]">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#FEFCE8]">
              <Zap className="h-4 w-4 text-[#FACC15]" />
            </div>
            <div>
              <p className="text-xs font-bold text-[#0F172A]">+50 XP</p>
              <p className="text-[10px] text-[#94A3B8]">Quiz selesai!</p>
            </div>
          </div>
        </GlassCard>
      </FloatingElement>

      {/* Floating badge: Accuracy */}
      <FloatingElement
        className="absolute -left-4 bottom-8 z-20 hidden sm:block"
        amplitude={9}
        duration={3.8}
        delay={1}
      >
        <GlassCard className="min-w-[150px]">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#EEF2FF]">
              <TrendingUp className="h-4 w-4 text-[#4F46E5]" />
            </div>
            <div>
              <p className="text-xs font-bold text-[#0F172A]">92% Akurasi</p>
              <p className="text-[10px] text-[#94A3B8]">Minggu ini</p>
            </div>
          </div>
        </GlassCard>
      </FloatingElement>
    </div>
  )
}

// ─── Main Hero ────────────────────────────────────────────────────────────────

export function HeroSection() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  })
  const yBg = useTransform(scrollYProgress, [0, 1], ['0%', '20%'])

  const trustItems = [
    { icon: Users, text: '12,000+ Pelajar' },
    { icon: Star, text: '4.9/5 Rating' },
    { icon: BookOpen, text: '200+ Materi' },
  ]

  const features = [
    'Pembelajaran Adaptif',
    'Deteksi Miskonsepsi',
    'Quiz Interaktif',
    'Progress Tracking',
  ]

  return (
    <section
      ref={ref}
      id="hero"
      className="relative min-h-screen overflow-hidden bg-[#F6F7FE] pt-20"
    >
      {/* Animated background gradient */}
      <motion.div
        style={{ y: yBg }}
        className="pointer-events-none absolute inset-0 overflow-hidden"
        aria-hidden="true"
      >
        {/* Large background orbs */}
        <div className="absolute -left-40 -top-40 h-[600px] w-[600px] rounded-full bg-gradient-to-br from-[#4F46E5]/15 to-[#7C3AED]/10 blur-3xl" />
        <div className="absolute -right-32 top-20 h-[500px] w-[500px] rounded-full bg-gradient-to-bl from-[#06B6D4]/10 to-[#4F46E5]/8 blur-3xl" />
        <div className="absolute bottom-0 left-1/2 h-[400px] w-[600px] -translate-x-1/2 rounded-full bg-gradient-to-t from-[#FACC15]/8 to-transparent blur-3xl" />

        {/* Animated grid */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              'linear-gradient(#4F46E5 1px, transparent 1px), linear-gradient(90deg, #4F46E5 1px, transparent 1px)',
            backgroundSize: '48px 48px',
          }}
        />

        {/* Floating molecules / atoms */}
        <FloatingElement
          className="absolute left-[8%] top-[20%]"
          amplitude={15}
          duration={5}
          delay={0}
        >
          <svg width="48" height="48" viewBox="0 0 48 48" fill="none" opacity="0.15">
            <circle cx="24" cy="24" r="8" fill="#4F46E5" />
            <circle cx="24" cy="8" r="4" fill="#4F46E5" />
            <circle cx="24" cy="40" r="4" fill="#4F46E5" />
            <circle cx="8" cy="24" r="4" fill="#4F46E5" />
            <circle cx="40" cy="24" r="4" fill="#4F46E5" />
            <line x1="24" y1="12" x2="24" y2="16" stroke="#4F46E5" strokeWidth="2" />
            <line x1="24" y1="32" x2="24" y2="36" stroke="#4F46E5" strokeWidth="2" />
            <line x1="12" y1="24" x2="16" y2="24" stroke="#4F46E5" strokeWidth="2" />
            <line x1="32" y1="24" x2="36" y2="24" stroke="#4F46E5" strokeWidth="2" />
          </svg>
        </FloatingElement>
        <FloatingElement
          className="absolute right-[5%] top-[30%]"
          amplitude={12}
          duration={4.5}
          delay={1.5}
        >
          <svg width="40" height="40" viewBox="0 0 40 40" fill="none" opacity="0.12">
            <circle cx="20" cy="20" r="12" stroke="#FACC15" strokeWidth="3" fill="none" />
            <circle cx="20" cy="20" r="4" fill="#FACC15" />
          </svg>
        </FloatingElement>
        <FloatingElement
          className="absolute left-[15%] bottom-[25%]"
          amplitude={18}
          duration={6}
          delay={0.8}
        >
          <svg width="32" height="56" viewBox="0 0 32 56" fill="none" opacity="0.1">
            <circle cx="16" cy="8" r="6" fill="#06B6D4" />
            <line x1="16" y1="14" x2="16" y2="42" stroke="#06B6D4" strokeWidth="2" />
            <circle cx="16" cy="48" r="6" fill="#F97316" />
          </svg>
        </FloatingElement>
      </motion.div>

      {/* Content */}
      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex min-h-[calc(100vh-80px)] flex-col items-center gap-12 pt-12 lg:flex-row lg:items-center lg:gap-16 lg:pt-16">
          {/* ── LEFT: Text ── */}
          <div className="flex-1 text-center lg:text-left">
            {/* Badge */}
            <FadeIn direction="down" delay={0}>
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#C7D2FE] bg-white/80 px-4 py-2 text-sm font-semibold text-[#4F46E5] shadow-sm backdrop-blur-sm">
                <span className="flex h-2 w-2 rounded-full bg-[#22C55E]">
                  <motion.span
                    className="block h-2 w-2 rounded-full bg-[#22C55E]"
                    animate={{ scale: [1, 1.8, 1], opacity: [1, 0, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                </span>
                Platform Kimia Adaptif #1 Indonesia
              </div>
            </FadeIn>

            {/* Headline */}
            <FadeIn direction="up" delay={0.1}>
              <h1 className="text-5xl font-extrabold leading-[1.1] tracking-tight text-[#0F172A] sm:text-6xl lg:text-7xl">
                <span className="block">MEASURE</span>
                <span className="block bg-gradient-to-r from-[#4F46E5] to-[#7C3AED] bg-clip-text text-transparent">
                  PRECISELY
                </span>
                <span className="block">LEARN</span>
                <span className="block text-[#FACC15] drop-shadow-sm">ACCURATELY</span>
              </h1>
            </FadeIn>

            {/* Sub */}
            <FadeIn direction="up" delay={0.25}>
              <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-[#475569] lg:mx-0">
                Lebih dari sekadar nilai. Diagnosis pemahaman kimia dan deteksi miskonsepsi
                secara presisi melalui platform adaptif terintegrasi.
              </p>
            </FadeIn>

            {/* Feature pills */}
            <FadeIn direction="up" delay={0.35}>
              <div className="mt-5 flex flex-wrap justify-center gap-2 lg:justify-start">
                {features.map((f) => (
                  <div
                    key={f}
                    className="flex items-center gap-1.5 rounded-full border border-[#E0E7FF] bg-white/60 px-3 py-1.5 text-xs font-medium text-[#4F46E5] backdrop-blur-sm"
                  >
                    <CheckCircle className="h-3.5 w-3.5" />
                    {f}
                  </div>
                ))}
              </div>
            </FadeIn>

            {/* CTA buttons */}
            <FadeIn direction="up" delay={0.45}>
              <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center lg:justify-start">
                <MagneticButton strength={0.25}>
                  <Link
                    href="/register"
                    className="group flex items-center gap-2.5 rounded-2xl bg-gradient-to-r from-[#4F46E5] to-[#7C3AED] px-7 py-4 text-base font-bold text-white shadow-xl shadow-[#4F46E5]/30 transition-all hover:shadow-[#4F46E5]/50 hover:-translate-y-0.5"
                  >
                    Mulai Belajar
                    <ChevronRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                  </Link>
                </MagneticButton>
                <Link
                  href="/dashboard/courses"
                  className="flex items-center gap-2 rounded-2xl border-2 border-[#E0E7FF] bg-white/80 px-7 py-4 text-base font-bold text-[#4F46E5] backdrop-blur-sm transition-all hover:border-[#4F46E5] hover:bg-white"
                >
                  <Play className="h-4 w-4" />
                  Lihat Kursus
                </Link>
              </div>
            </FadeIn>

            {/* Trust indicators */}
            <FadeIn direction="up" delay={0.55}>
              <div className="mt-10 flex flex-wrap items-center justify-center gap-6 lg:justify-start">
                {trustItems.map((item) => {
                  const Icon = item.icon
                  return (
                    <div key={item.text} className="flex items-center gap-2 text-sm">
                      <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#EEF2FF]">
                        <Icon className="h-3.5 w-3.5 text-[#4F46E5]" />
                      </div>
                      <span className="font-medium text-[#374151]">{item.text}</span>
                    </div>
                  )
                })}
              </div>
            </FadeIn>
          </div>

          {/* ── RIGHT: Dashboard preview ── */}
          <FadeIn
            direction="left"
            delay={0.3}
            className="relative w-full max-w-md flex-1 lg:max-w-none"
          >
            <div className="relative h-[520px] lg:h-[580px]">
              <DashboardPreview />
            </div>
          </FadeIn>
        </div>

        {/* Scroll indicator */}
        <FadeIn direction="up" delay={0.8}>
          <div className="flex justify-center pb-8">
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="flex flex-col items-center gap-1.5 text-xs text-[#94A3B8]"
            >
              <span>Scroll untuk lebih</span>
              <div className="h-5 w-[1px] rounded-full bg-gradient-to-b from-[#94A3B8] to-transparent" />
            </motion.div>
          </div>
        </FadeIn>
      </div>
    </section>
  )
}
