'use client'

import { motion } from 'framer-motion'
import {
  Atom,
  Calculator,
  FlaskConical,
  Gauge,
  Link as LinkIcon,
  Percent,
  Scale,
  Sigma,
} from 'lucide-react'

const materials = [
  {
    title: 'Konsep mol',
    icon: Atom,
    description: 'Partikel, mol, bilangan Avogadro, dan hubungan dengan jumlah zat.',
  },
  {
    title: 'Massa molar',
    icon: Calculator,
    description: 'Konversi gram-mol, massa atom relatif, dan perhitungan dasar.',
  },
  {
    title: 'Persamaan reaksi',
    icon: LinkIcon,
    description: 'Koefisien, penyetaraan, dan rasio stoikiometri dari reaksi kimia.',
  },
  {
    title: 'Pereaksi pembatas',
    icon: Scale,
    description: 'Identifikasi reaktan limit, hasil teoritis, dan persen hasil.',
  },
  {
    title: 'Gas dan STP',
    icon: Gauge,
    description: 'Hubungan mol-volume, kondisi STP, dan variasi standar molar gas.',
  },
  {
    title: 'Konsentrasi larutan',
    icon: FlaskConical,
    description: 'Molaritas, molalitas, pengenceran, dan komposisi persen.',
  },
  {
    title: 'Rumus empiris',
    icon: Sigma,
    description: 'Menentukan rumus empiris dan molekul dari data komposisi.',
  },
  {
    title: 'Persentase komposisi',
    icon: Percent,
    description: 'Perhitungan komposisi massa dan interpretasi data percobaan.',
  },
]

export function LearningMaterialsSection() {
  return (
    <section id="materials" className="bg-white py-24">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-14 text-center"
        >
          <span className="mb-4 inline-block rounded-full bg-[#EDF2F2] px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-[#1A73E8]">
            Learning path
          </span>
          <h2 className="text-3xl font-extrabold text-[#0F172A] sm:text-4xl">
            Fokus stoikiometri, lengkap dari dasar sampai aplikasi.
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-[#64748B] sm:text-base">
            Setiap topik bisa dihubungkan dengan quiz, exam module, dan laporan miskonsepsi agar
            pembelajaran tidak terputus dari asesmen.
          </p>
        </motion.div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {materials.map((material, index) => {
            const Icon = material.icon
            return (
              <motion.article
                key={material.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: index * 0.03 }}
                viewport={{ once: true }}
                whileHover={{ y: -4 }}
                className="rounded-[24px] border border-[#E2E8F0] bg-[#F8FAFB] p-5 transition-all hover:border-[#BFEFFF] hover:bg-white hover:shadow-[0_20px_54px_-42px_rgba(15,23,42,0.55)]"
              >
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-2xl bg-white text-[#1A73E8] shadow-sm">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="mb-2 text-base font-bold text-[#0F172A]">{material.title}</h3>
                <p className="text-sm leading-relaxed text-[#64748B]">{material.description}</p>
              </motion.article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
