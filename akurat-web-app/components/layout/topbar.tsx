'use client'

import { BookOpen, Plus, Zap } from 'lucide-react'
import Link from 'next/link'

interface TopbarProps {
  title?: string
  subtitle?: string
}

export default function Topbar({ title = 'Dashboard', subtitle }: TopbarProps) {
  return (
    <header className="flex h-[72px] items-center justify-between border-b border-[#F1F5F9] bg-white px-8">
      <div>
        <h1 className="text-xl font-bold text-[#0F172A]">{title}</h1>
        {subtitle && (
          <p className="text-sm text-[#94A3B8]">{subtitle}</p>
        )}
      </div>

      <div className="flex items-center gap-3">
        <button className="flex items-center gap-2 rounded-xl border border-[#E2E8F0] bg-white px-4 py-2 text-sm font-medium text-[#374151] transition-all hover:bg-[#F8FAFC] hover:border-[#C7D2FE]">
          <BookOpen className="h-4 w-4 text-[#64748B]" />
          Mulai Exam
          <span className="h-2 w-2 rounded-full bg-[#F97316]" />
        </button>
        <button className="flex items-center gap-2 rounded-xl bg-[#4F46E5] px-4 py-2 text-sm font-semibold text-white shadow-md shadow-[#4F46E5]/20 transition-all hover:bg-[#4338CA] hover:-translate-y-0.5">
          <Plus className="h-4 w-4" />
          Adaptive Quiz
        </button>
      </div>
    </header>
  )
}

