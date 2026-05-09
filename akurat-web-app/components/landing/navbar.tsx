'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Menu, X } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  const navItems = [
    { label: 'Home', href: '#' },
    { label: 'Learning Material', href: '#materials' },
    { label: 'Learning Resources', href: '#features' },
    { label: 'Assessment', href: '#pricing' },
  ]

  return (
    <nav className="sticky top-0 z-50 border-b border-[#E2E8F0]/60 bg-white/80 backdrop-blur-xl">
      <div className="mx-auto flex h-18 w-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8" style={{ height: '72px' }}>
        {/* Logo */}
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

        {/* Desktop Nav */}
        <div className="hidden items-center gap-8 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="text-sm font-medium text-[#475569] transition-colors hover:text-[#4F46E5]"
            >
              {item.label}
            </Link>
          ))}
        </div>

        {/* Desktop Actions */}
        <div className="hidden items-center gap-3 md:flex">
          <Link href="/login">
            <Button
              variant="outline"
              size="sm"
              className="h-10 rounded-xl border-[#CBD5E1] px-5 text-[#0F172A] hover:bg-[#F1F5F9] hover:border-[#4F46E5] hover:text-[#4F46E5] transition-all"
            >
              Sign In
            </Button>
          </Link>
          <Link href="/register">
            <Button
              size="sm"
              className="h-10 rounded-xl bg-[#4F46E5] px-5 text-white shadow-md shadow-[#4F46E5]/20 hover:bg-[#4338CA] transition-all"
            >
              Get Started
            </Button>
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="rounded-xl border border-[#E2E8F0] p-2.5 text-[#0F172A] md:hidden hover:bg-[#F8FAFC] transition-colors"
          aria-label="Toggle menu"
        >
          {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        {isOpen && (
          <div className="mb-3 space-y-1 rounded-2xl border border-[#E2E8F0] bg-white p-4 shadow-xl md:hidden">
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="block rounded-xl px-4 py-2.5 text-sm font-medium text-[#475569] transition-colors hover:bg-[#EEF2FF] hover:text-[#4F46E5]"
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <div className="flex gap-2.5 pt-3 border-t border-[#F1F5F9]">
              <Link href="/login" className="flex-1">
                <Button variant="outline" size="sm" className="w-full rounded-xl border-[#CBD5E1]">
                  Sign In
                </Button>
              </Link>
              <Link href="/register" className="flex-1">
                <Button size="sm" className="w-full rounded-xl bg-[#4F46E5] text-white hover:bg-[#4338CA]">
                  Get Started
                </Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}

