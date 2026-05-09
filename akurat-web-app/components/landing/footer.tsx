'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Mail, Phone, Globe, MessageCircle, Share2 } from 'lucide-react'

export function Footer() {
  const currentYear = new Date().getFullYear()

  const navLinks = [
    { label: 'Home', href: '#' },
    { label: 'Learning Material', href: '#materials' },
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
      <div className="mx-auto w-full max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-[1.6fr_1fr_1fr]">
          {/* Brand */}
          <div>
            <Link href="/" className="inline-flex items-center" aria-label="AKURAT home">
              <Image
                src="/akurat-logo.svg"
                alt="AKURAT"
                width={140}
                height={36}
                className="h-9 w-auto"
              />
            </Link>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-[#64748B]">
              AKURAT helps students master chemistry with adaptive diagnostics,
              structured learning paths, and precision feedback.
            </p>

            <div className="mt-6 space-y-2.5 text-sm text-[#475569]">
              <div className="flex items-center gap-2.5">
                <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#EEF2FF]">
                  <Mail className="h-3.5 w-3.5 text-[#4F46E5]" />
                </div>
                support@akurat.id
              </div>
              <div className="flex items-center gap-2.5">
                <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#EEF2FF]">
                  <Phone className="h-3.5 w-3.5 text-[#4F46E5]" />
                </div>
                +62 812-3456-7890
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="mb-5 text-xs font-semibold uppercase tracking-widest text-[#0F172A]">Navigation</h3>
            <ul className="space-y-3">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-[#64748B] transition-colors hover:text-[#4F46E5]"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal + Social */}
          <div>
            <h3 className="mb-5 text-xs font-semibold uppercase tracking-widest text-[#0F172A]">Legal</h3>
            <ul className="space-y-3">
              {legalLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-[#64748B] transition-colors hover:text-[#4F46E5]"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>

            <div className="mt-8">
              <h4 className="mb-4 text-xs font-semibold uppercase tracking-widest text-[#0F172A]">Follow Us</h4>
              <div className="flex gap-2.5">
                {socialLinks.map((social) => {
                  const Icon = social.icon
                  return (
                    <a
                      key={social.label}
                      href={social.href}
                      className="flex h-9 w-9 items-center justify-center rounded-xl border border-[#E2E8F0] text-[#64748B] transition-all hover:border-[#C7D2FE] hover:bg-[#EEF2FF] hover:text-[#4F46E5]"
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

        <div className="mt-12 flex flex-col gap-3 border-t border-[#E2E8F0] pt-6 text-xs text-[#94A3B8] sm:flex-row sm:items-center sm:justify-between">
          <p>© {currentYear} AKURAT. All rights reserved.</p>
          <p>Built for better chemistry understanding.</p>
        </div>
      </div>
    </footer>
  )
}
