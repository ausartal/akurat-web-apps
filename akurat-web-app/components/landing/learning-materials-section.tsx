'use client'

import { motion } from 'framer-motion'
import {
  Atom,
  Flame,
  Droplet,
  Link as LinkIcon,
  Zap,
  Beaker,
} from 'lucide-react'

const materials = [
  {
    icon: Atom,
    title: 'Atomic Structure',
    description: 'Master atomic theory and electron configuration',
    color: 'from-blue-500 to-cyan-500',
  },
  {
    icon: Flame,
    title: 'Periodic Table',
    description: 'Learn periodic trends and element properties',
    color: 'from-orange-500 to-red-500',
  },
  {
    icon: Beaker,
    title: 'Stoichiometry',
    description: 'Perfect your mole calculations and reactions',
    color: 'from-green-500 to-emerald-500',
  },
  {
    icon: LinkIcon,
    title: 'Chemical Bonding',
    description: 'Understand molecular structures and bonding',
    color: 'from-purple-500 to-pink-500',
  },
  {
    icon: Flame,
    title: 'Thermochemistry',
    description: 'Study energy and enthalpy in reactions',
    color: 'from-yellow-500 to-orange-500',
  },
  {
    icon: Droplet,
    title: 'Solution Chemistry',
    description: 'Master concentrations and solution properties',
    color: 'from-blue-500 to-teal-500',
  },
  {
    icon: Beaker,
    title: 'Organic Chemistry',
    description: 'Learn carbon compounds and reactions',
    color: 'from-indigo-500 to-purple-500',
  },
  {
    icon: Zap,
    title: 'Reaction Rate',
    description: 'Understand kinetics and catalysts',
    color: 'from-red-500 to-pink-500',
  },
]

export function LearningMaterialsSection() {
  return (
    <section id="materials" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Chemistry Materials We Teach
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Comprehensive coverage of all major chemistry topics
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {materials.map((material, index) => {
            const Icon = material.icon
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                viewport={{ once: true }}
                whileHover={{ y: -8, transition: { duration: 0.3 } }}
                className="group relative overflow-hidden rounded-2xl p-6 bg-gradient-to-br h-full hover:shadow-xl transition-all duration-300"
              >
                <div
                  className={bsolute inset-0 bg-gradient-to-br ${material.color} opacity-10 group-hover:opacity-20 transition-opacity}
                />

                <div className="relative z-10">
                  <div className={w-12 h-12 rounded-xl bg-gradient-to-br ${material.color} text-white flex items-center justify-center mb-4 group-hover:scale-110 transition-transform}>
                    <Icon className="w-6 h-6" />
                  </div>

                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {material.title}
                  </h3>

                  <p className="text-sm text-gray-600">
                    {material.description}
                  </p>
                </div>

                <div className={bsolute inset-0 rounded-2xl border border-gray-200 group-hover:border-gray-300 transition-colors pointer-events-none} />
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
