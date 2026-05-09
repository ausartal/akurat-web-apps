'use client'

import { motion } from 'framer-motion'
import { PlayCircle, Award, Users } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export function HeroSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.2 },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.65 } },
  }

  return (
    <section className="min-h-[calc(100vh-72px)] bg-[#F3F4F6] flex items-center overflow-hidden">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-16 lg:py-0">
        <div className="grid items-center gap-12 lg:grid-cols-2">

          {/* Left: Text content */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-8"
          >
            <motion.div variants={itemVariants}>
              <h1 className="font-extrabold leading-[1.08] tracking-tight text-[#0F172A]">
                <span className="block text-5xl sm:text-6xl lg:text-7xl">
                  MEASURE{' '}
                  <span className="text-[#4F46E5]">PRECISELY</span>
                </span>
                <span className="block text-5xl sm:text-6xl lg:text-7xl mt-1">
                  LEARN{' '}
                  <span className="text-[#4F46E5]">ACCURATELY</span>
                </span>
              </h1>
            </motion.div>

            <motion.p
              variants={itemVariants}
              className="max-w-md text-base leading-relaxed text-[#6B7280] sm:text-lg"
            >
              Go Beyond Scores. Diagnose chemistry understanding and misconceptions
              with precision through an integrated adaptive platform.
            </motion.p>

            <motion.div variants={itemVariants} className="flex flex-wrap gap-4">
              <Link href="/register">
                <Button
                  size="lg"
                  className="h-13 rounded-xl bg-[#4F46E5] px-8 text-base font-semibold text-white shadow-lg shadow-[#4F46E5]/30 hover:bg-[#4338CA] hover:-translate-y-0.5 transition-all duration-200"
                  style={{ height: '52px' }}
                >
                  Start Learning
                </Button>
              </Link>
              <Link href="/login">
                <Button
                  size="lg"
                  className="h-13 rounded-xl bg-[#FACC15] px-8 text-base font-semibold text-[#0F172A] shadow-lg shadow-[#FACC15]/30 hover:bg-[#EAB308] hover:-translate-y-0.5 transition-all duration-200"
                  style={{ height: '52px' }}
                >
                  Start Teaching
                </Button>
              </Link>
            </motion.div>

            {/* Dots indicator */}
            <motion.div variants={itemVariants} className="flex items-center gap-2">
              <span className="h-1.5 w-8 rounded-full bg-[#4F46E5]" />
              <span className="h-1.5 w-3 rounded-full bg-[#CBD5E1]" />
              <span className="h-1.5 w-3 rounded-full bg-[#CBD5E1]" />
            </motion.div>
          </motion.div>

          {/* Right: Floating visual */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative hidden lg:flex items-center justify-center"
            style={{ height: '560px' }}
          >
            {/* Yellow circle background */}
            <div className="absolute top-8 right-4 h-72 w-72 rounded-full bg-[#FACC15]" />

            {/* Purple circle background */}
            <div className="absolute bottom-8 right-32 h-52 w-52 rounded-full bg-[#4F46E5]" />

            {/* Main student photo circle (top-right) */}
            <motion.div
              animate={{ y: [-8, 8, -8] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute top-12 right-8 h-48 w-48 rounded-full overflow-hidden border-4 border-white shadow-2xl z-10"
              style={{
                background: 'linear-gradient(135deg, #E0E7FF 0%, #C7D2FE 100%)',
              }}
            >
              {/* Placeholder avatar */}
              <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#6366F1] to-[#4F46E5]">
                <svg viewBox="0 0 100 100" className="w-28 h-28 text-white opacity-80" fill="currentColor">
                  <circle cx="50" cy="35" r="22" />
                  <ellipse cx="50" cy="85" rx="35" ry="25" />
                </svg>
              </div>
            </motion.div>

            {/* Second student circle (bottom-left) */}
            <motion.div
              animate={{ y: [8, -8, 8] }}
              transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
              className="absolute bottom-16 left-16 h-44 w-44 rounded-full overflow-hidden border-4 border-white shadow-2xl z-10"
              style={{
                background: 'linear-gradient(135deg, #DDD6FE 0%, #C4B5FD 100%)',
              }}
            >
              <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#8B5CF6] to-[#7C3AED]">
                <svg viewBox="0 0 100 100" className="w-24 h-24 text-white opacity-80" fill="currentColor">
                  <circle cx="50" cy="35" r="22" />
                  <ellipse cx="50" cy="85" rx="35" ry="25" />
                </svg>
              </div>
            </motion.div>

            {/* Live Class badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.7, duration: 0.4 }}
              className="absolute top-6 left-8 z-20 flex items-center gap-2.5 rounded-2xl bg-white px-4 py-3 shadow-xl border border-[#F1F5F9]"
            >
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#FACC15]">
                <PlayCircle className="h-5 w-5 text-[#0F172A]" />
              </div>
              <div>
                <p className="text-[11px] text-[#94A3B8] font-medium">Live</p>
                <p className="text-sm font-bold text-[#0F172A]">Class</p>
              </div>
            </motion.div>

            {/* Learning Resources badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.9, duration: 0.4 }}
              className="absolute top-36 left-2 z-20 flex items-center gap-2.5 rounded-2xl bg-white px-4 py-3 shadow-xl border border-[#F1F5F9]"
            >
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#EF4444]">
                <Award className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="text-sm font-bold text-[#0F172A]">203+</p>
                <p className="text-[11px] text-[#94A3B8] font-medium">Learning Resources</p>
              </div>
            </motion.div>

            {/* Online Students badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.1, duration: 0.4 }}
              className="absolute bottom-12 right-4 z-20 flex items-center gap-2.5 rounded-2xl bg-white px-4 py-3 shadow-xl border border-[#F1F5F9]"
            >
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#FACC15]">
                <Users className="h-5 w-5 text-[#0F172A]" />
              </div>
              <div>
                <p className="text-sm font-bold text-[#0F172A]">98</p>
                <p className="text-[11px] text-[#94A3B8] font-medium">Online Student</p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
