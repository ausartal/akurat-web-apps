import { Navbar } from '@/components/landing/navbar'
import { HeroSection } from '@/components/landing/hero-section'
import { FeaturesSection } from '@/components/landing/features-section'
import { TargetUsersSection } from '@/components/landing/target-users-section'
import { LearningMaterialsSection } from '@/components/landing/learning-materials-section'
import { PricingSection } from '@/components/landing/pricing-section'
import { TestimonialsSection } from '@/components/landing/testimonials-section'
import { FaqNewsletterSection } from '@/components/landing/faq-newsletter-section'
import { Footer } from '@/components/landing/footer'

export default function LandingPage() {
  return (
    <div className="bg-white">
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
