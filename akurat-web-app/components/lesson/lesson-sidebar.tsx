'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Lesson, Module } from '@/features/lesson/services/lesson.service'
import { useCompleteLessonAction } from '@/features/lesson/hooks/useCompleteLessonAction'
import { getQuizByLessonId } from '@/features/quiz/services/quiz.service'
import { Button } from '@/components/ui/button'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle, Zap, PlayCircle, Clock, ChevronRight } from 'lucide-react'

interface LessonSidebarProps {
  lesson: Lesson
  module: Module | null
  isCompleted: boolean
  userId: string
  onLessonCompleted?: () => void
}

export function LessonSidebar({
  lesson,
  module,
  isCompleted,
  userId,
  onLessonCompleted,
}: LessonSidebarProps) {
  const { completeLesson, isLoading, error } = useCompleteLessonAction()
  const [completed, setCompleted] = useState(isCompleted)
  const [showSuccess, setShowSuccess] = useState(false)
  const [quizId, setQuizId] = useState<string | null>(null)
  const [loadingQuiz, setLoadingQuiz] = useState(true)

  // Check if there's a quiz linked to this lesson
  useEffect(() => {
    async function loadQuiz() {
      const quiz = await getQuizByLessonId(lesson.id)
      setQuizId(quiz?.id ?? null)
      setLoadingQuiz(false)
    }
    loadQuiz()
  }, [lesson.id])

  const handleComplete = async () => {
    const result = await completeLesson(lesson.id, userId, 50)
    if (result.success) {
      setCompleted(true)
      setShowSuccess(true)
      setTimeout(() => setShowSuccess(false), 3000)
      onLessonCompleted?.()
    }
  }

  return (
    <div className="sticky top-24 space-y-4">
      {/* Progress Card */}
      <div className="rounded-2xl border border-[#E0E7FF] bg-gradient-to-br from-[#EEF2FF] to-[#F5F3FF] p-5">
        <div className="flex items-center gap-3 mb-4">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#4F46E5] text-white text-sm font-bold shadow-md shadow-[#4F46E5]/25">
            {lesson.order_index}
          </div>
          <div>
            <p className="text-[10px] font-bold uppercase tracking-widest text-[#4F46E5]">
              Lesson
            </p>
            <p className="text-sm font-semibold text-[#0F172A] leading-snug">{lesson.title}</p>
          </div>
        </div>

        {/* Progress bar */}
        <div className="mt-3">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-xs font-medium text-[#64748B]">Progress</span>
            <span className="text-xs font-bold text-[#4F46E5]">
              {completed ? '100%' : '0%'}
            </span>
          </div>
          <div className="h-2 w-full overflow-hidden rounded-full bg-[#C7D2FE]">
            <motion.div
              className="h-full rounded-full bg-[#4F46E5]"
              initial={{ width: 0 }}
              animate={{ width: completed ? '100%' : '0%' }}
              transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
            />
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="rounded-2xl border border-[#F1F5F9] bg-white p-4 shadow-sm">
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm text-[#64748B]">
              <Clock className="h-4 w-4" />
              Durasi
            </div>
            <span className="text-sm font-semibold text-[#0F172A]">
              {lesson.estimated_minutes} menit
            </span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm text-[#64748B]">
              <Zap className="h-4 w-4" />
              XP Reward
            </div>
            <span className="text-sm font-bold text-[#4F46E5]">+50 XP</span>
          </div>
        </div>
      </div>

      {/* Module info */}
      {module && (
        <div className="rounded-2xl border border-[#F1F5F9] bg-white p-4 shadow-sm">
          <p className="mb-1 text-[10px] font-bold uppercase tracking-widest text-[#94A3B8]">
            Module
          </p>
          <p className="text-sm font-semibold text-[#0F172A]">{module.title}</p>
          {module.description && (
            <p className="mt-1 text-xs text-[#64748B]">{module.description}</p>
          )}
        </div>
      )}

      {/* Complete + Quiz CTA */}
      <div className="space-y-3">
        <AnimatePresence>
          {completed ? (
            <motion.div
              key="completed"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex items-center gap-3 rounded-2xl border border-[#BBF7D0] bg-[#F0FDF4] p-4"
            >
              <CheckCircle className="h-5 w-5 shrink-0 text-[#22C55E]" />
              <div>
                <p className="text-sm font-semibold text-[#166534]">Selesai!</p>
                <p className="text-xs text-[#16A34A]">Kamu mendapat +50 XP</p>
              </div>
            </motion.div>
          ) : (
            <motion.div key="complete-btn">
              <Button
                onClick={handleComplete}
                disabled={isLoading || completed}
                className="w-full rounded-xl bg-[#4F46E5] py-3 text-sm font-semibold text-white shadow-md shadow-[#4F46E5]/25 hover:bg-[#4338CA] transition-all hover:-translate-y-0.5"
                size="lg"
              >
                {isLoading ? 'Menyelesaikan...' : 'Selesaikan Pelajaran'}
              </Button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Quiz CTA — shown after completion or if quiz exists */}
        {!loadingQuiz && quizId && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Link
              href={`/dashboard/quiz/${quizId}`}
              className={`flex w-full items-center justify-between rounded-xl border-2 px-4 py-3 text-sm font-semibold transition-all ${
                completed
                  ? 'border-[#FACC15] bg-[#FEFCE8] text-[#854D0E] hover:bg-[#FEF08A]'
                  : 'border-[#E2E8F0] bg-white text-[#64748B] hover:border-[#C7D2FE] hover:text-[#4F46E5]'
              }`}
            >
              <div className="flex items-center gap-2">
                <PlayCircle className="h-4 w-4" />
                {completed ? 'Ambil Quiz' : 'Quiz Tersedia'}
              </div>
              <ChevronRight className="h-4 w-4" />
            </Link>
          </motion.div>
        )}

        {error && (
          <div className="rounded-xl border border-[#FECACA] bg-[#FEF2F2] p-3 text-sm text-[#DC2626]">
            {error}
          </div>
        )}

        <AnimatePresence>
          {showSuccess && (
            <motion.div
              key="success"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="rounded-xl border border-[#BBF7D0] bg-[#F0FDF4] p-3 text-sm text-[#166534]"
            >
              ✓ Pelajaran selesai! +50 XP diperoleh
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Motivational tip */}
      <div className="rounded-2xl border border-[#E0E7FF] bg-[#EEF2FF] p-4">
        <p className="text-xs leading-relaxed text-[#4F46E5]">
          💡 Selesaikan pelajaran ini dan ambil quiz untuk mendapatkan XP dan menjaga streak belajarmu!
        </p>
      </div>
    </div>
  )
}
