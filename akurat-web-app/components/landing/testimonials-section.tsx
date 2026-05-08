'use client'

import { motion } from 'framer-motion'
import { Star } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

const testimonials = [
  {
    name: 'Ana',
    role: 'Student',
    content:
      'Courses really helped me understand chemistry concepts easily. The learning videos were clear and the practice made me more confident.',
    rating: 5,
    avatar: 'A',
  },
  {
    name: 'Asep',
    role: 'Parent',
    content:
      'The olympiad chemistry class gives excellent structured lessons. My child improved significantly after joining AKURAT.',
    rating: 5,
    avatar: 'As',
  },
  {
    name: 'Budi',
    role: 'High School Student',
    content:
      'I was worried chemistry would be hard, but AKURAT made every lesson step-by-step and practical. It is now one of my best subjects.',
    rating: 5,
    avatar: 'B',
  },
  {
    name: 'Cici',
    role: 'University Student',
    content:
      'The mentoring community and chapter quizzes are excellent. I now feel better prepared for exams and chemistry projects.',
    rating: 5,
    avatar: 'C',
  },
]

export function TestimonialsSection() {
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
    <section id="testimonials" className="bg-[#1E1B7A] py-20">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid gap-7 lg:grid-cols-[0.95fr_1.05fr]"
        >
          <motion.div variants={itemVariants} className="space-y-5">
            <h2 className="text-3xl font-extrabold leading-tight text-white sm:text-4xl">
              What do they say about
              <span className="text-[#FACC15]"> AKURAT?</span>
            </h2>
            <p className="max-w-sm text-sm leading-relaxed text-[#C7D2FE] sm:text-base">
              Don&apos;t hesitate to join. Learners and parents experience a different chemistry journey with AKURAT.
            </p>
            <Link href="/register">
              <Button className="mt-2 rounded-xl bg-[#4F46E5] px-6 text-white hover:bg-[#4338CA]">Join Now</Button>
            </Link>
          </motion.div>

          <div className="grid gap-4 sm:grid-cols-2">
            {testimonials.map((testimonial, index) => (
              <motion.article
                key={testimonial.name + index}
                variants={itemVariants}
                whileHover={{ y: -4 }}
                className="rounded-2xl border border-white/15 bg-white p-5 shadow-lg"
              >
                <div className="mb-2 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#EEF2FF] text-xs font-bold text-[#4F46E5]">
                      {testimonial.avatar}
                    </div>
                    <p className="text-sm font-semibold text-[#0F172A]">{testimonial.name}</p>
                  </div>
                  <div className="flex items-center gap-0.5">
                    {Array.from({ length: testimonial.rating }).map((_, i) => (
                      <Star key={i} className="h-3.5 w-3.5 fill-[#FACC15] text-[#FACC15]" />
                    ))}
                  </div>
                </div>
                <p className="text-sm leading-relaxed text-[#334155]">“{testimonial.content}”</p>
                <p className="mt-3 text-xs font-medium text-[#64748B]">{testimonial.role}</p>
              </motion.article>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
