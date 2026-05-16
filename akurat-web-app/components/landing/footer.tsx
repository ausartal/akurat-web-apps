'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Globe, Mail, MessageCircle, Phone, Share2 } from 'lucide-react'

export function Footer() {
  const currentYear = new Date().getFullYear()

  const navLinks = [
    { label: 'Beranda', href: '#hero' },
    { label: 'Cara Kerja', href: '#how-it-works' },
    { label: 'Fitur', href: '#features' },
    { label: 'Materi', href: '#materials' },
    { label: 'Paket', href: '#pricing' },
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
    <footer className="border-t border-[#D9EEF2] bg-white">
      <div className="mx-auto w-full max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-[1.6fr_1fr_1fr]">
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
              AKURAT membantu siswa menguasai stoikiometri melalui asesmen adaptif,
              diagnosis miskonsepsi, dan jalur belajar yang bisa ditindaklanjuti.
            </p>

            <div className="mt-6 space-y-2.5 text-sm text-[#475569]">
              <div className="flex items-center gap-2.5">
                <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#EAF3FF]">
                  <Mail className="h-3.5 w-3.5 text-[#1A73E8]" />
                </div>
                support@akurat.id
              </div>
              <div className="flex items-center gap-2.5">
                <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#EAF3FF]">
                  <Phone className="h-3.5 w-3.5 text-[#1A73E8]" />
                </div>
                +62 812-3456-7890
              </div>
            </div>
          </div>

          <div>
            <h3 className="mb-5 text-xs font-semibold uppercase tracking-widest text-[#0F172A]">Navigasi</h3>
            <ul className="space-y-3">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-[#64748B] transition-colors hover:text-[#1A73E8]"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-5 text-xs font-semibold uppercase tracking-widest text-[#0F172A]">Legal</h3>
            <ul className="space-y-3">
              {legalLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-[#64748B] transition-colors hover:text-[#1A73E8]"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>

            <div className="mt-8">
              <h4 className="mb-4 text-xs font-semibold uppercase tracking-widest text-[#0F172A]">Sosial</h4>
              <div className="flex gap-2.5">
                {socialLinks.map((social) => {
                  const Icon = social.icon
                  return (
                    <a
                      key={social.label}
                      href={social.href}
                      className="flex h-9 w-9 items-center justify-center rounded-xl border border-[#D9EEF2] text-[#64748B] transition-all hover:border-[#00C2FF] hover:bg-[#F8FEFF] hover:text-[#1A73E8]"
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

        <div className="mt-12 flex flex-col gap-3 border-t border-[#D9EEF2] pt-6 text-xs text-[#94A3B8] sm:flex-row sm:items-center sm:justify-between">
          <p>Copyright {currentYear} AKURAT. All rights reserved.</p>
          <p>Built for precise chemistry understanding.</p>
        </div>
      </div>
    </footer>
  )
}
