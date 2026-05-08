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
    { label: 'Learning Materials', href: '#materials' },
    { label: 'Learning Track', href: '#track' },
    { label: 'Features', href: '#features' },
    { label: 'About', href: '#about' },
  ]

  return (
    <nav className="sticky top-0 z-50 border-b border-[#E2E8F0]/70 bg-white/70 backdrop-blur-xl">
      <div className="mx-auto flex h-20 w-full max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-3" aria-label="AKURAT home">
          <Image src="/akurat-logo.svg" alt="AKURAT" width={134} height={36} priority className="h-8 w-auto" />
        </Link>

        <div className="hidden items-center gap-7 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="text-sm font-medium text-[#475569] transition-colors hover:text-[#2563EB]"
            >
              {item.label}
            </Link>
          ))}
        </div>

        <div className="hidden items-center gap-2.5 md:flex">
          <Link href="/login">
            <Button variant="ghost" size="sm" className="text-[#0F172A] hover:bg-[#E2E8F0]/60">
              Login
            </Button>
          </Link>
          <Link href="/register">
            <Button size="sm" className="rounded-xl bg-[#4F46E5] px-5 text-white hover:bg-[#4338CA]">
              Sign Up
            </Button>
          </Link>
        </div>

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="rounded-lg border border-[#E2E8F0] p-2 text-[#0F172A] md:hidden"
          aria-label="Toggle menu"
        >
          {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        {isOpen && (
          <div className="space-y-2 rounded-2xl border border-[#E2E8F0] bg-white p-4 shadow-lg md:hidden">
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="block rounded-lg px-3 py-2 text-sm font-medium text-[#475569] transition-colors hover:bg-[#F8FAFC] hover:text-[#2563EB]"
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <div className="flex gap-2 pt-2">
              <Link href="/login" className="flex-1">
                <Button variant="outline" size="sm" className="w-full border-[#E2E8F0]">
                  Login
                </Button>
              </Link>
              <Link href="/register" className="flex-1">
                <Button size="sm" className="w-full bg-[#4F46E5] text-white hover:bg-[#4338CA]">
                  Sign Up
                </Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
