'use client'

import { motion } from 'framer-motion'
import {
  Atom,
  Blocks,
  FlaskConical,
  Gauge,
  Orbit,
  Percent,
  Scale,
  Droplet,
  Link as LinkIcon,
} from 'lucide-react'

const materials = [
  {
    title: 'Atomic Structure',
    icon: Atom,
    description: 'Understand particles, orbitals, and electron configuration.',
  },
  {
    title: 'Periodic Table',
    icon: Blocks,
    description: 'Master periodic trends, families, and element behavior.',
  },
  {
    title: 'Stoichiometry',
    icon: Scale,
    description: 'Solve mole concepts and balanced reaction calculations.',
  },
  {
    title: 'Chemical Bonding',
    icon: LinkIcon,
    description: 'Learn ionic, covalent, and molecular structure models.',
  },
  {
    title: 'Thermochemistry',
    icon: Gauge,
    description: 'Analyze energy changes, enthalpy, and reaction heat.',
  },
  {
    title: 'Solution Chemistry',
    icon: Droplet,
    description: 'Explore concentration, solubility, and solution behavior.',
  },
  {
    title: 'Organic Chemistry',
    icon: FlaskConical,
    description: 'Build foundations in carbon compounds and reactions.',
  },
  {
    title: 'Reaction Rate',
    icon: Percent,
    description: 'Understand kinetics, factors, and catalyst influence.',
  },
]

export function LearningMaterialsSection() {
  return (
    <section id="materials" className="bg-[#F8FAFC] py-20">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-14 text-center"
        >
          <h2 className="text-3xl font-extrabold text-[#0F172A] sm:text-4xl">
            Chemistry Materials We Teach
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-sm text-[#64748B] sm:text-base">
            A complete set of chemistry topics designed for strong conceptual understanding and exam readiness.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="relative"
        >
          <div className="hide-scrollbar flex snap-x gap-4 overflow-x-auto pb-2">
            {materials.map((material, index) => {
              const Icon = material.icon

              return (
                <motion.article
                  key={material.title}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.45, delay: index * 0.03 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -4 }}
                  className="min-h-40 min-w-[250px] snap-start rounded-2xl border border-[#E2E8F0] bg-white p-5 shadow-sm transition-all hover:border-[#BFDBFE] hover:shadow-md sm:min-w-[265px]"
                >
                  <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-xl bg-[#EEF2FF] text-[#4F46E5]">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="mb-1.5 text-sm font-semibold text-[#0F172A] sm:text-base">{material.title}</h3>
                  <p className="text-xs leading-relaxed text-[#64748B] sm:text-sm">{material.description}</p>
                </motion.article>
              )
            })}
          </div>

          <motion.div
            animate={{ x: [0, 8, 0] }}
            transition={{ duration: 1.6, repeat: Infinity }}
            className="pointer-events-none absolute -right-2 top-1/2 hidden -translate-y-1/2 rounded-full border border-[#E2E8F0] bg-white p-2 text-[#4F46E5] shadow-sm lg:block"
            aria-hidden="true"
          >
            <Orbit className="h-4 w-4" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
