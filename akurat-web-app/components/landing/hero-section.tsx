'use client'

import { motion } from 'framer-motion'
import { ArrowRight, Atom, Award, PlayCircle, Users } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export function HeroSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7 },
    },
  }

  const floatingVariants = {
    initial: { y: 0 },
    animate: {
      y: [-10, 10, -10],
      transition: { duration: 5.5, repeat: Infinity },
    },
  }

  return (
    <section className="bg-[#F8FAFC] pb-20 pt-8 sm:pt-10">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="overflow-hidden rounded-[32px] border border-[#E2E8F0] bg-white/80 p-6 shadow-[0_20px_70px_-32px_rgba(37,99,235,0.45)] md:p-10 lg:p-12">
          <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-8">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-7"
          >
            <motion.div variants={itemVariants} className="inline-flex items-center gap-2 rounded-full border border-[#DBEAFE] bg-[#EFF6FF] px-3 py-1.5 text-xs font-semibold text-[#2563EB]">
              <Atom className="h-4 w-4" />
              Modern Chemistry Learning Platform
            </motion.div>

            <motion.div variants={itemVariants} className="space-y-4">
              <h1 className="text-4xl font-extrabold leading-[1.05] text-[#0F172A] sm:text-5xl lg:text-[58px]">
                Master Chemistry{' '}
                <span className="bg-gradient-to-r from-[#2563EB] to-[#4F46E5] bg-clip-text text-transparent">
                  Easily &amp; Effectively
                </span>
              </h1>
              <p className="max-w-xl text-base leading-relaxed text-[#475569] sm:text-lg">
                AKURAT helps students master chemistry through structured learning paths,
                interactive materials, and adaptive practice systems.
              </p>
            </motion.div>

            <motion.div variants={itemVariants} className="flex flex-col gap-3 pt-1 sm:flex-row">
              <Link href="/register">
                <Button
                  size="lg"
                  className="h-12 rounded-xl bg-[#4F46E5] px-7 text-white shadow-lg shadow-[#4F46E5]/25 transition-all hover:-translate-y-0.5 hover:bg-[#4338CA]"
                >
                  Start Learning
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link href="#materials">
                <Button
                  size="lg"
                  variant="outline"
                  className="h-12 rounded-xl border-[#CBD5E1] bg-white px-7 text-[#0F172A] hover:bg-[#F8FAFC]"
                >
                  Explore Courses
                </Button>
              </Link>
            </motion.div>

            <motion.div variants={itemVariants} className="flex items-center gap-2 pt-5">
              <span className="h-1.5 w-10 rounded-full bg-[#2563EB]" />
              <span className="h-1.5 w-3 rounded-full bg-[#CBD5E1]" />
              <span className="h-1.5 w-3 rounded-full bg-[#CBD5E1]" />
            </motion.div>

            <motion.div variants={itemVariants} className="grid max-w-md grid-cols-3 gap-4 pt-2">
              <div>
                <p className="text-2xl font-bold text-[#0F172A]">200+</p>
                <p className="text-sm text-[#64748B]">Learning Resources</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-[#0F172A]">98%</p>
                <p className="text-sm text-[#64748B]">Completion</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-[#0F172A]">4.9</p>
                <p className="text-sm text-[#64748B]">Avg Rating</p>
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="relative hidden min-h-[480px] items-center justify-center lg:flex"
          >
            <motion.div
              variants={floatingVariants}
              initial="initial"
              animate="animate"
              className="absolute inset-0"
            >
              <div className="absolute inset-4 rounded-[28px] bg-gradient-to-br from-[#EEF2FF] via-[#F8FAFC] to-[#E2E8F0]" />

              <div className="absolute right-10 top-10 h-72 w-72 rounded-full bg-gradient-to-br from-[#FACC15] to-[#FDE68A]" />

              <div className="absolute bottom-8 left-3 h-56 w-56 rounded-full bg-gradient-to-br from-[#4F46E5] to-[#2563EB] shadow-2xl shadow-[#4F46E5]/40" />

              <div className="absolute left-16 top-14 rounded-2xl border border-white/70 bg-white px-4 py-2 shadow-xl">
                <div className="flex items-center gap-2 text-[#0F172A]">
                  <PlayCircle className="h-4 w-4 text-[#F59E0B]" />
                  <span className="text-xs font-semibold">Live Class</span>
                </div>
              </div>

              <div className="absolute left-6 top-32 rounded-2xl border border-white/70 bg-white px-4 py-3 shadow-xl">
                <div className="flex items-start gap-2">
                  <div className="rounded-full bg-[#EF4444] p-1.5 text-white">
                    <Award className="h-3.5 w-3.5" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-[#0F172A]">205+</p>
                    <p className="text-[11px] text-[#64748B]">Learning Resources</p>
                  </div>
                </div>
              </div>

              <div className="absolute bottom-16 right-8 rounded-2xl border border-white/70 bg-white px-4 py-3 shadow-xl">
                <div className="flex items-start gap-2">
                  <div className="rounded-full bg-[#FACC15] p-1.5 text-[#0F172A]">
                    <Users className="h-3.5 w-3.5" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-[#0F172A]">98</p>
                    <p className="text-[11px] text-[#64748B]">Online Students</p>
                  </div>
                </div>
              </div>

              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 16, repeat: Infinity, ease: 'linear' }}
                className="absolute right-20 top-24 flex h-14 w-14 items-center justify-center rounded-full border-2 border-dashed border-[#2563EB] bg-white text-[#2563EB]"
              >
                <Atom className="h-6 w-6" />
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
        </div>
      </div>
    </section>
  )
}
