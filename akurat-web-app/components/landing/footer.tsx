'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Mail, Phone, Globe, MessageCircle, Share2 } from 'lucide-react'

export function Footer() {
  const currentYear = new Date().getFullYear()

  const navLinks = [
    { label: 'Home', href: '#' },
    { label: 'Features', href: '#features' },
    { label: 'Pricing', href: '#pricing' },
    { label: 'Contact Us', href: '#faq' },
  ]

  const legalLinks = [
    { label: 'Terms of Service', href: '/terms' },
    { label: 'Privacy Policy', href: '/privacy' },
  ]

  const socialLinks = [
    { icon: Globe, href: '#', label: 'Website' },
    { icon: MessageCircle, href: '#', label: 'Community' },
    { icon: Share2, href: '#', label: 'Share' },
  ]

  return (
    <footer className="border-t border-[#E2E8F0] bg-white">
      <div className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-[1.2fr_1fr_1fr]">
          <div>
            <Link href="/" className="inline-flex items-center" aria-label="AKURAT home">
              <Image src="/akurat-logo.svg" alt="AKURAT" width={136} height={36} className="h-8 w-auto" />
            </Link>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-[#64748B]">
              Operating as a chemistry learning platform with a modern curriculum and adaptive learning flow.
            </p>

            <div className="mt-5 space-y-2 text-sm text-[#475569]">
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-[#4F46E5]" />
                support@akurat.id
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-[#4F46E5]" />
                +1 (703) 456-7780
              </div>
            </div>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-[#0F172A]">Navigation</h3>
            <ul className="space-y-2.5">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-[#64748B] transition-colors hover:text-[#2563EB]"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-[#0F172A]">Legal</h3>
            <ul className="space-y-2.5">
              {legalLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-[#64748B] transition-colors hover:text-[#2563EB]"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>

            <div className="mt-6">
              <h4 className="mb-3 text-sm font-semibold uppercase tracking-wide text-[#0F172A]">Social</h4>
              <div className="flex gap-2.5">
              {socialLinks.map((social) => {
                const Icon = social.icon
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#E2E8F0] text-[#475569] transition-colors hover:border-[#C7D2FE] hover:text-[#4F46E5]"
                    aria-label={social.label}
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                )
              })}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-3 border-t border-[#E2E8F0] pt-6 text-xs text-[#94A3B8] sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {currentYear} AKURAT. All rights reserved.
          </p>
          <p>
            Built for better chemistry understanding.
          </p>
        </div>
      </div>
    </footer>
  )
}
