'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Sparkles } from 'lucide-react'
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
      transition: { duration: 0.8 },
    },
  }

  const floatingVariants = {
    initial: { y: 0 },
    animate: {
      y: [-20, 20, -20],
      transition: { duration: 6, repeat: Infinity },
    },
  }

  return (
    <section className="min-h-screen bg-gradient-to-br from-white via-blue-50 to-indigo-50 pt-20 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          {/* Left Content */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-8"
          >
            {/* Badge */}
            <motion.div variants={itemVariants} className="inline-flex">
              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100 text-blue-700">
                <Sparkles className="w-4 h-4" />
                <span className="text-sm font-medium">Master Chemistry Easily</span>
              </div>
            </motion.div>

            {/* Heading */}
            <motion.div variants={itemVariants} className="space-y-4">
              <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                Master Chemistry{' '}
                <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  Easily & Effectively
                </span>
              </h1>
            </motion.div>

            {/* Subtext */}
            <motion.p
              variants={itemVariants}
              className="text-lg text-gray-600 leading-relaxed"
            >
              AKURAT helps students master chemistry through structured learning paths, interactive materials, and adaptive practice systems designed for every learning style.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link href="/register">
                <Button
                  size="lg"
                  className="bg-blue-600 hover:bg-blue-700 text-white font-semibold shadow-lg hover:shadow-xl transition-all"
                >
                  Start Learning
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
              <Link href="#materials">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-gray-300 text-gray-900 hover:bg-gray-50 font-semibold"
                >
                  Explore Courses
                </Button>
              </Link>
            </motion.div>

            {/* Stats */}
            <motion.div
              variants={itemVariants}
              className="pt-8 grid grid-cols-3 gap-6"
            >
              <div>
                <p className="text-2xl font-bold text-gray-900">1000+</p>
                <p className="text-sm text-gray-600">Students</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">50+</p>
                <p className="text-sm text-gray-600">Topics</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">4.9/5</p>
                <p className="text-sm text-gray-600">Rating</p>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="relative h-full min-h-[500px] hidden lg:flex items-center justify-center"
          >
            {/* Floating Cards Background */}
            <motion.div
              variants={floatingVariants}
              initial="initial"
              animate="animate"
              className="absolute inset-0 flex items-center justify-center"
            >
              {/* Main Card */}
              <div className="absolute w-72 h-96 bg-gradient-to-br from-yellow-300 to-yellow-200 rounded-3xl shadow-2xl transform -rotate-6 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-6xl mb-4">⚗️</div>
                  <p className="font-bold text-gray-900 text-xl">Chemistry</p>
                  <p className="text-gray-700 text-sm mt-2">Master Essential Concepts</p>
                </div>
              </div>

              {/* Badge 1 */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                className="absolute top-8 right-12 w-20 h-20 bg-red-500 rounded-full shadow-lg flex items-center justify-center flex-col"
              >
                <span className="text-2xl font-bold text-white">98</span>
                <span className="text-xs text-white">Score</span>
              </motion.div>

              {/* Badge 2 */}
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
                className="absolute bottom-12 left-8 w-20 h-20 bg-blue-500 rounded-full shadow-lg flex items-center justify-center flex-col"
              >
                <span className="text-2xl font-bold text-white">🏆</span>
                <span className="text-xs text-white text-center">Pro</span>
              </motion.div>

              {/* Floating Circle */}
              <motion.div
                animate={{ y: [-30, 30, -30] }}
                transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute top-32 right-24 w-16 h-16 bg-indigo-600 rounded-full shadow-lg opacity-80"
              />
            </motion.div>

            {/* Floating Elements */}
            <motion.div
              className="absolute top-20 left-8 w-12 h-12 bg-yellow-400 rounded-full opacity-60"
              animate={{ y: [-20, 20, -20] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
            />
            <motion.div
              className="absolute bottom-32 right-16 w-16 h-16 border-2 border-blue-400 rounded-full opacity-40"
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
            />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
