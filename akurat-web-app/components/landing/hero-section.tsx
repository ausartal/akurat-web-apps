'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  ArrowRight,
  BadgeCheck,
  BarChart3,
  BookOpenCheck,
  BrainCircuit,
  Calculator,
  FlaskConical,
  Gauge,
  LockKeyhole,
  MessageSquareText,
  Play,
  Sparkles,
  Target,
  Timer,
} from 'lucide-react'

interface MetricItem {
  label: string
  value: string
  helper: string
}

interface PathNode {
  label: string
  state: 'done' | 'active' | 'next'
}

const metrics: MetricItem[] = [
  { label: 'MSAT stages', value: '4', helper: 'Router sampai confidence' },
  { label: 'Deteksi miskonsepsi', value: '6+', helper: 'Pola stoikiometri utama' },
  { label: 'Mode akses', value: '3', helper: 'Siswa, guru, admin' },
]

const pathNodes: PathNode[] = [
  { label: 'Mol', state: 'done' },
  { label: 'Rasio reaksi', state: 'done' },
  { label: 'Pereaksi pembatas', state: 'active' },
  { label: 'Gas STP', state: 'next' },
]

function LearningConstellation() {
  return (
    <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
      <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(255,255,255,0.92)_0%,rgba(237,242,242,0.86)_46%,rgba(220,244,255,0.74)_100%)]" />
      <div className="absolute inset-x-0 top-0 h-28 bg-[linear-gradient(180deg,rgba(255,255,255,0.98),rgba(255,255,255,0))]" />
      <div
        className="absolute inset-0 opacity-[0.16]"
        style={{
          backgroundImage:
            'linear-gradient(#1A73E8 1px, transparent 1px), linear-gradient(90deg, #1A73E8 1px, transparent 1px)',
          backgroundSize: '56px 56px',
        }}
      />

      <motion.div
        className="absolute left-[6%] top-[22%] hidden h-28 w-28 rounded-[30px] border border-[#BFEFFF] bg-white/70 p-4 shadow-[0_24px_70px_-42px_rgba(26,115,232,0.65)] backdrop-blur md:block"
        animate={{ y: [-8, 8, -8], rotate: [-2, 2, -2] }}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
      >
        <FlaskConical className="h-7 w-7 text-[#1A73E8]" />
        <div className="mt-4 h-2 w-16 rounded-full bg-[#00C2FF]" />
        <div className="mt-2 h-2 w-10 rounded-full bg-[#FF9500]" />
      </motion.div>

      <motion.div
        className="absolute right-[8%] top-[18%] hidden rounded-[28px] border border-[#FFE1AE] bg-white/75 p-4 shadow-[0_24px_70px_-42px_rgba(255,149,0,0.65)] backdrop-blur lg:block"
        animate={{ y: [10, -10, 10], rotate: [2, -2, 2] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      >
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#FFF1D6]">
            <Target className="h-5 w-5 text-[#FF9500]" />
          </div>
          <div>
            <div className="h-2 w-24 rounded-full bg-[#0F172A]" />
            <div className="mt-2 h-2 w-16 rounded-full bg-[#94A3B8]" />
          </div>
        </div>
      </motion.div>

      <motion.div
        className="absolute bottom-[15%] left-[9%] hidden rounded-[28px] border border-[#C8F5FF] bg-white/75 p-4 shadow-[0_24px_70px_-42px_rgba(0,194,255,0.65)] backdrop-blur xl:block"
        animate={{ y: [-6, 12, -6] }}
        transition={{ duration: 6.5, repeat: Infinity, ease: 'easeInOut' }}
      >
        <div className="flex items-center gap-3">
          <Calculator className="h-5 w-5 text-[#00A9D6]" />
          <span className="text-xs font-bold text-[#0F172A]">22.4 L/mol</span>
        </div>
      </motion.div>

      <div className="absolute inset-x-0 bottom-0 h-32 bg-[linear-gradient(0deg,#FFFFFF_0%,rgba(255,255,255,0)_100%)]" />
    </div>
  )
}

function ProductPreview() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 32, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.8, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
      className="mx-auto mt-12 w-full max-w-5xl overflow-hidden rounded-[30px] border border-white/80 bg-white/88 text-left shadow-[0_34px_110px_-60px_rgba(15,23,42,0.55)] backdrop-blur-xl"
    >
      <div className="flex items-center justify-between border-b border-[#E2E8F0] px-4 py-3 sm:px-5">
        <div className="flex items-center gap-2">
          <span className="h-3 w-3 rounded-full bg-[#FF5F57]" />
          <span className="h-3 w-3 rounded-full bg-[#FFBD2E]" />
          <span className="h-3 w-3 rounded-full bg-[#28C840]" />
        </div>
        <div className="hidden items-center gap-2 rounded-full border border-[#D9EEF2] bg-[#EDF2F2] px-3 py-1 text-xs font-semibold text-[#475569] sm:flex">
          <LockKeyhole className="h-3.5 w-3.5 text-[#1A73E8]" />
          Secure adaptive exam
        </div>
      </div>

      <div className="grid gap-0 lg:grid-cols-[0.82fr_1.18fr]">
        <aside className="border-b border-[#E2E8F0] bg-[#F8FAFB] p-5 lg:border-b-0 lg:border-r">
          <div className="mb-6 flex items-center gap-3">
            <Image
              src="/akurat-logo.svg"
              alt="AKURAT"
              width={118}
              height={30}
              className="h-8 w-auto"
            />
          </div>

          <div className="space-y-3">
            {[
              { icon: BookOpenCheck, label: 'Materi Stoikiometri', active: false },
              { icon: BrainCircuit, label: 'MSAT Adaptif', active: true },
              { icon: BarChart3, label: 'Laporan Kompetensi', active: false },
              { icon: MessageSquareText, label: 'Ruang Mentor', active: false },
            ].map((item) => {
              const Icon = item.icon
              return (
                <div
                  key={item.label}
                  className={`flex items-center gap-3 rounded-2xl px-3 py-3 text-sm font-semibold ${
                    item.active
                      ? 'bg-[#1A73E8] text-white shadow-lg shadow-[#1A73E8]/20'
                      : 'bg-white text-[#475569]'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  {item.label}
                </div>
              )
            })}
          </div>
        </aside>

        <div className="p-5 sm:p-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#1A73E8]">
                Adaptive session
              </p>
              <h3 className="mt-2 text-xl font-extrabold text-[#0F172A] sm:text-2xl">
                Ujian Stoikiometri: Router Stage
              </h3>
              <p className="mt-1 max-w-xl text-sm leading-relaxed text-[#64748B]">
                Sistem menilai jawaban, keyakinan, dan parameter IRT untuk memilih modul berikutnya.
              </p>
            </div>
            <div className="inline-flex w-fit items-center gap-2 rounded-2xl bg-[#FFF3DF] px-3 py-2 text-sm font-bold text-[#B86200]">
              <Timer className="h-4 w-4" />
              18:42
            </div>
          </div>

          <div className="mt-6 rounded-[26px] border border-[#D9EEF2] bg-[#F8FEFF] p-4 sm:p-5">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-sm font-bold text-[#0F172A]">Jalur belajar saat ini</p>
                <p className="text-xs text-[#64748B]">Berdasarkan 12 respons terakhir</p>
              </div>
              <div className="flex items-center gap-1.5 rounded-full bg-white px-3 py-1 text-xs font-bold text-[#00A9D6]">
                <Sparkles className="h-3.5 w-3.5" />
                Live
              </div>
            </div>

            <div className="mt-5 grid gap-3 sm:grid-cols-4">
              {pathNodes.map((node) => (
                <div
                  key={node.label}
                  className={`relative rounded-2xl border p-3 ${
                    node.state === 'done'
                      ? 'border-[#BDEDD0] bg-[#F0FFF6]'
                      : node.state === 'active'
                        ? 'border-[#9FE8FF] bg-white shadow-lg shadow-[#00C2FF]/10'
                        : 'border-[#E2E8F0] bg-white'
                  }`}
                >
                  <div
                    className={`mb-4 h-2 rounded-full ${
                      node.state === 'done'
                        ? 'bg-[#00B84D]'
                        : node.state === 'active'
                          ? 'bg-[#00C2FF]'
                          : 'bg-[#CBD5E1]'
                    }`}
                  />
                  <p className="text-xs font-bold text-[#0F172A]">{node.label}</p>
                  <p className="mt-1 text-[11px] text-[#64748B]">
                    {node.state === 'done'
                      ? 'Kuat'
                      : node.state === 'active'
                        ? 'Diuji'
                        : 'Berikutnya'}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-5 grid gap-4 md:grid-cols-3">
            {[
              { label: 'Estimasi theta', value: '0.42', icon: Gauge },
              { label: 'Standard error', value: '0.18', icon: Target },
              { label: 'Confidence', value: 'Yakin', icon: BadgeCheck },
            ].map((item) => {
              const Icon = item.icon
              return (
                <div key={item.label} className="rounded-2xl border border-[#E2E8F0] bg-white p-4">
                  <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-xl bg-[#EDF2F2]">
                    <Icon className="h-4 w-4 text-[#1A73E8]" />
                  </div>
                  <p className="text-xs text-[#64748B]">{item.label}</p>
                  <p className="mt-1 text-xl font-extrabold text-[#0F172A]">{item.value}</p>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export function HeroSection() {
  return (
    <section id="hero" className="relative overflow-hidden bg-white pt-20">
      <LearningConstellation />

      <div className="relative z-10 mx-auto flex min-h-[calc(100vh-80px)] w-full max-w-7xl flex-col justify-center px-4 pb-12 pt-12 sm:px-6 lg:px-8 lg:pb-16">
        <div className="mx-auto max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55 }}
            className="inline-flex items-center gap-2 rounded-full border border-[#BFEFFF] bg-white/80 px-4 py-2 text-sm font-bold text-[#1A73E8] shadow-sm backdrop-blur"
          >
            <span className="flex h-2.5 w-2.5 rounded-full bg-[#00B84D]" />
            Platform asesmen kimia adaptif untuk pembelajaran presisi
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
            className="mt-7 text-balance text-5xl font-black leading-[1.02] tracking-normal text-[#0F172A] sm:text-6xl lg:text-7xl"
          >
            Ukur pemahaman kimia,
            <span className="block text-[#1A73E8]">bukan sekadar nilai.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.18 }}
            className="mx-auto mt-6 max-w-2xl text-pretty text-base leading-8 text-[#475569] sm:text-lg"
          >
            AKURAT membantu siswa belajar stoikiometri lewat materi terstruktur, quiz adaptif,
            ujian MSAT, dan laporan miskonsepsi yang bisa langsung ditindaklanjuti guru.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.26 }}
            className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row"
          >
            <Link
              href="/register"
              className="group inline-flex h-14 items-center justify-center gap-2 rounded-2xl bg-[#1A73E8] px-7 text-base font-extrabold text-white shadow-[0_18px_36px_-18px_rgba(26,115,232,0.95)] transition hover:-translate-y-0.5 hover:bg-[#155FC3]"
            >
              Mulai gratis
              <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              href="/dashboard/courses"
              className="inline-flex h-14 items-center justify-center gap-2 rounded-2xl border-2 border-[#D9EEF2] bg-white/85 px-7 text-base font-extrabold text-[#0F172A] shadow-sm backdrop-blur transition hover:-translate-y-0.5 hover:border-[#00C2FF]"
            >
              <Play className="h-4 w-4 fill-[#FF9500] text-[#FF9500]" />
              Lihat materi
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.34 }}
            className="mx-auto mt-9 grid max-w-3xl gap-3 sm:grid-cols-3"
          >
            {metrics.map((metric) => (
              <div
                key={metric.label}
                className="rounded-2xl border border-white/80 bg-white/75 px-4 py-3 text-center shadow-sm backdrop-blur"
              >
                <p className="text-2xl font-black text-[#0F172A]">{metric.value}</p>
                <p className="mt-1 text-xs font-bold text-[#1A73E8]">{metric.label}</p>
                <p className="mt-1 text-[11px] leading-4 text-[#64748B]">{metric.helper}</p>
              </div>
            ))}
          </motion.div>
        </div>

        <ProductPreview />
      </div>
    </section>
  )
}
