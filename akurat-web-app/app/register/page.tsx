'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import {
  ArrowRight,
  BookOpen,
  Eye,
  EyeOff,
  GraduationCap,
  Lock,
  Mail,
  Sparkles,
  User,
} from 'lucide-react'

import { signUp } from '@/features/auth/services/auth.service'

type Role = 'student' | 'teacher'

const roleOptions: Array<{
  value: Role
  icon: typeof GraduationCap
  title: string
  description: string
}> = [
  {
    value: 'student',
    icon: GraduationCap,
    title: 'Siswa',
    description: 'Belajar materi, kerjakan quiz, ikuti ujian MSAT.',
  },
  {
    value: 'teacher',
    icon: BookOpen,
    title: 'Guru / Mentor',
    description: 'Buat materi, pantau progres, lihat analytics kelas.',
  },
]

export default function RegisterPage() {
  const router = useRouter()

  const [role, setRole] = useState<Role>('student')
  const [fullName, setFullName] = useState('')
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  async function handleRegister(event: React.FormEvent) {
    event.preventDefault()
    setLoading(true)
    setErrorMessage(null)

    const { error } = await signUp({ full_name: fullName, email, password })

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
      <div className="relative hidden w-[50%] overflow-hidden lg:flex">
        <div className="absolute inset-0 bg-[linear-gradient(135deg,#0E4DAA_0%,#1A73E8_55%,#00C2FF_100%)]" />
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
              <Sparkles className="h-3.5 w-3.5" />
              Mulai gratis hari ini
            </p>
            <h2 className="text-balance text-4xl font-black leading-[1.1]">
              Bergabunglah dengan ekosistem belajar kimia adaptif.
            </h2>
            <p className="mt-4 text-base leading-7 text-white/85">
              Daftarkan diri sebagai siswa atau guru untuk mengakses materi stoikiometri,
              quiz adaptif, dan laporan kompetensi yang siap ditindaklanjuti.
            </p>

            <div className="mt-10 grid grid-cols-3 gap-3 text-center">
              {[
                { value: '4', label: 'Tahap MSAT' },
                { value: '6+', label: 'Pola miskonsepsi' },
                { value: '3', label: 'Mode pengguna' },
              ].map((item) => (
                <div
                  key={item.label}
                  className="rounded-2xl border border-white/15 bg-white/10 p-4 backdrop-blur"
                >
                  <p className="text-3xl font-black">{item.value}</p>
                  <p className="mt-1 text-[11px] font-semibold uppercase tracking-widest text-white/80">
                    {item.label}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <p className="text-xs text-white/70">
            &copy; {new Date().getFullYear()} AKURAT. Built for precise chemistry understanding.
          </p>
        </div>
      </div>

      {/* Form panel */}
      <div className="flex flex-1 items-center justify-center px-6 py-10 sm:px-10 lg:px-14">
        <div className="w-full max-w-[460px]">
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
            Buat akun baru
          </div>
          <h1 className="text-3xl font-extrabold text-[#0F172A]">Daftar dalam 1 menit</h1>
          <p className="mt-2 text-sm text-[#64748B]">
            Pilih peranmu, lalu lengkapi data dasar untuk memulai.
          </p>

          {/* Role selector */}
          <div className="mt-6 grid grid-cols-2 gap-3">
            {roleOptions.map((option) => {
              const Icon = option.icon
              const active = role === option.value
              return (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => setRole(option.value)}
                  className={`flex flex-col gap-2 rounded-2xl border-2 p-4 text-left transition-all ${
                    active
                      ? 'border-[#1A73E8] bg-[#F8FEFF] text-[#0F172A] shadow-[0_18px_36px_-26px_rgba(26,115,232,0.7)]'
                      : 'border-[#E2E8F0] bg-white text-[#475569] hover:border-[#BFEFFF] hover:bg-[#F8FEFF]'
                  }`}
                  aria-pressed={active}
                >
                  <div
                    className={`flex h-10 w-10 items-center justify-center rounded-xl ${
                      active ? 'bg-[#1A73E8] text-white' : 'bg-[#EDF2F2] text-[#1A73E8]'
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-[#0F172A]">{option.title}</p>
                    <p className="mt-0.5 text-xs leading-relaxed text-[#64748B]">
                      {option.description}
                    </p>
                  </div>
                </button>
              )
            })}
          </div>

          {/* Form */}
          <form onSubmit={handleRegister} className="mt-6 space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label
                  htmlFor="full_name"
                  className="mb-1.5 block text-sm font-semibold text-[#1E293B]"
                >
                  Nama lengkap
                </label>
                <div className="relative">
                  <User className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#94A3B8]" />
                  <input
                    id="full_name"
                    type="text"
                    placeholder="Nama lengkapmu"
                    value={fullName}
                    onChange={(event) => setFullName(event.target.value)}
                    required
                    autoComplete="name"
                    className="h-11 w-full rounded-xl border border-[#E2E8F0] bg-white pl-9 pr-3 text-sm text-[#0F172A] outline-none transition placeholder:text-[#94A3B8] focus:border-[#1A73E8] focus:ring-2 focus:ring-[#BFEFFF]"
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="username"
                  className="mb-1.5 block text-sm font-semibold text-[#1E293B]"
                >
                  Username
                </label>
                <div className="relative">
                  <User className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#94A3B8]" />
                  <input
                    id="username"
                    type="text"
                    placeholder="username"
                    value={username}
                    onChange={(event) => setUsername(event.target.value)}
                    autoComplete="username"
                    className="h-11 w-full rounded-xl border border-[#E2E8F0] bg-white pl-9 pr-3 text-sm text-[#0F172A] outline-none transition placeholder:text-[#94A3B8] focus:border-[#1A73E8] focus:ring-2 focus:ring-[#BFEFFF]"
                  />
                </div>
              </div>
            </div>

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
                  className="h-11 w-full rounded-xl border border-[#E2E8F0] bg-white pl-10 pr-4 text-sm text-[#0F172A] outline-none transition placeholder:text-[#94A3B8] focus:border-[#1A73E8] focus:ring-2 focus:ring-[#BFEFFF]"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="password"
                className="mb-1.5 block text-sm font-semibold text-[#1E293B]"
              >
                Kata sandi
              </label>
              <div className="relative">
                <Lock className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#94A3B8]" />
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Minimal 8 karakter"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  required
                  autoComplete="new-password"
                  minLength={8}
                  className="h-11 w-full rounded-xl border border-[#E2E8F0] bg-white pl-10 pr-11 text-sm text-[#0F172A] outline-none transition placeholder:text-[#94A3B8] focus:border-[#1A73E8] focus:ring-2 focus:ring-[#BFEFFF]"
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
              <p className="mt-1.5 text-xs text-[#94A3B8]">
                Gunakan minimal 8 karakter dengan kombinasi huruf dan angka.
              </p>
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
              {loading ? 'Membuat akun…' : 'Buat akun'}
              {!loading && (
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              )}
            </button>

            <p className="text-center text-[11px] leading-5 text-[#94A3B8]">
              Dengan mendaftar, kamu menyetujui{' '}
              <Link href="/terms" className="font-semibold text-[#1A73E8] hover:underline">
                Ketentuan Layanan
              </Link>{' '}
              dan{' '}
              <Link href="/privacy" className="font-semibold text-[#1A73E8] hover:underline">
                Kebijakan Privasi
              </Link>{' '}
              kami.
            </p>
          </form>

          <p className="mt-6 text-center text-sm text-[#64748B]">
            Sudah punya akun?{' '}
            <Link
              href="/login"
              className="font-bold text-[#1A73E8] transition-colors hover:text-[#155FC3]"
            >
              Masuk di sini
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
