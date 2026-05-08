'use client'

import { motion } from 'framer-motion'
import { Check, Award, BookOpen, Target, Rocket, GraduationCap } from 'lucide-react'

const userTypes = [
  {
    icon: GraduationCap,
    text: 'High school chemistry students',
    color: 'text-blue-600',
  },
  {
    icon: Award,
    text: 'Olympiad preparation',
    color: 'text-purple-600',
  },
  {
    icon: BookOpen,
    text: 'University entrance preparation',
    color: 'text-green-600',
  },
  {
    icon: Target,
    text: 'Chemistry competition training',
    color: 'text-yellow-600',
  },
  {
    icon: Rocket,
    text: 'College chemistry support',
    color: 'text-red-600',
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

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6 },
    },
  }

  return (
    <section id="about" className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative h-full hidden lg:block"
          >
            <div className="relative w-full h-96 flex items-center justify-center">
              {/* Main Visual Card */}
              <motion.div
                animate={{ y: [-20, 20, -20] }}
                transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute inset-0 bg-gradient-to-br from-indigo-600 to-blue-600 rounded-3xl shadow-2xl flex items-end justify-center p-8 overflow-hidden"
              >
                {/* Chemistry Elements */}
                <div className="text-center text-white z-10">
                  <div className="text-7xl mb-4">👨‍🎓</div>
                  <p className="text-2xl font-bold">Join AKURAT</p>
                  <p className="text-indigo-200 mt-2">Master Chemistry Today</p>
                </div>

                {/* Decorative Elements */}
                <div className="absolute top-8 right-8 w-24 h-24 bg-white/10 rounded-full blur-xl" />
                <div className="absolute bottom-8 left-8 w-32 h-32 bg-white/10 rounded-full blur-xl" />
              </motion.div>

              {/* Floating Badge 1 */}
              <motion.div
                animate={{ y: [-40, 40, -40] }}
                transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute top-12 right-6 bg-yellow-400 text-gray-900 px-4 py-2 rounded-full font-semibold shadow-lg z-20"
              >
                ✨ Expert Tips
              </motion.div>

              {/* Floating Badge 2 */}
              <motion.div
                animate={{ y: [40, -40, 40] }}
                transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute bottom-20 left-6 bg-green-500 text-white px-4 py-2 rounded-full font-semibold shadow-lg z-20"
              >
                🚀 99% Success
              </motion.div>
            </div>
          </motion.div>

          {/* Right Content */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="space-y-8"
          >
            {/* Header */}
            <div>
              <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
                Who is <span className="text-blue-600">AKURAT</span>
                <br />
                <span className="text-indigo-600">for?</span>
              </h2>
              <p className="text-lg text-gray-600">
                AKURAT is designed to help chemistry students at all levels achieve their learning goals.
              </p>
            </div>

            {/* Checklist */}
            <motion.div
              variants={containerVariants}
              className="space-y-4"
            >
              {userTypes.map((user, index) => {
                const Icon = user.icon
                return (
                  <motion.div
                    key={index}
                    variants={itemVariants}
                    className="flex items-center gap-4 p-4 rounded-xl bg-gray-50 hover:bg-blue-50 transition-colors group"
                  >
                    <div className={`w-10 h-10 rounded-lg bg-white flex items-center justify-center flex-shrink-0 group-hover:bg-blue-100 transition-colors`}>
                      <Icon className={`w-5 h-5 ${user.color}`} />
                    </div>
                    <p className="text-gray-900 font-medium">{user.text}</p>
                  </motion.div>
                )
              })}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
