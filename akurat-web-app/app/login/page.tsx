'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { Mail, Lock, Eye, EyeOff } from 'lucide-react'

import { signIn } from '@/features/auth/services/auth.service'

export default function LoginPage() {
  const router = useRouter()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)

    const { error } = await signIn({ email, password })

    setLoading(false)

    if (error) {
      alert(error.message)
      return
    }

    router.push('/dashboard')
  }

  return (
    <div className="flex min-h-screen bg-[#F3F4F6]">
      {/* Left decorative panel */}
      <div className="relative hidden w-[58%] overflow-hidden bg-[#F0F2F5] lg:flex items-center justify-center">
        {/* Grid pattern */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              'linear-gradient(rgba(203,213,225,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(203,213,225,0.5) 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }}
        />

        {/* Decorative blobs/shapes */}
        {/* Top-left cyan arc */}
        <div className="absolute -left-16 top-8 h-40 w-40 rounded-full border-[20px] border-[#06B6D4] bg-transparent opacity-90" />

        {/* Top-center purple blob */}
        <div
          className="absolute top-4 left-1/2 -translate-x-1/4 h-40 w-44 rounded-full bg-[#4F46E5] opacity-70 blur-2xl"
          style={{ filter: 'blur(32px)' }}
        />

        {/* Yellow crescent (right side) */}
        <div
          className="absolute right-12 top-32 h-20 w-20 rounded-full bg-[#FACC15]"
          style={{ clipPath: 'polygon(60% 0%, 100% 0%, 100% 100%, 60% 100%, 20% 50%)' }}
        />

        {/* Orange star bottom-left */}
        <div className="absolute bottom-16 left-8 text-[#F97316]">
          <svg width="72" height="72" viewBox="0 0 72 72" fill="none">
            <path
              d="M36 0L39.8 27.2L67 36L39.8 44.8L36 72L32.2 44.8L5 36L32.2 27.2L36 0Z"
              fill="#F97316"
            />
          </svg>
        </div>

        {/* Yellow half-circle bottom-right */}
        <div
          className="absolute bottom-8 right-8 h-28 w-28 rounded-full bg-[#FACC15]"
          style={{ clipPath: 'ellipse(50% 100% at 100% 50%)' }}
        />

        {/* Bottom-left cyan half */}
        <div
          className="absolute bottom-24 left-0 h-24 w-24 rounded-full bg-[#06B6D4]"
          style={{ clipPath: 'ellipse(100% 50% at 0% 50%)' }}
        />

        {/* Center logo */}
        <div className="relative z-10 flex flex-col items-center gap-4">
          <Image
            src="/akurat-logo.svg"
            alt="AKURAT"
            width={200}
            height={56}
            className="h-16 w-auto drop-shadow-lg"
          />
        </div>
      </div>

      {/* Right form panel */}
      <div className="flex flex-1 flex-col items-center justify-center bg-white px-6 py-12 sm:px-10 lg:px-16">
        {/* Mobile logo */}
        <div className="mb-8 lg:hidden">
          <Image src="/akurat-logo.svg" alt="AKURAT" width={140} height={36} className="h-9 w-auto" />
        </div>

        <div className="w-full max-w-[400px]">
          <h1 className="text-2xl font-bold text-[#0F172A]">Welcome back</h1>
          <p className="mt-1 text-sm text-[#64748B]">Enter your credentials to access your account</p>

          {/* Social buttons */}
          <div className="mt-7 grid grid-cols-2 gap-3">
            <button className="flex items-center justify-center gap-2.5 rounded-xl border border-[#E2E8F0] bg-white px-4 py-2.5 text-sm font-medium text-[#374151] transition-colors hover:bg-[#F9FAFB] hover:border-[#CBD5E1]">
              <svg className="h-4 w-4" viewBox="0 0 24 24">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              Google
            </button>
            <button className="flex items-center justify-center gap-2.5 rounded-xl border border-[#E2E8F0] bg-white px-4 py-2.5 text-sm font-medium text-[#374151] transition-colors hover:bg-[#F9FAFB] hover:border-[#CBD5E1]">
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="#1877F2">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
              Facebook
            </button>
          </div>

          {/* OR divider */}
          <div className="my-6 flex items-center gap-3">
            <div className="h-px flex-1 bg-[#E2E8F0]" />
            <span className="text-xs font-medium text-[#94A3B8]">OR</span>
            <div className="h-px flex-1 bg-[#E2E8F0]" />
          </div>

          {/* Form */}
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-[#374151]">Email</label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#94A3B8]" />
                <input
                  type="email"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full rounded-xl border border-[#E2E8F0] bg-white py-2.5 pl-10 pr-4 text-sm text-[#0F172A] placeholder-[#94A3B8] outline-none transition-all focus:border-[#4F46E5] focus:ring-2 focus:ring-[#4F46E5]/15"
                />
              </div>
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-medium text-[#374151]">Password</label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#94A3B8]" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full rounded-xl border border-[#E2E8F0] bg-white py-2.5 pl-10 pr-10 text-sm text-[#0F172A] placeholder-[#94A3B8] outline-none transition-all focus:border-[#4F46E5] focus:ring-2 focus:ring-[#4F46E5]/15"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#94A3B8] hover:text-[#64748B] transition-colors"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="mt-2 w-full rounded-xl bg-[#7C3AED] py-3 text-sm font-semibold text-white shadow-md shadow-[#7C3AED]/25 transition-all hover:bg-[#6D28D9] hover:-translate-y-0.5 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? 'Signing in...' : 'Sign in'}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-[#64748B]">
            Don&apos;t have an account?{' '}
            <Link href="/register" className="font-semibold text-[#4F46E5] hover:text-[#4338CA] transition-colors">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
