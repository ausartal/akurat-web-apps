'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import {
  CheckCircle,
  XCircle,
  ChevronRight,
  Clock,
  Zap,
  Trophy,
  AlertCircle,
  ArrowLeft,
} from 'lucide-react'
import dynamic from 'next/dynamic'
import {
  getQuizById,
  createQuizAttempt,
  submitAnswer,
  completeQuizAttempt,
  type QuizWithQuestions,
  type QuestionWithOptions,
} from '@/features/quiz/services/quiz.service'
import { createClient } from '@/lib/supabase/client'

const ReactConfetti = dynamic(() => import('react-confetti'), { ssr: false })

// ─── Types ────────────────────────────────────────────────────────────────────

interface AnswerState {
  selectedOptionId: string | null
  isCorrect: boolean | null
  revealed: boolean
}

// ─── Sub-components ──────────────────────────────────────────────────────────

function ProgressBar({ current, total }: { current: number; total: number }) {
  const pct = total > 0 ? (current / total) * 100 : 0
  return (
    <div className="h-2 w-full overflow-hidden rounded-full bg-[#F1F5F9]">
      <motion.div
        className="h-full rounded-full bg-gradient-to-r from-[#4F46E5] to-[#7C3AED]"
        initial={{ width: 0 }}
        animate={{ width: `${pct}%` }}
        transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
      />
    </div>
  )
}

function XpBurst({ xp }: { xp: number }) {
  return (
    <AnimatePresence>
      <motion.div
        key="xp"
        initial={{ opacity: 0, y: 0, scale: 0.5 }}
        animate={{ opacity: 1, y: -60, scale: 1 }}
        exit={{ opacity: 0, y: -100 }}
        transition={{ duration: 0.8 }}
        className="pointer-events-none fixed right-8 top-24 z-50 flex items-center gap-1.5 rounded-full bg-[#FACC15] px-4 py-2 text-sm font-bold text-[#0F172A] shadow-lg"
      >
        <Zap className="h-4 w-4" />+{xp} XP
      </motion.div>
    </AnimatePresence>
  )
}

function OptionButton({
  text,
  selected,
  revealed,
  isCorrect,
  disabled,
  onClick,
}: {
  text: string
  selected: boolean
  revealed: boolean
  isCorrect: boolean
  disabled: boolean
  onClick: () => void
}) {
  let baseClass =
    'relative w-full rounded-2xl border-2 px-5 py-4 text-left text-sm font-medium transition-all duration-200 '

  if (!revealed) {
    baseClass += selected
      ? 'border-[#4F46E5] bg-[#EEF2FF] text-[#4F46E5] shadow-md shadow-[#4F46E5]/10'
      : 'border-[#E2E8F0] bg-white text-[#374151] hover:border-[#C7D2FE] hover:bg-[#F8FAFC]'
  } else if (isCorrect) {
    baseClass += 'border-[#22C55E] bg-[#F0FDF4] text-[#166534]'
  } else if (selected && !isCorrect) {
    baseClass += 'border-[#EF4444] bg-[#FEF2F2] text-[#991B1B]'
  } else {
    baseClass += 'border-[#E2E8F0] bg-white text-[#94A3B8]'
  }

  return (
    <motion.button
      onClick={onClick}
      disabled={disabled}
      className={baseClass}
      whileTap={disabled ? {} : { scale: 0.98 }}
      whileHover={disabled ? {} : { scale: 1.01 }}
    >
      <div className="flex items-center gap-3">
        <div
          className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-bold transition-all ${
            revealed && isCorrect
              ? 'bg-[#22C55E] text-white'
              : revealed && selected && !isCorrect
                ? 'bg-[#EF4444] text-white'
                : selected
                  ? 'bg-[#4F46E5] text-white'
                  : 'bg-[#F1F5F9] text-[#64748B]'
          }`}
        >
          {revealed && isCorrect ? (
            <CheckCircle className="h-4 w-4" />
          ) : revealed && selected && !isCorrect ? (
            <XCircle className="h-4 w-4" />
          ) : null}
        </div>
        <span className="flex-1">{text}</span>
      </div>
    </motion.button>
  )
}

// ─── Celebration / Result Screen ─────────────────────────────────────────────

function ResultScreen({
  score,
  total,
  correct,
  xpEarned,
  passed,
  lessonSlug,
  onRetry,
}: {
  score: number
  total: number
  correct: number
  xpEarned: number
  passed: boolean
  lessonSlug?: string | null
  onRetry: () => void
}) {
  const router = useRouter()
  const [windowSize] = useState(() => ({
    width: typeof window === 'undefined' ? 0 : window.innerWidth,
    height: typeof window === 'undefined' ? 0 : window.innerHeight,
  }))
  const [showConfetti, setShowConfetti] = useState(passed)

  useEffect(() => {
    if (passed) {
      const timer = setTimeout(() => setShowConfetti(false), 5000)
      return () => clearTimeout(timer)
    }
  }, [passed])

  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center py-12">
      {showConfetti && (
        <ReactConfetti
          width={windowSize.width}
          height={windowSize.height}
          numberOfPieces={200}
          recycle={false}
          colors={['#4F46E5', '#7C3AED', '#FACC15', '#06B6D4', '#F97316']}
        />
      )}

      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 200, damping: 20 }}
        className="text-center"
      >
        {/* Trophy / sad face */}
        <div
          className={`mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full text-5xl ${
            passed ? 'bg-gradient-to-br from-[#FACC15] to-[#F97316]' : 'bg-[#FEF2F2]'
          }`}
        >
          {passed ? '🏆' : '😢'}
        </div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-3xl font-extrabold text-[#0F172A]"
        >
          {passed ? 'Luar Biasa!' : 'Hampir Berhasil!'}
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-2 text-[#64748B]"
        >
          {passed
            ? 'Kamu berhasil menyelesaikan quiz ini!'
            : 'Jangan menyerah, coba lagi!'}
        </motion.p>

        {/* Score ring */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6, type: 'spring' }}
          className="mx-auto mt-8 flex h-36 w-36 flex-col items-center justify-center rounded-full border-8 border-[#EEF2FF] bg-white shadow-inner"
        >
          <span
            className={`text-4xl font-extrabold ${passed ? 'text-[#4F46E5]' : 'text-[#EF4444]'}`}
          >
            {score}%
          </span>
          <span className="text-xs text-[#94A3B8]">
            {correct}/{total} benar
          </span>
        </motion.div>

        {/* XP earned */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#FEFCE8] px-5 py-2.5 text-sm font-bold text-[#854D0E]"
        >
          <Zap className="h-4 w-4 text-[#FACC15]" />
          +{xpEarned} XP diperoleh
        </motion.div>

        {/* Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center"
        >
          {!passed && (
            <button
              onClick={onRetry}
              className="flex items-center gap-2 rounded-xl border-2 border-[#4F46E5] bg-white px-6 py-3 text-sm font-semibold text-[#4F46E5] transition hover:bg-[#EEF2FF]"
            >
              Coba Lagi
            </button>
          )}
          {lessonSlug && (
            <button
              onClick={() => router.push(`/dashboard/lessons/${lessonSlug}`)}
              className="flex items-center gap-2 rounded-xl bg-[#4F46E5] px-6 py-3 text-sm font-semibold text-white shadow-md shadow-[#4F46E5]/25 transition hover:bg-[#4338CA]"
            >
              Kembali ke Materi
              <ChevronRight className="h-4 w-4" />
            </button>
          )}
          <button
            onClick={() => router.push('/dashboard')}
            className="flex items-center gap-2 rounded-xl bg-[#F1F5F9] px-6 py-3 text-sm font-semibold text-[#374151] transition hover:bg-[#E2E8F0]"
          >
            Dashboard
          </button>
        </motion.div>
      </motion.div>
    </div>
  )
}

// ─── Main Quiz Container ──────────────────────────────────────────────────────

interface QuizContainerProps {
  quizId: string
}

export function QuizContainer({ quizId }: QuizContainerProps) {
  const router = useRouter()
  const [quiz, setQuiz] = useState<QuizWithQuestions | null>(null)
  const [userId, setUserId] = useState<string | null>(null)
  const [attemptId, setAttemptId] = useState<string | null>(null)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [answer, setAnswer] = useState<AnswerState>({
    selectedOptionId: null,
    isCorrect: null,
    revealed: false,
  })
  const [correctCount, setCorrectCount] = useState(0)
  const [showXpBurst, setShowXpBurst] = useState(false)
  const [phase, setPhase] = useState<'loading' | 'quiz' | 'result' | 'error'>('loading')
  const [result, setResult] = useState<{
    score: number
    xpEarned: number
    passed: boolean
  } | null>(null)
  const [timeLeft, setTimeLeft] = useState<number | null>(null)
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)

  // Load quiz + user
  useEffect(() => {
    async function init() {
      const supabase = createClient()
      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (!user) {
        router.push('/login')
        return
      }
      setUserId(user.id)

      const quizData = await getQuizById(quizId)
      if (!quizData || !quizData.questions?.length) {
        setPhase('error')
        return
      }
      setQuiz(quizData)

      const attempt = await createQuizAttempt(quizId, user.id)
      if (!attempt) {
        setPhase('error')
        return
      }
      setAttemptId(attempt.id)

      // Set timer if quiz has a time limit (per-question in seconds)
      if (quizData.time_limit) {
        setTimeLeft(quizData.time_limit)
      }

      setPhase('quiz')
    }
    init()
  }, [quizId, router])

  const currentQuestion: QuestionWithOptions | undefined =
    quiz?.questions[currentIndex]

  const handleSelect = (optionId: string) => {
    if (answer.revealed) return
    setAnswer((prev) => ({ ...prev, selectedOptionId: optionId }))
  }

  async function handleReveal(selectedId: string | null) {
    if (!currentQuestion || !attemptId) return
    if (timerRef.current) clearInterval(timerRef.current)

    const optionId = selectedId ?? answer.selectedOptionId
    const correctOption = currentQuestion.question_options.find(
      (option) => option.is_correct
    )
    const isCorrect =
      optionId !== null && optionId === correctOption?.id

    setAnswer((prev) => ({
      ...prev,
      selectedOptionId: optionId,
      isCorrect,
      revealed: true,
    }))

    if (isCorrect) {
      setCorrectCount((count) => count + 1)
      setShowXpBurst(true)
      setTimeout(() => setShowXpBurst(false), 1200)
    }

    if (optionId) {
      await submitAnswer(attemptId, currentQuestion.id, optionId, isCorrect)
    }
  }

  // Per-question timer
  useEffect(() => {
    if (phase !== 'quiz' || timeLeft === null) return

    timerRef.current = setInterval(() => {
      setTimeLeft((time) => {
        if (time === null || time <= 1) {
          if (timerRef.current) clearInterval(timerRef.current)
          void handleReveal(null)
          return 0
        }
        return time - 1
      })
    }, 1000)

    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
    }
  }, [phase, currentIndex]) // eslint-disable-line react-hooks/exhaustive-deps

  const handleNext = async () => {
    if (!quiz || !userId || !attemptId) return

    const isLast = currentIndex >= quiz.questions.length - 1

    if (isLast) {
      // Complete quiz
      const finalCorrect = answer.isCorrect ? correctCount : correctCount
      const res = await completeQuizAttempt(
        attemptId,
        quizId,
        userId,
        finalCorrect,
        quiz.questions.length,
        quiz.passing_score,
        50 // XP reward — could be stored in quiz.metadata
      )
      if (res) {
        setResult(res)
        setPhase('result')
      }
    } else {
      setCurrentIndex((i) => i + 1)
      setAnswer({ selectedOptionId: null, isCorrect: null, revealed: false })
      // Reset timer for next question
      if (quiz.time_limit) setTimeLeft(quiz.time_limit)
    }
  }

  const handleRetry = () => {
    setCurrentIndex(0)
    setAnswer({ selectedOptionId: null, isCorrect: null, revealed: false })
    setCorrectCount(0)
    setResult(null)
    setPhase('loading')
    // Re-init creates new attempt
    window.location.reload()
  }

  // ── Render states ──────────────────────────────────────────────────────────

  if (phase === 'loading') {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-[#4F46E5] border-t-transparent" />
          <p className="text-sm text-[#94A3B8]">Memuat quiz...</p>
        </div>
      </div>
    )
  }

  if (phase === 'error') {
    return (
      <div className="flex h-64 flex-col items-center justify-center gap-4">
        <AlertCircle className="h-12 w-12 text-[#EF4444]" />
        <p className="font-semibold text-[#0F172A]">Quiz tidak ditemukan</p>
        <button
          onClick={() => router.back()}
          className="rounded-xl bg-[#F1F5F9] px-5 py-2.5 text-sm font-medium text-[#374151] hover:bg-[#E2E8F0]"
        >
          Kembali
        </button>
      </div>
    )
  }

  if (phase === 'result' && result && quiz) {
    return (
      <ResultScreen
        score={result.score}
        total={quiz.questions.length}
        correct={correctCount}
        xpEarned={result.xpEarned}
        passed={result.passed}
        lessonSlug={null}
        onRetry={handleRetry}
      />
    )
  }

  if (!quiz || !currentQuestion) return null

  const totalQ = quiz.questions.length

  return (
    <div className="mx-auto max-w-2xl">
      {showXpBurst && <XpBurst xp={currentQuestion.points || 10} />}

      {/* Header */}
      <div className="mb-6">
        <div className="mb-3 flex items-center justify-between">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-1.5 text-sm text-[#94A3B8] hover:text-[#64748B] transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Kembali
          </button>
          <div className="flex items-center gap-4">
            {timeLeft !== null && (
              <div
                className={`flex items-center gap-1.5 text-sm font-semibold ${
                  timeLeft <= 10 ? 'text-[#EF4444]' : 'text-[#64748B]'
                }`}
              >
                <Clock className="h-4 w-4" />
                {timeLeft}s
              </div>
            )}
            <span className="text-sm font-medium text-[#94A3B8]">
              {currentIndex + 1} / {totalQ}
            </span>
          </div>
        </div>
        <ProgressBar current={currentIndex + (answer.revealed ? 1 : 0)} total={totalQ} />
      </div>

      {/* Question card */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -40 }}
          transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          {/* Quiz title + difficulty */}
          <div className="mb-4 flex items-center gap-2">
            <span
              className={`rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest ${
                currentQuestion.difficulty === 'advanced'
                  ? 'bg-[#FEE2E2] text-[#DC2626]'
                  : currentQuestion.difficulty === 'intermediate'
                    ? 'bg-[#FEF3C7] text-[#D97706]'
                    : 'bg-[#DCFCE7] text-[#16A34A]'
              }`}
            >
              {currentQuestion.difficulty}
            </span>
            <span className="text-xs text-[#94A3B8]">+{currentQuestion.points} XP</span>
          </div>

          {/* Question text */}
          <div className="mb-6 rounded-2xl border border-[#F1F5F9] bg-white p-6 shadow-sm">
            <p className="text-lg font-semibold leading-relaxed text-[#0F172A]">
              {currentQuestion.question}
            </p>
          </div>

          {/* Options */}
          <div className="space-y-3">
            {currentQuestion.question_options.map((opt) => (
              <OptionButton
                key={opt.id}
                text={opt.option_text}
                selected={answer.selectedOptionId === opt.id}
                revealed={answer.revealed}
                isCorrect={opt.is_correct}
                disabled={answer.revealed}
                onClick={() => handleSelect(opt.id)}
              />
            ))}
          </div>

          {/* Explanation after reveal */}
          <AnimatePresence>
            {answer.revealed && currentQuestion.explanation && (
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className={`mt-5 rounded-2xl border p-4 ${
                  answer.isCorrect
                    ? 'border-[#BBF7D0] bg-[#F0FDF4]'
                    : 'border-[#FECACA] bg-[#FEF2F2]'
                }`}
              >
                <div className="flex items-start gap-2.5">
                  {answer.isCorrect ? (
                    <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-[#22C55E]" />
                  ) : (
                    <XCircle className="mt-0.5 h-4 w-4 shrink-0 text-[#EF4444]" />
                  )}
                  <p className="text-sm leading-relaxed text-[#374151]">
                    {currentQuestion.explanation}
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Action buttons */}
          <div className="mt-6 flex justify-between gap-3">
            {!answer.revealed ? (
              <button
                onClick={() => handleReveal(answer.selectedOptionId)}
                disabled={!answer.selectedOptionId}
                className="ml-auto flex items-center gap-2 rounded-xl bg-[#4F46E5] px-7 py-3 text-sm font-semibold text-white shadow-md shadow-[#4F46E5]/20 transition hover:bg-[#4338CA] disabled:cursor-not-allowed disabled:opacity-40"
              >
                Jawab
                <ChevronRight className="h-4 w-4" />
              </button>
            ) : (
              <button
                onClick={handleNext}
                className="ml-auto flex items-center gap-2 rounded-xl bg-[#4F46E5] px-7 py-3 text-sm font-semibold text-white shadow-md shadow-[#4F46E5]/20 transition hover:bg-[#4338CA]"
              >
                {currentIndex >= totalQ - 1 ? (
                  <>
                    <Trophy className="h-4 w-4" />
                    Selesai
                  </>
                ) : (
                  <>
                    Lanjut
                    <ChevronRight className="h-4 w-4" />
                  </>
                )}
              </button>
            )}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
