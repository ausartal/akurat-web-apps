'use client'

import { motion } from 'framer-motion'
import { Trophy, GraduationCap, Medal, CheckCircle2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

const userTypes = [
  {
    icon: CheckCircle2,
    text: 'High school chemistry students',
  },
  {
    icon: CheckCircle2,
    text: 'Olympiad preparation',
  },
  {
    icon: CheckCircle2,
    text: 'University entrance preparation',
  },
  {
    icon: CheckCircle2,
    text: 'Chemistry competition training',
  },
  {
    icon: CheckCircle2,
    text: 'College chemistry support',
  },
]

export function TargetUsersSection() {
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

  return (
    <section id="about" className="bg-white py-20">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative hidden min-h-[410px] lg:block"
          >
            <div className="absolute inset-y-4 left-2 right-14 rounded-[34px] bg-gradient-to-br from-[#FACC15] via-[#FDE68A] to-[#F8FAFC]" />
            <div className="absolute bottom-0 left-0 right-24 top-16 rounded-[36px] bg-gradient-to-br from-[#4F46E5] to-[#2563EB] shadow-2xl shadow-[#2563EB]/35" />
            <motion.div
              animate={{ y: [-8, 8, -8] }}
              transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute left-6 top-8 rounded-2xl border border-white/70 bg-white px-4 py-3 shadow-xl"
            >
              <div className="flex items-center gap-2">
                <Trophy className="h-4 w-4 text-[#F59E0B]" />
                <p className="text-xs font-semibold text-[#0F172A]">Olympiad Ready</p>
              </div>
            </motion.div>

            <motion.div
              animate={{ y: [10, -10, 10] }}
              transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute bottom-6 right-4 rounded-2xl border border-white/70 bg-white px-4 py-3 shadow-xl"
            >
              <div className="flex items-center gap-2">
                <Medal className="h-4 w-4 text-[#4F46E5]" />
                <p className="text-xs font-semibold text-[#0F172A]">Top Progress</p>
              </div>
            </motion.div>

            <div className="absolute bottom-16 left-12 flex items-center gap-3 rounded-2xl border border-white/70 bg-white px-4 py-3 shadow-xl">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#EEF2FF]">
                <GraduationCap className="h-4 w-4 text-[#4F46E5]" />
              </div>
              <div>
                <p className="text-sm font-bold text-[#0F172A]">98+</p>
                <p className="text-[11px] text-[#64748B]">Online Students</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="space-y-7"
          >
            <div className="space-y-3">
              <h2 className="text-3xl font-extrabold leading-tight text-[#0F172A] sm:text-4xl">
                Who is <span className="text-[#4F46E5]">AKURAT</span> for?
              </h2>
              <p className="max-w-lg text-base text-[#64748B]">
                AKURAT is designed to help learners master chemistry with practical, exam-focused,
                and concept-first learning experiences.
              </p>
            </div>

            <motion.div variants={containerVariants} className="space-y-3.5">
              {userTypes.map((user, index) => {
                const Icon = user.icon

                return (
                  <motion.div
                    key={index}
                    variants={{
                      hidden: { opacity: 0, y: 10 },
                      visible: {
                        opacity: 1,
                        y: 0,
                        transition: { duration: 0.45 },
                      },
                    }}
                    className="flex items-center gap-3 rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] px-4 py-3"
                  >
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#FACC15]">
                      <Icon className="h-4 w-4 text-[#0F172A]" />
                    </div>
                    <p className="text-sm font-medium text-[#334155] sm:text-base">{user.text}</p>
                  </motion.div>
                )
              })}
            </motion.div>

            <div>
              <Link href="/register">
                <Button className="rounded-xl bg-[#4F46E5] px-6 text-white hover:bg-[#4338CA]">Join Now</Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
