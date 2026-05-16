'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import {
  ArrowRight,
  BadgeCheck,
  BrainCircuit,
  Eye,
  EyeOff,
  Lock,
  Mail,
  Sparkles,
} from 'lucide-react'

import { signIn } from '@/features/auth/services/auth.service'

const trustHighlights = [
  {
    icon: BrainCircuit,
    title: 'Adaptive testing',
    description: 'MSAT mengukur pemahaman, bukan sekadar skor.',
  },
  {
    icon: BadgeCheck,
    title: 'Diagnostic-driven',
    description: 'Laporan miskonsepsi siap ditindaklanjuti.',
  },
  {
    icon: Sparkles,
    title: 'Premium UX',
    description: 'Dirancang untuk siswa, guru, dan asosiasi.',
  },
]

export default function LoginPage() {
  const router = useRouter()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  async function handleLogin(event: React.FormEvent) {
    event.preventDefault()
    setLoading(true)
    setErrorMessage(null)

    const { error } = await signIn({ email, password })

    setLoading(false)

    if (error) {
      setErrorMessage(error.message)
      return
    }

    router.push('/dashboard')
  }

  return (
    <div className="flex min-h-screen bg-white">
      {/* Brand panel */}
      <div className="relative hidden w-[54%] overflow-hidden lg:flex">
        <div className="absolute inset-0 bg-[linear-gradient(135deg,#0E4DAA_0%,#1A73E8_45%,#00C2FF_100%)]" />
        <div
          className="absolute inset-0 opacity-[0.18]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.4) 1px, transparent 1px)',
            backgroundSize: '52px 52px',
            maskImage: 'radial-gradient(circle at top right, rgba(0,0,0,1), rgba(0,0,0,0) 70%)',
          }}
        />
        <div className="absolute -top-24 -left-20 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
        <div className="absolute -bottom-32 -right-10 h-96 w-96 rounded-full bg-[#FF9500]/35 blur-3xl" />
        <div className="absolute right-16 top-32 h-24 w-24 rounded-full border-[10px] border-white/35" />

        <div className="relative z-10 flex w-full flex-col justify-between p-12 text-white">
          <Link href="/" aria-label="AKURAT home" className="inline-flex">
            <Image
              src="/akurat-logo.svg"
              alt="AKURAT"
              width={170}
              height={42}
              className="h-10 w-auto brightness-0 invert"
              priority
            />
          </Link>

          <div className="max-w-md">
            <p className="mb-3 inline-flex items-center gap-2 rounded-full bg-white/12 px-3 py-1 text-xs font-bold uppercase tracking-widest backdrop-blur">
              <span className="h-2 w-2 rounded-full bg-[#FFB95A]" />
              Asesmen Kimia Adaptif
            </p>
            <h2 className="text-balance text-4xl font-black leading-[1.1]">
              Ukur pemahaman kimia, bukan sekadar nilai.
            </h2>
            <p className="mt-4 text-base leading-7 text-white/85">
              Masuk kembali untuk melanjutkan jalur belajar stoikiometri, melihat hasil ujian
              MSAT, dan menindaklanjuti rekomendasi remedialmu.
            </p>

            <div className="mt-8 grid gap-3">
              {trustHighlights.map((highlight) => {
                const Icon = highlight.icon
                return (
                  <div
                    key={highlight.title}
                    className="flex items-start gap-3 rounded-2xl border border-white/15 bg-white/10 p-4 backdrop-blur"
                  >
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/20">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-sm font-bold">{highlight.title}</p>
                      <p className="text-sm text-white/80">{highlight.description}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          <p className="text-xs text-white/70">
            &copy; {new Date().getFullYear()} AKURAT. Built for precise chemistry understanding.
          </p>
        </div>
      </div>

      {/* Form panel */}
      <div className="flex flex-1 items-center justify-center px-6 py-12 sm:px-10 lg:px-16">
        <div className="w-full max-w-[420px]">
          <div className="mb-8 lg:hidden">
            <Image
              src="/akurat-logo.svg"
              alt="AKURAT"
              width={140}
              height={36}
              className="h-9 w-auto"
            />
          </div>

          <div className="mb-1 inline-flex items-center gap-2 rounded-full border border-[#D9EEF2] bg-[#F8FEFF] px-3 py-1 text-[11px] font-bold uppercase tracking-widest text-[#1A73E8]">
            Welcome back
          </div>
          <h1 className="text-3xl font-extrabold text-[#0F172A]">Masuk ke akun AKURAT</h1>
          <p className="mt-2 text-sm text-[#64748B]">
            Lanjutkan progres belajar dan akses dashboard pribadimu.
          </p>

          <div className="mt-8 grid grid-cols-2 gap-3">
            <button
              type="button"
              className="flex items-center justify-center gap-2.5 rounded-xl border border-[#E2E8F0] bg-white px-4 py-2.5 text-sm font-semibold text-[#0F172A] transition-colors hover:border-[#BFEFFF] hover:bg-[#F8FEFF]"
            >
              <svg className="h-4 w-4" viewBox="0 0 24 24" aria-hidden="true">
                <path
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  fill="#4285F4"
                />
                <path
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  fill="#34A853"
                />
                <path
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  fill="#FBBC05"
                />
                <path
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  fill="#EA4335"
                />
              </svg>
              Google
            </button>
            <button
              type="button"
              className="flex items-center justify-center gap-2.5 rounded-xl border border-[#E2E8F0] bg-white px-4 py-2.5 text-sm font-semibold text-[#0F172A] transition-colors hover:border-[#BFEFFF] hover:bg-[#F8FEFF]"
            >
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="#1877F2" aria-hidden="true">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
              Facebook
            </button>
          </div>

          <div className="my-6 flex items-center gap-3">
            <div className="h-px flex-1 bg-[#E2E8F0]" />
            <span className="text-[11px] font-bold uppercase tracking-widest text-[#94A3B8]">
              atau dengan email
            </span>
            <div className="h-px flex-1 bg-[#E2E8F0]" />
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label htmlFor="email" className="mb-1.5 block text-sm font-semibold text-[#1E293B]">
                Email
              </label>
              <div className="relative">
                <Mail className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#94A3B8]" />
                <input
                  id="email"
                  type="email"
                  placeholder="email@sekolah.ac.id"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  required
                  autoComplete="email"
                  className="h-12 w-full rounded-xl border border-[#E2E8F0] bg-white pl-10 pr-4 text-sm text-[#0F172A] outline-none transition placeholder:text-[#94A3B8] focus:border-[#1A73E8] focus:ring-2 focus:ring-[#BFEFFF]"
                />
              </div>
            </div>

            <div>
              <div className="mb-1.5 flex items-center justify-between">
                <label htmlFor="password" className="text-sm font-semibold text-[#1E293B]">
                  Kata sandi
                </label>
                <Link href="#" className="text-xs font-semibold text-[#1A73E8] hover:underline">
                  Lupa kata sandi?
                </Link>
              </div>
              <div className="relative">
                <Lock className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#94A3B8]" />
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Masukkan kata sandi"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  required
                  autoComplete="current-password"
                  className="h-12 w-full rounded-xl border border-[#E2E8F0] bg-white pl-10 pr-11 text-sm text-[#0F172A] outline-none transition placeholder:text-[#94A3B8] focus:border-[#1A73E8] focus:ring-2 focus:ring-[#BFEFFF]"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((current) => !current)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg p-1 text-[#94A3B8] transition hover:bg-[#F1F5F9] hover:text-[#1A73E8]"
                  aria-label={showPassword ? 'Sembunyikan kata sandi' : 'Lihat kata sandi'}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            {errorMessage && (
              <div className="rounded-xl border border-[#FECACA] bg-[#FEF2F2] px-4 py-3 text-sm text-[#B91C1C]">
                {errorMessage}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="group inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#1A73E8] text-sm font-bold text-white shadow-[0_18px_36px_-18px_rgba(26,115,232,0.95)] transition hover:-translate-y-0.5 hover:bg-[#155FC3] disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0"
            >
              {loading ? 'Memproses…' : 'Masuk'}
              {!loading && (
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              )}
            </button>
          </form>

          <p className="mt-7 text-center text-sm text-[#64748B]">
            Belum punya akun?{' '}
            <Link
              href="/register"
              className="font-bold text-[#1A73E8] transition-colors hover:text-[#155FC3]"
            >
              Daftar sekarang
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
