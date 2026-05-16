'use client'

import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronDown, Mail, Send } from 'lucide-react'
import { Button } from '@/components/ui/button'

const faqs = [
  {
    question: 'Apakah AKURAT hanya untuk stoikiometri?',
    answer:
      'MVP difokuskan pada stoikiometri agar asesmen, miskonsepsi, dan adaptive testing bisa dikalibrasi dengan baik. Struktur teknisnya tetap siap diperluas ke topik kimia lain.',
  },
  {
    question: 'Apa beda quiz biasa dan ujian MSAT?',
    answer:
      'Quiz biasa memberi feedback untuk latihan. Ujian MSAT tidak memberi pembahasan selama tes dan menggunakan branching adaptif untuk estimasi kemampuan yang lebih presisi.',
  },
  {
    question: 'Apakah guru bisa melihat hasil siswa?',
    answer:
      'Ya. Teacher dashboard dirancang untuk melihat progress, hasil ujian, distribusi kompetensi, dan pola miskonsepsi siswa atau kelas.',
  },
  {
    question: 'Bagaimana akses asosiasi atau institusi diatur?',
    answer:
      'AKURAT mendukung access code, role-based access, subscription plan, dan admin workflow untuk verifikasi pengguna serta approval konten.',
  },
  {
    question: 'Apakah data bisa dipakai untuk riset?',
    answer:
      'Roadmap mencakup ekspor data riset yang privacy-aware, audit log, dan agregasi insight tanpa membuka data pribadi yang tidak diperlukan.',
  },
]

export function FaqNewsletterSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  const handleSubscribe = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!email) return
    setSubscribed(true)
    setEmail('')
    window.setTimeout(() => setSubscribed(false), 3000)
  }

  return (
    <section id="faq" className="bg-[#F8FAFB] py-24">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[0.92fr_1.08fr]">
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="rounded-[30px] border border-[#D9EEF2] bg-white p-7 shadow-sm"
          >
            <span className="mb-4 inline-block rounded-full bg-[#EAF3FF] px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-[#1A73E8]">
              Update produk
            </span>
            <h2 className="text-3xl font-extrabold leading-tight text-[#0F172A] sm:text-4xl">
              Dapatkan kabar pengembangan AKURAT.
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-[#64748B] sm:text-base">
              Masukkan email untuk menerima update pilot, fitur baru, dan insight pembelajaran kimia.
            </p>

            <form onSubmit={handleSubscribe} className="mt-6 space-y-4">
              <label className="relative block">
                <span className="sr-only">Alamat email</span>
                <input
                  type="email"
                  placeholder="email@sekolah.ac.id"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  required
                  className="h-12 w-full rounded-xl border border-[#CBD5E1] px-4 pr-12 text-sm text-[#0F172A] outline-none transition-all placeholder:text-[#94A3B8] focus:border-[#1A73E8] focus:ring-2 focus:ring-[#BFEFFF]"
                />
                <Mail className="pointer-events-none absolute right-4 top-3.5 h-5 w-5 text-[#94A3B8]" />
              </label>

              <Button type="submit" className="h-11 rounded-xl bg-[#1A73E8] px-5 font-bold text-white hover:bg-[#155FC3]">
                <Send className="mr-2 h-4 w-4" />
                Subscribe
              </Button>

              {subscribed && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="rounded-xl border border-emerald-200 bg-emerald-50 p-3 text-sm font-medium text-emerald-700"
                >
                  Terima kasih. Emailmu sudah tercatat untuk update AKURAT.
                </motion.div>
              )}
            </form>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="mb-5 text-3xl font-extrabold leading-tight text-[#0F172A] sm:text-4xl">
              Pertanyaan yang paling sering muncul.
            </h2>

            <div className="space-y-3">
              {faqs.map((faq, index) => (
                <div
                  key={faq.question}
                  className="overflow-hidden rounded-2xl border border-[#E2E8F0] bg-white transition-colors hover:border-[#BFEFFF]"
                >
                  <button
                    onClick={() => setOpenIndex(openIndex === index ? null : index)}
                    className="flex w-full items-center justify-between px-5 py-4 text-left hover:bg-[#F8FEFF]"
                    aria-expanded={openIndex === index}
                  >
                    <span className="pr-3 text-sm font-bold text-[#1E293B] sm:text-base">
                      {faq.question}
                    </span>
                    <ChevronDown
                      className={`h-5 w-5 shrink-0 text-[#64748B] transition-transform ${
                        openIndex === index ? 'rotate-180' : ''
                      }`}
                    />
                  </button>

                  <AnimatePresence>
                    {openIndex === index && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.25 }}
                        className="border-t border-[#E2E8F0] bg-[#F8FAFB]"
                      >
                        <p className="px-5 py-4 text-sm leading-relaxed text-[#475569] sm:text-base">
                          {faq.answer}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
