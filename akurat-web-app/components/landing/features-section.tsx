'use client'

import { motion } from 'framer-motion'
import {
  BookOpen,
  MessageCircle,
  BarChart3,
  Users,
  Brain,
  Zap,
} from 'lucide-react'

const features = [
  {
    icon: BookOpen,
    title: 'Video Tutorials',
    description: 'Learn chemistry concepts through engaging video tutorials explained by expert instructors.',
    color: 'bg-blue-100',
    iconColor: 'text-blue-600',
  },
  {
    icon: MessageCircle,
    title: 'Discussion Forum',
    description: 'Connect with peers, ask questions, and discuss chemistry concepts in our active community.',
    color: 'bg-purple-100',
    iconColor: 'text-purple-600',
  },
  {
    icon: BarChart3,
    title: 'Interactive Quiz',
    description: 'Test your knowledge with interactive quizzes, practice problems, and instant feedback.',
    color: 'bg-yellow-100',
    iconColor: 'text-yellow-600',
  },
  {
    icon: Users,
    title: 'Mentor Guidance',
    description: 'Get personalized support from experienced chemistry tutors and mentors.',
    color: 'bg-red-100',
    iconColor: 'text-red-600',
  },
  {
    icon: Brain,
    title: 'Adaptive Learning',
    description: 'Our AI-powered system adapts to your learning pace and focuses on your weak areas.',
    color: 'bg-green-100',
    iconColor: 'text-green-600',
  },
  {
    icon: Zap,
    title: 'Learning Materials',
    description: 'Access comprehensive study materials, notes, and resources for every chemistry topic.',
    color: 'bg-indigo-100',
    iconColor: 'text-indigo-600',
  },
]

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
    <section id="features" className="py-20 bg-white">
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
            What do you get at <span className="text-blue-600">AKURAT?</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Everything you need to master chemistry effectively
          </p>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <motion.div
                key={index}
                variants={itemVariants}
                className="group p-6 rounded-2xl border border-gray-200 hover:border-blue-200 hover:shadow-lg transition-all duration-300 bg-white"
              >
                {/* Icon */}
                <div className={`w-12 h-12 ${feature.color} ${feature.iconColor} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <Icon className="w-6 h-6" />
                </div>

                {/* Content */}
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
