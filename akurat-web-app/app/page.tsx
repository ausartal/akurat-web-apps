import type { Metadata } from 'next'

import { Navbar } from '@/components/landing/navbar'
import { HeroSection } from '@/components/landing/hero-section'
import { HowItWorksSection, OlympiadSection } from '@/components/landing/how-it-works-section'
import { FeaturesSection } from '@/components/landing/features-section'
import { TargetUsersSection } from '@/components/landing/target-users-section'
import { LearningMaterialsSection } from '@/components/landing/learning-materials-section'
import { PricingSection } from '@/components/landing/pricing-section'
import { TestimonialsSection } from '@/components/landing/testimonials-section'
import { FaqNewsletterSection } from '@/components/landing/faq-newsletter-section'
import { Footer } from '@/components/landing/footer'

export const metadata: Metadata = {
  title: 'AKURAT | Measure Precisely, Learn Accurately',
  description:
    'Lebih dari sekadar nilai. Diagnosis pemahaman kimia dan miskonsepsi secara presisi melalui platform adaptif terintegrasi.',
}

export default function LandingPage() {
  return (
    <div className="text-[#0F172A]">
      <Navbar />
      <HeroSection />
      <HowItWorksSection />
      <FeaturesSection />
      <LearningMaterialsSection />
      <OlympiadSection />
      <TargetUsersSection />
      <PricingSection />
      <TestimonialsSection />
      <FaqNewsletterSection />
      <Footer />
    </div>
  )
}

