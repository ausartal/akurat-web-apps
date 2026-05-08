'use client'

import { motion } from 'framer-motion'
import { CheckCircle2, Star } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

const pricingPlans = [
  {
    name: 'Regular Class',
    price: 75,
    description: 'Perfect for regular learning',
    features: [
      'Basic video lessons',
      'Practice problems',
      'Email support',
      'Certificate of completion',
      'Lifetime access',
    ],
    highlighted: false,
  },
  {
    name: 'Intensive Preparation',
    price: 599,
    period: 'per month',
    description: 'Ideal for competitive exams',
    features: [
      'All regular features',
      'Live Q&A sessions',
      'Detailed feedback',
      'Mock tests & practice',
      'Priority support',
      'Personalized study plan',
      'Interview preparation',
    ],
    highlighted: true,
    badge: 'Most Popular',
  },
  {
    name: 'Olympiad Class',
    price: 1499,
    period: 'per month',
    description: 'Advanced level mastery',
    features: [
      'All intensive features',
      '1-on-1 mentoring',
      'Advanced problems',
      'Resource library access',
      '24/7 support',
      'Competition strategies',
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
    <section id="pricing" className="py-20 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Our Featured <span className="text-blue-600">Classes</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Choose the perfect plan for your learning journey
          </p>
        </motion.div>

        {/* Pricing Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 items-end"
        >
          {pricingPlans.map((plan, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
              className={`relative rounded-2xl transition-all duration-300 overflow-hidden group ${
                plan.highlighted
                  ? 'lg:scale-105 border-2 border-blue-500 shadow-2xl'
                  : 'border border-gray-200 hover:border-gray-300 shadow-lg hover:shadow-xl'
              } ${
                plan.highlighted ? 'bg-gradient-to-br from-blue-50 to-indigo-50' : 'bg-white'
              }`}
            >
              {/* Badge */}
              {plan.badge && (
                <div className="absolute top-4 right-4 z-10">
                  <div className="flex items-center gap-1 px-3 py-1 bg-yellow-400 text-yellow-900 rounded-full text-xs font-semibold">
                    <Star className="w-3 h-3" />
                    {plan.badge}
                  </div>
                </div>
              )}

              {/* Gradient Overlay for Premium */}
              {plan.highlighted && (
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 to-indigo-600/10 pointer-events-none" />
              )}

              <div className="relative z-10 p-8 flex flex-col h-full">
                {/* Title */}
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  {plan.name}
                </h3>
                <p className="text-gray-600 text-sm mb-6">{plan.description}</p>

                {/* Pricing */}
                <div className="mb-8">
                  <div className="flex items-baseline gap-1">
                    <span className="text-5xl font-bold text-gray-900">
                      ₹{plan.price}
                    </span>
                    {plan.period && (
                      <span className="text-gray-600 text-sm">{plan.period}</span>
                    )}
                  </div>
                  {!plan.period && (
                    <p className="text-gray-600 text-sm mt-2">One-time payment</p>
                  )}
                </div>

                {/* Features */}
                <div className="flex-1 space-y-4 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700 text-sm">{feature}</span>
                    </div>
                  ))}
                </div>

                {/* CTA Button */}
                <Link href="/register" className="w-full">
                  <Button
                    className={`w-full font-semibold transition-all ${
                      plan.highlighted
                        ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-xl'
                        : 'bg-gray-900 hover:bg-gray-800 text-white'
                    }`}
                    size="lg"
                  >
                    Get Started
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
