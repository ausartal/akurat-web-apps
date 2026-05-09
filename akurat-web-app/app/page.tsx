import type { Metadata } from 'next'

import { Navbar } from '@/components/landing/navbar'
import { HeroSection } from '@/components/landing/hero-section'
import { FeaturesSection } from '@/components/landing/features-section'
import { TargetUsersSection } from '@/components/landing/target-users-section'
import { LearningMaterialsSection } from '@/components/landing/learning-materials-section'
import { PricingSection } from '@/components/landing/pricing-section'
import { TestimonialsSection } from '@/components/landing/testimonials-section'
import { FaqNewsletterSection } from '@/components/landing/faq-newsletter-section'
import { Footer } from '@/components/landing/footer'

export const metadata: Metadata = {
  title: 'AKURAT | Master Chemistry Easily & Effectively',
  description:
    'AKURAT helps students master chemistry with structured learning paths, interactive materials, and adaptive practice systems.',
}

export default function LandingPage() {
  return (
    <div className="bg-[#F8FAFC] text-[#0F172A]">
      <Navbar />
      <HeroSection />
      <FeaturesSection />
      <TargetUsersSection />
      <LearningMaterialsSection />
      <PricingSection />
      <TestimonialsSection />
      <FaqNewsletterSection />
      <Footer />
    </div>
  )
}

