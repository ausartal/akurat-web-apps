'use client'

import { motion } from 'framer-motion'
import { Star } from 'lucide-react'

const testimonials = [
  {
    name: 'Arjun Sharma',
    role: 'JEE Main Aspirant',
    content:
      'AKURAT transformed my chemistry preparation. The structured approach and expert guidance helped me score 98/100 in chemistry. Highly recommended!',
    rating: 5,
    avatar: '👨‍🎓',
    color: 'from-blue-500 to-cyan-500',
  },
  {
    name: 'Priya Verma',
    role: 'Chemistry Olympiad Finalist',
    content:
      'The advanced topics and problem-solving techniques taught here are incredible. I got selected for the International Olympiad thanks to AKURAT!',
    rating: 5,
    avatar: '👩‍🎓',
    color: 'from-purple-500 to-pink-500',
  },
  {
    name: 'Rohan Desai',
    role: 'College Student',
    content:
      'I was struggling with organic chemistry until I joined AKURAT. The clarity of explanations and practice problems made everything clear.',
    rating: 5,
    avatar: '🧑‍🎓',
    color: 'from-green-500 to-emerald-500',
  },
  {
    name: 'Isha Patel',
    role: 'NEET Qualifier',
    content:
      'AKURAT is the best investment I made for my studies. The mentors are responsive, and the content is comprehensive. I qualified NEET with flying colors!',
    rating: 5,
    avatar: '👩‍⚕️',
    color: 'from-yellow-500 to-orange-500',
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
    <section id="testimonials" className="py-20 bg-gradient-to-b from-gray-900 to-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4">
            What do they say about <span className="text-blue-400">AKURAT?</span>
          </h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Join thousands of students who've transformed their chemistry skills
          </p>
        </motion.div>

        {/* Testimonials Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 gap-8"
        >
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ y: -4, transition: { duration: 0.3 } }}
              className="relative p-8 rounded-2xl bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 hover:border-blue-500/50 transition-all shadow-lg hover:shadow-xl group"
            >
              {/* Avatar */}
              <div className={`absolute -top-6 right-8 w-14 h-14 rounded-full bg-gradient-to-br ${testimonial.color} text-3xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform`}>
                {testimonial.avatar}
              </div>

              {/* Rating */}
              <div className="flex gap-1 mb-4">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                ))}
              </div>

              {/* Quote */}
              <p className="text-gray-100 mb-6 leading-relaxed text-base">
                "{testimonial.content}"
              </p>

              {/* Author */}
              <div className="pt-4 border-t border-slate-700">
                <p className="text-white font-semibold">{testimonial.name}</p>
                <p className="text-gray-400 text-sm">{testimonial.role}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
