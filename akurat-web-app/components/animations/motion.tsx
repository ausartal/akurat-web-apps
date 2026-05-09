'use client'

import { useRef, useEffect, ReactNode } from 'react'
import { motion, useInView, Variants } from 'framer-motion'

// ─── Shared motion presets ───────────────────────────────────────────────────

export const easings = {
  smooth: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number],
  spring: { type: 'spring', stiffness: 300, damping: 30 },
  entrance: [0.22, 1, 0.36, 1] as [number, number, number, number],
}

// ─── FadeIn ──────────────────────────────────────────────────────────────────

interface FadeInProps {
  children: ReactNode
  delay?: number
  duration?: number
  direction?: 'up' | 'down' | 'left' | 'right' | 'none'
  className?: string
  once?: boolean
  distance?: number
}

export function FadeIn({
  children,
  delay = 0,
  duration = 0.6,
  direction = 'up',
  className,
  once = true,
  distance = 24,
}: FadeInProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once, margin: '-60px 0px' })

  const initial: Record<string, number> = { opacity: 0 }
  if (direction === 'up') initial.y = distance
  if (direction === 'down') initial.y = -distance
  if (direction === 'left') initial.x = distance
  if (direction === 'right') initial.x = -distance

  const animate = isInView
    ? { opacity: 1, x: 0, y: 0 }
    : initial

  return (
    <motion.div
      ref={ref}
      initial={initial}
      animate={animate}
      transition={{ duration, delay, ease: easings.smooth }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

// ─── StaggerContainer ────────────────────────────────────────────────────────

interface StaggerContainerProps {
  children: ReactNode
  staggerDelay?: number
  containerDelay?: number
  className?: string
  once?: boolean
}

const staggerContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: (custom: number) => ({
    opacity: 1,
    transition: {
      staggerChildren: custom,
      delayChildren: 0.1,
    },
  }),
}

export const staggerItemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] },
  },
}

export function StaggerContainer({
  children,
  staggerDelay = 0.1,
  containerDelay = 0,
  className,
  once = true,
}: StaggerContainerProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once, margin: '-60px 0px' })

  return (
    <motion.div
      ref={ref}
      variants={staggerContainerVariants}
      custom={staggerDelay}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      transition={{ delayChildren: containerDelay }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

// ─── HoverCard ───────────────────────────────────────────────────────────────

interface HoverCardProps {
  children: ReactNode
  className?: string
  liftAmount?: number
  scaleAmount?: number
}

export function HoverCard({
  children,
  className,
  liftAmount = 6,
  scaleAmount = 1.02,
}: HoverCardProps) {
  return (
    <motion.div
      className={className}
      whileHover={{ y: -liftAmount, scale: scaleAmount }}
      transition={{ duration: 0.25, ease: easings.smooth }}
    >
      {children}
    </motion.div>
  )
}

// ─── FloatingElement ─────────────────────────────────────────────────────────

interface FloatingElementProps {
  children: ReactNode
  className?: string
  amplitude?: number
  duration?: number
  delay?: number
}

export function FloatingElement({
  children,
  className,
  amplitude = 12,
  duration = 4,
  delay = 0,
}: FloatingElementProps) {
  return (
    <motion.div
      className={className}
      animate={{ y: [-amplitude / 2, amplitude / 2, -amplitude / 2] }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    >
      {children}
    </motion.div>
  )
}

// ─── MagneticButton ──────────────────────────────────────────────────────────

interface MagneticButtonProps {
  children: ReactNode
  className?: string
  strength?: number
}

export function MagneticButton({
  children,
  className,
  strength = 0.3,
}: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null)

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const x = e.clientX - rect.left - rect.width / 2
    const y = e.clientY - rect.top - rect.height / 2
    ref.current.style.transform = `translate(${x * strength}px, ${y * strength}px)`
  }

  function handleMouseLeave() {
    if (!ref.current) return
    ref.current.style.transform = 'translate(0px, 0px)'
    ref.current.style.transition = 'transform 0.5s ease'
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={className}
      style={{ willChange: 'transform' }}
      transition={{ type: 'spring', stiffness: 150, damping: 15 }}
    >
      {children}
    </motion.div>
  )
}
