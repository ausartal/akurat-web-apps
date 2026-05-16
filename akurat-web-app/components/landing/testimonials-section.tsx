'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, Star } from 'lucide-react'

const testimonials = [
  {
    name: 'Nadia',
    role: 'Siswa SMA',
    content:
      'Aku jadi tahu bagian mana yang sebenarnya belum paham. Bukan cuma dapat skor, tapi ada arah belajar setelah ujian.',
    rating: 5,
    avatar: 'N',
  },
  {
    name: 'Pak Arif',
    role: 'Guru Kimia',
    content:
      'Data miskonsepsi per topik membantu saya menentukan remedial. Kelas jadi lebih berbasis bukti, bukan tebak-tebakan.',
    rating: 5,
    avatar: 'A',
  },
  {
    name: 'Citra',
    role: 'Peserta Olimpiade',
    content:
      'Latihannya terasa bertahap. Ketika salah di pereaksi pembatas, rekomendasinya langsung mengarah ke konsep yang perlu diulang.',
    rating: 5,
    avatar: 'C',
  },
  {
    name: 'Dr. Hana',
    role: 'Peneliti Pendidikan',
    content:
      'Konsep MSAT dan profil miskonsepsi membuat platform ini potensial untuk pilot asesmen dan penelitian pembelajaran kimia.',
    rating: 5,
    avatar: 'H',
  },
]

export function TestimonialsSection() {
  return (
    <section id="testimonials" className="bg-white py-24">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-5"
          >
            <span className="inline-block rounded-full bg-[#EAF3FF] px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-[#1A73E8]">
              Social proof
            </span>
            <h2 className="text-3xl font-extrabold leading-tight text-[#0F172A] sm:text-4xl">
              Belajar terasa ramah, hasilnya tetap presisi.
            </h2>
            <p className="max-w-sm text-sm leading-relaxed text-[#64748B] sm:text-base">
              Tone AKURAT dibuat tidak mengintimidasi siswa, tetapi tetap membawa standar asesmen
              yang cocok untuk guru dan institusi.
            </p>
            <Link
              href="/register"
              className="inline-flex items-center gap-2 rounded-2xl bg-[#1A73E8] px-7 py-3.5 text-sm font-bold text-white shadow-lg shadow-[#1A73E8]/20 transition hover:-translate-y-0.5 hover:bg-[#155FC3]"
            >
              Gabung sekarang
              <ArrowRight className="h-4 w-4" />
            </Link>
          </motion.div>

          <div className="grid gap-4 sm:grid-cols-2">
            {testimonials.map((testimonial, index) => (
              <motion.article
                key={testimonial.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.06 }}
                viewport={{ once: true }}
                whileHover={{ y: -4 }}
                className="rounded-[24px] border border-[#E2E8F0] bg-[#F8FAFB] p-5 transition-all hover:bg-white hover:shadow-[0_20px_54px_-42px_rgba(15,23,42,0.55)]"
              >
                <div className="mb-3 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#1A73E8] text-xs font-bold text-white">
                      {testimonial.avatar}
                    </div>
                    <div>
                      <p className="text-sm font-bold text-[#0F172A]">{testimonial.name}</p>
                      <p className="text-xs text-[#64748B]">{testimonial.role}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-0.5">
                    {Array.from({ length: testimonial.rating }).map((_, starIndex) => (
                      <Star key={starIndex} className="h-3.5 w-3.5 fill-[#FF9500] text-[#FF9500]" />
                    ))}
                  </div>
                </div>
                <p className="text-sm leading-relaxed text-[#334155]">&quot;{testimonial.content}&quot;</p>
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
