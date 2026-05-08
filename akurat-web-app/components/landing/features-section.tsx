'use client'

import { motion } from 'framer-motion'
import {
  CircleHelp,
  FileBadge,
  MessageCircle,
  MonitorPlay,
  NotebookTabs,
  Brain,
} from 'lucide-react'

const features = [
  {
    icon: MonitorPlay,
    title: 'Video Tutorials',
    description: 'Watch structured chemistry lessons from fundamentals to advanced topics.',
    tone: 'blue',
  },
  {
    icon: MessageCircle,
    title: 'Discussion Forum',
    description: 'Join active topic discussions and ask experts when concepts feel difficult.',
    tone: 'indigo',
  },
  {
    icon: CircleHelp,
    title: 'Interactive Quiz',
    description: 'Practice with adaptive quizzes and instant feedback on every problem.',
    tone: 'blue',
  },
  {
    icon: NotebookTabs,
    title: 'Learning Materials',
    description: 'Access concise notes, visual summaries, and chapter-based resources.',
    tone: 'indigo',
  },
  {
    icon: FileBadge,
    title: 'Mentor Guidance',
    description: 'Get targeted feedback and personalized support from chemistry mentors.',
    tone: 'yellow',
  },
  {
    icon: Brain,
    title: 'Adaptive Learning',
    description: 'Smart recommendations help you improve weak areas faster and smarter.',
    tone: 'blue',
  },
]

const toneClasses: Record<string, { bg: string; icon: string }> = {
  blue: { bg: 'bg-[#EEF4FF]', icon: 'text-[#2563EB]' },
  indigo: { bg: 'bg-[#EEF2FF]', icon: 'text-[#4F46E5]' },
  yellow: { bg: 'bg-[#FEF9C3]', icon: 'text-[#CA8A04]' },
}

export function FeaturesSection() {
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
    <section id="features" className="bg-[#F8FAFC] py-20">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-14 grid gap-5 md:grid-cols-[1fr_1fr] md:items-end"
        >
          <h2 className="max-w-lg text-3xl font-extrabold leading-tight text-[#0F172A] sm:text-4xl">
            What do you get at <span className="text-[#4F46E5]">AKURAT</span>?
          </h2>
          <p className="max-w-lg text-sm leading-relaxed text-[#64748B] sm:text-base">
            AKURAT is an online learning platform designed to support chemistry learners with practical,
            structured, and outcome-focused tools.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {features.map((feature, index) => {
            const Icon = feature.icon
            const tone = toneClasses[feature.tone]

            return (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ y: -5 }}
                className="group rounded-3xl border border-[#E2E8F0] bg-white p-6 shadow-sm transition-all duration-300 hover:border-[#BFDBFE] hover:shadow-[0_18px_40px_-28px_rgba(37,99,235,0.55)]"
              >
                <div className={`mb-4 flex h-14 w-14 items-center justify-center rounded-2xl ${tone.bg} ${tone.icon} transition-transform group-hover:scale-105`}>
                  <Icon className="h-6 w-6" />
                </div>

                <h3 className="mb-2 text-lg font-semibold text-[#0F172A]">{feature.title}</h3>
                <p className="text-sm leading-relaxed text-[#64748B]">{feature.description}</p>

                {feature.title === 'Mentor Guidance' && (
                  <div className="mt-4 rounded-xl bg-[#FEFCE8] px-3 py-2 text-xs font-medium text-[#854D0E]">
                    Structured mentor sessions and progress-based feedback.
                  </div>
                )}
              </motion.div>
            )
          })}
        </motion.div>

        <div className="mt-10 flex justify-center">
          <div className="h-px w-40 bg-gradient-to-r from-transparent via-[#BFDBFE] to-transparent" />
        </div>

        <div id="track" className="sr-only" aria-hidden="true" />
      </div>
    </section>
  )
}
