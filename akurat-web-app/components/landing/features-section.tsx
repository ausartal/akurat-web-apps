'use client'

import { motion } from 'framer-motion'
import {
  BarChart3,
  BookMarked,
  BrainCircuit,
  ClipboardCheck,
  MessageCircle,
  ShieldCheck,
} from 'lucide-react'

const features = [
  {
    icon: BrainCircuit,
    title: 'Ujian MSAT adaptif',
    description:
      'Empat tahap asesmen menyesuaikan tingkat kesulitan soal berdasarkan respons, keyakinan, dan estimasi kemampuan.',
    accent: '#1A73E8',
    surface: '#EAF3FF',
  },
  {
    icon: ClipboardCheck,
    title: 'Deteksi miskonsepsi',
    description:
      'Laporan tidak berhenti pada skor, tetapi memetakan pola salah paham seperti koefisien, unit, STP, dan pereaksi pembatas.',
    accent: '#00A9D6',
    surface: '#E8FAFF',
  },
  {
    icon: BookMarked,
    title: 'Materi stoikiometri',
    description:
      'Konten disusun per bab, sub-bab, dan prerequisite agar siswa membangun konsep sebelum masuk latihan kompleks.',
    accent: '#FF9500',
    surface: '#FFF3DF',
  },
  {
    icon: BarChart3,
    title: 'Analytics guru',
    description:
      'Guru dapat melihat progress, distribusi kompetensi, dan rekomendasi remedial berdasarkan data kelas.',
    accent: '#00B84D',
    surface: '#EFFFF5',
  },
  {
    icon: MessageCircle,
    title: 'Ruang komunikasi',
    description:
      'Siswa dan mentor dapat berdiskusi, menindaklanjuti hasil ujian, dan menyimpan konteks belajar di satu tempat.',
    accent: '#1A73E8',
    surface: '#EAF3FF',
  },
  {
    icon: ShieldCheck,
    title: 'Akses eksklusif',
    description:
      'Didesain untuk akses terverifikasi, ujian resmi, trial, premium, dan kebutuhan riset akademik yang privacy-aware.',
    accent: '#FF9500',
    surface: '#FFF3DF',
  },
]

export function FeaturesSection() {
  return (
    <section id="features" className="bg-[#F8FAFB] py-24">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-14 grid gap-5 md:grid-cols-[1fr_1fr] md:items-end"
        >
          <div>
            <span className="mb-4 inline-block rounded-full bg-white px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-[#1A73E8]">
              Feature set
            </span>
            <h2 className="max-w-lg text-3xl font-extrabold leading-tight text-[#0F172A] sm:text-4xl">
              Platform belajar kimia yang siap menjadi produk serius.
            </h2>
          </div>
          <p className="max-w-lg text-sm leading-relaxed text-[#64748B] sm:text-base">
            AKURAT menggabungkan pengalaman belajar yang ramah siswa dengan analitik yang cukup kuat
            untuk guru, admin, dan kebutuhan penelitian pendidikan.
          </p>
        </motion.div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <motion.article
                key={feature.title}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: index * 0.04 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
                className="rounded-[28px] border border-[#E2E8F0] bg-white p-6 shadow-sm transition-all hover:shadow-[0_24px_60px_-42px_rgba(15,23,42,0.55)]"
              >
                <div
                  className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl"
                  style={{ backgroundColor: feature.surface, color: feature.accent }}
                >
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="mb-2 text-lg font-bold text-[#0F172A]">{feature.title}</h3>
                <p className="text-sm leading-relaxed text-[#64748B]">{feature.description}</p>
              </motion.article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
