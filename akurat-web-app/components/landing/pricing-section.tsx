'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { CheckCircle2, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'

const pricingPlans = [
  {
    name: 'Trial',
    price: 'Gratis',
    period: 'akses awal',
    description: 'Untuk mencoba materi dan format latihan.',
    features: [
      'Materi stoikiometri pilihan',
      'Quiz dasar dengan feedback',
      'Dashboard progress sederhana',
      'Akses ujian coba terbatas',
      'Cocok untuk eksplorasi awal',
    ],
    highlighted: false,
  },
  {
    name: 'Student Premium',
    price: 'Rp99k',
    period: '/ bulan',
    description: 'Untuk belajar serius dan persiapan ujian.',
    features: [
      'Seluruh materi stoikiometri',
      'Quiz adaptif dan latihan HOTS',
      'Ujian MSAT trial dan resmi',
      'Laporan kompetensi dan miskonsepsi',
      'Ruang komunikasi mentor',
      'Kalkulator kimia terintegrasi',
    ],
    highlighted: true,
    badge: 'Paling sesuai MVP',
  },
  {
    name: 'Institution',
    price: 'Custom',
    period: 'sekolah/asosiasi',
    description: 'Untuk kelas, guru, admin, dan riset.',
    features: [
      'Manajemen kelas dan user',
      'Teacher analytics dashboard',
      'Content approval workflow',
      'Access code dan subscription',
      'Research data export',
      'Support pilot implementation',
    ],
    highlighted: false,
  },
]

export function PricingSection() {
  return (
    <section id="pricing" className="bg-[#F8FAFB] py-24">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-14 text-center"
        >
          <span className="mb-4 inline-block rounded-full bg-white px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-[#1A73E8]">
            Access plan
          </span>
          <h2 className="text-3xl font-extrabold text-[#0F172A] sm:text-4xl">
            Jalur akses yang jelas untuk trial, premium, dan institusi.
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-[#64748B] sm:text-base">
            Struktur paket bisa disesuaikan nanti dengan model bisnis final, tetapi UI sudah siap
            menjelaskan value utama AKURAT.
          </p>
        </motion.div>

        <div className="grid items-stretch gap-6 lg:grid-cols-3">
          {pricingPlans.map((plan, index) => (
            <motion.article
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              viewport={{ once: true }}
              whileHover={{ y: -7 }}
              className={`relative overflow-hidden rounded-[30px] border p-6 transition-all duration-300 sm:p-7 ${
                plan.highlighted
                  ? 'border-[#1A73E8] bg-white shadow-[0_28px_80px_-48px_rgba(26,115,232,0.72)] lg:scale-[1.02]'
                  : 'border-[#E2E8F0] bg-white shadow-sm'
              }`}
            >
              {plan.badge && (
                <div className="absolute right-4 top-4 z-10">
                  <div className="flex items-center gap-1 rounded-full bg-[#FF9500] px-3 py-1 text-xs font-bold text-white">
                    <Sparkles className="h-3 w-3" />
                    {plan.badge}
                  </div>
                </div>
              )}

              <div className="flex h-full flex-col">
                <h3 className="pr-28 text-xl font-extrabold text-[#0F172A]">{plan.name}</h3>
                <p className="mt-1 text-sm leading-relaxed text-[#64748B]">{plan.description}</p>

                <div className="mt-6 flex items-end gap-2">
                  <span className="text-4xl font-black text-[#0F172A]">{plan.price}</span>
                  <span className="pb-1 text-sm font-semibold text-[#64748B]">{plan.period}</span>
                </div>

                <div className="mt-6 flex-1 space-y-3">
                  {plan.features.map((feature) => (
                    <div key={feature} className="flex items-start gap-2.5">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#00B84D]" />
                      <span className="text-sm text-[#334155]">{feature}</span>
                    </div>
                  ))}
                </div>

                <Link href="/register" className="mt-7 w-full">
                  <Button
                    className={`h-11 w-full rounded-xl font-bold transition-all ${
                      plan.highlighted
                        ? 'bg-[#1A73E8] text-white hover:bg-[#155FC3]'
                        : 'bg-[#0F172A] text-white hover:bg-[#1E293B]'
                    }`}
                    size="lg"
                  >
                    Pilih Paket
                  </Button>
                </Link>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
