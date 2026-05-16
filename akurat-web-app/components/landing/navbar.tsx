'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, Menu, X } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  const navItems = [
    { label: 'Beranda', href: '#hero' },
    { label: 'Cara Kerja', href: '#how-it-works' },
    { label: 'Fitur', href: '#features' },
    { label: 'Materi', href: '#materials' },
    { label: 'Paket', href: '#pricing' },
  ]

  return (
    <nav className="sticky top-0 z-50 border-b border-[#D9EEF2]/80 bg-white/88 backdrop-blur-xl">
      <div className="mx-auto flex h-[76px] w-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2.5" aria-label="AKURAT home">
          <Image
            src="/akurat-logo.svg"
            alt="AKURAT"
            width={140}
            height={36}
            priority
            className="h-9 w-auto"
          />
        </Link>

        <div className="hidden items-center gap-1 rounded-full border border-[#D9EEF2] bg-[#F8FAFB] p-1 lg:flex">
          {navItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="rounded-full px-4 py-2 text-sm font-bold text-[#475569] transition-colors hover:bg-white hover:text-[#1A73E8]"
            >
              {item.label}
            </Link>
          ))}
        </div>

        <div className="hidden items-center gap-3 md:flex">
          <Link href="/login">
            <Button
              variant="outline"
              size="sm"
              className="h-11 rounded-xl border-[#D9EEF2] px-5 font-bold text-[#0F172A] transition-all hover:border-[#00C2FF] hover:bg-[#F8FEFF] hover:text-[#1A73E8]"
            >
              Masuk
            </Button>
          </Link>
          <Link href="/register">
            <Button
              size="sm"
              className="h-11 rounded-xl bg-[#1A73E8] px-5 font-bold text-white shadow-md shadow-[#1A73E8]/20 transition-all hover:bg-[#155FC3]"
            >
              Daftar
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="rounded-xl border border-[#D9EEF2] p-2.5 text-[#0F172A] transition-colors hover:bg-[#F8FEFF] md:hidden"
          aria-label="Toggle menu"
        >
          {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        {isOpen && (
          <div className="mb-3 space-y-1 rounded-2xl border border-[#D9EEF2] bg-white p-4 shadow-xl md:hidden">
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="block rounded-xl px-4 py-2.5 text-sm font-bold text-[#475569] transition-colors hover:bg-[#F8FEFF] hover:text-[#1A73E8]"
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <div className="flex gap-2.5 border-t border-[#EDF2F2] pt-3">
              <Link href="/login" className="flex-1">
                <Button variant="outline" size="sm" className="h-10 w-full rounded-xl border-[#D9EEF2] font-bold">
                  Masuk
                </Button>
              </Link>
              <Link href="/register" className="flex-1">
                <Button size="sm" className="h-10 w-full rounded-xl bg-[#1A73E8] font-bold text-white hover:bg-[#155FC3]">
                  Daftar
                </Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}

