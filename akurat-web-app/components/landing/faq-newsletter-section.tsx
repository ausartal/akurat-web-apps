'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, Mail, Send } from 'lucide-react'
import { Button } from '@/components/ui/button'

const faqs = [
  {
    question: 'Which class is right for me?',
    answer:
      'Start with Regular Class for fundamentals, choose Intensive Preparation for exams, and Olympiad Class for advanced competition training.',
  },
  {
    question: 'How do I register to take classes?',
    answer:
      'Click Sign Up, complete your profile, pick a class, and you can start learning immediately from your dashboard.',
  },
  {
    question: 'Is there a free class to take first?',
    answer:
      'AKURAT provides selected trial materials so you can evaluate lesson quality before choosing a paid class.',
  },
  {
    question: 'What kind of material is taught in class?',
    answer:
      'You will learn theory explanations, guided examples, chapter quizzes, and exam-style chemistry problem solving.',
  },
  {
    question: 'Are the instructors experienced?',
    answer:
      'Yes, classes are taught by experienced mentors with strong academic and competition coaching backgrounds.',
  },
]

export function FaqNewsletterSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      setSubscribed(true)
      setEmail('')
      setTimeout(() => setSubscribed(false), 3000)
    }
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
      hidden: { opacity: 0, y: 20 },
      visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.6 },
      },
  }

  return (
    <section id="faq" className="bg-[#F8FAFC] py-20">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-6 rounded-3xl border border-[#E2E8F0] bg-white p-7 shadow-sm"
          >
            <div>
              <h2 className="text-3xl font-extrabold leading-tight text-[#0F172A] sm:text-4xl">
                Don&apos;t miss any information from us!
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-[#64748B] sm:text-base">
                Sign up for our newsletter for chemistry updates, useful study tips, and class announcements.
              </p>
            </div>

            <form onSubmit={handleSubscribe} className="space-y-4">
              <label className="relative block">
                <input
                  type="email"
                  placeholder="Write your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="h-12 w-full rounded-xl border border-[#CBD5E1] px-4 pr-12 text-sm text-[#0F172A] outline-none transition-all placeholder:text-[#94A3B8] focus:border-[#4F46E5] focus:ring-2 focus:ring-[#C7D2FE]"
                />
                <Mail className="pointer-events-none absolute right-4 top-3.5 h-5 w-5 text-[#94A3B8]" />
              </label>

              <Button
                type="submit"
                className="h-11 rounded-xl bg-[#4F46E5] px-5 text-white hover:bg-[#4338CA]"
              >
                <Send className="mr-2 h-4 w-4" />
                Subscribe
              </Button>

              {subscribed && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="rounded-xl border border-emerald-200 bg-emerald-50 p-3 text-sm font-medium text-emerald-700"
                >
                  Thanks for subscribing! Check your inbox for AKURAT updates.
                </motion.div>
              )}
            </form>

            <div className="space-y-2 pt-1">
              <div className="flex items-center gap-2 text-sm text-[#64748B]">
                <span className="h-1.5 w-1.5 rounded-full bg-[#2563EB]" /> Weekly chemistry insights
              </div>
              <div className="flex items-center gap-2 text-sm text-[#64748B]">
                <span className="h-1.5 w-1.5 rounded-full bg-[#4F46E5]" /> New class and feature announcements
              </div>
              <div className="flex items-center gap-2 text-sm text-[#64748B]">
                <span className="h-1.5 w-1.5 rounded-full bg-[#FACC15]" /> Practical exam preparation tips
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <h2 className="mb-5 text-3xl font-extrabold leading-tight text-[#0F172A] sm:text-4xl">
              About Learning Chemistry with Us!
            </h2>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="space-y-3"
            >
              {faqs.map((faq, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="overflow-hidden rounded-xl border border-[#E2E8F0] bg-white transition-colors hover:border-[#BFDBFE]"
                >
                  <button
                    onClick={() =>
                      setOpenIndex(openIndex === index ? null : index)
                    }
                    className="flex w-full items-center justify-between px-5 py-4 text-left hover:bg-[#F8FAFC]"
                    aria-expanded={openIndex === index}
                  >
                    <span className="pr-3 text-sm font-semibold text-[#1E293B] sm:text-base">
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
                        transition={{ duration: 0.3 }}
                        className="border-t border-[#E2E8F0] bg-[#F8FAFC]"
                      >
                        <p className="px-5 py-4 text-sm leading-relaxed text-[#475569] sm:text-base">
                          {faq.answer}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

