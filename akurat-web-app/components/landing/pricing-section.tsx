'use client'

import { motion } from 'framer-motion'
import { CheckCircle2, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

const pricingPlans = [
  {
    name: 'Regular Class',
    price: 75,
    period: '/ month',
    description: 'Perfect for regular learning',
    features: [
      'Basic chemistry tutorial package',
      'Weekly practice and mini quiz access',
      'Structured chapter progression',
      'Learning dashboard and progress view',
      'Forum access for peer support',
    ],
    highlighted: false,
  },
  {
    name: 'Intensive Preparation',
    price: 99,
    period: '/ month',
    description: 'Ideal for competitive exams',
    features: [
      'Chemistry preparation for school exams',
      'Guided practice and deep-dive sessions',
      'Advanced quiz and mock test modules',
      'Performance analytics and action plan',
      'Mentor check-ins and priority response',
      'University prep-oriented chapter track',
    ],
    highlighted: true,
    badge: 'Recommended',
  },
  {
    name: 'Olympiad Class',
    price: 149,
    period: '/ month',
    description: 'Advanced level mastery',
    features: [
      'Olympiad and competition chemistry path',
      'High-difficulty conceptual problem bank',
      'Premium resource and strategy workshops',
      'Mentor-led evaluation and corrections',
      'Dedicated challenge sets each week',
      'Advanced theory + application modules',
    ],
    highlighted: false,
  },
]

export function PricingSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
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
    <section id="pricing" className="bg-white py-20">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-14 text-center"
        >
          <h2 className="text-3xl font-extrabold text-[#0F172A] sm:text-4xl">
            Our Featured Class
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-sm text-[#64748B] sm:text-base">
            We offer chemistry classes designed to optimize your learning progress.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid items-stretch gap-6 lg:grid-cols-3"
        >
          {pricingPlans.map((plan, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ y: -7, transition: { duration: 0.25 } }}
              className={`relative overflow-hidden rounded-3xl border p-6 transition-all duration-300 sm:p-7 ${
                plan.highlighted
                  ? 'border-[#4F46E5] bg-gradient-to-br from-[#EEF2FF] via-white to-[#F8FAFC] shadow-[0_20px_50px_-30px_rgba(79,70,229,0.6)] lg:scale-[1.02]'
                  : index === 2
                    ? 'border-[#FDE68A] bg-[#FFFBEB] shadow-sm'
                    : 'border-[#E2E8F0] bg-white shadow-sm'
              }`}
            >
              {plan.badge && (
                <div className="absolute right-4 top-4 z-10">
                  <div className="flex items-center gap-1 rounded-full bg-[#FACC15] px-3 py-1 text-xs font-semibold text-[#0F172A]">
                    <Sparkles className="h-3 w-3" />
                    {plan.badge}
                  </div>
                </div>
              )}

              <div className="flex h-full flex-col">
                <h3 className="text-xl font-bold text-[#0F172A]">{plan.name}</h3>
                <p className="mt-1 text-sm text-[#64748B]">{plan.description}</p>

                <div className="mt-6 flex items-end gap-1">
                  <span className="text-4xl font-extrabold text-[#0F172A]">${plan.price}</span>
                  <span className="pb-1 text-sm text-[#64748B]">{plan.period}</span>
                </div>

                <div className="mt-6 flex-1 space-y-3">
                  {plan.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-start gap-2.5">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#FACC15]" />
                      <span className="text-sm text-[#334155]">{feature}</span>
                    </div>
                  ))}
                </div>

                <Link href="/register" className="mt-7 w-full">
                  <Button
                    className={`w-full font-semibold transition-all ${
                      plan.highlighted
                        ? 'bg-[#4F46E5] text-white hover:bg-[#4338CA]'
                        : 'bg-[#4F46E5] text-white hover:bg-[#4338CA]'
                    }`}
                    size="lg"
                  >
                    Join Class
                  </Button>
                </Link>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

