import { createClient } from '@/lib/supabase/client'
import type { Tables } from '@/src/types/database'

const supabase = createClient()

export type Quiz = Tables<'quizzes'>
export type Question = Tables<'questions'>
export type QuestionOption = Tables<'question_options'>
export type QuizAttempt = Tables<'quiz_attempts'>

// Partial type for options as returned by Supabase nested select
export type QuestionOptionPartial = Omit<QuestionOption, 'question_id'> & {
  question_id?: string
}

export interface QuestionWithOptions extends Question {
  question_options: QuestionOptionPartial[]
}

export interface QuizWithQuestions extends Quiz {
  questions: QuestionWithOptions[]
}

// Fetch quiz with all questions and options for a lesson
export async function getQuizByLessonId(
  lessonId: string
): Promise<QuizWithQuestions | null> {
  const { data, error } = await supabase
    .from('quizzes')
    .select(
      `
      *,
      questions (
        *,
        question_options (
          id,
          option_text,
          is_correct,
          order_index
        )
      )
    `
    )
    .eq('lesson_id', lessonId)
    .is('deleted_at', null)
    .order('order_index', { referencedTable: 'questions', ascending: true })
    .single()

  if (error) {
    if (error.code !== 'PGRST116') {
      console.error('Error fetching quiz:', error)
    }
    return null
  }

  // Sort question options by order_index
  if (data?.questions) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ;(data.questions as any[]).forEach((q) => {
      q.question_options?.sort(
        (a: { order_index: number }, b: { order_index: number }) =>
          a.order_index - b.order_index
      )
    })
  }

  return data as QuizWithQuestions
}

// Fetch quiz by quiz ID directly
export async function getQuizById(
  quizId: string
): Promise<QuizWithQuestions | null> {
  const { data, error } = await supabase
    .from('quizzes')
    .select(
      `
      *,
      questions (
        *,
        question_options (
          id,
          option_text,
          is_correct,
          order_index
        )
      )
    `
    )
    .eq('id', quizId)
    .is('deleted_at', null)
    .single()

  if (error) {
    console.error('Error fetching quiz by id:', error)
    return null
  }

  if (data?.questions) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ;(data.questions as any[]).forEach((q) => {
      q.question_options?.sort(
        (a: { order_index: number }, b: { order_index: number }) =>
          a.order_index - b.order_index
      )
    })
  }

  return data as QuizWithQuestions
}

// Create a new quiz attempt
export async function createQuizAttempt(
  quizId: string,
  userId: string
): Promise<QuizAttempt | null> {
  const { data, error } = await supabase
    .from('quiz_attempts')
    .insert({
      quiz_id: quizId,
      user_id: userId,
      score: 0,
      is_passed: false,
    })
    .select()
    .single()

  if (error) {
    console.error('Error creating quiz attempt:', error)
    return null
  }

  return data
}

// Submit answer for a question
export async function submitAnswer(
  attemptId: string,
  questionId: string,
  selectedOptionId: string,
  isCorrect: boolean
): Promise<boolean> {
  const { error } = await supabase.from('quiz_answers').insert({
    attempt_id: attemptId,
    question_id: questionId,
    selected_option_id: selectedOptionId,
    is_correct: isCorrect,
  })

  if (error) {
    console.error('Error submitting answer:', error)
    return false
  }

  return true
}

// Complete a quiz attempt: update score, xp on profile
export async function completeQuizAttempt(
  attemptId: string,
  quizId: string,
  userId: string,
  correctCount: number,
  totalCount: number,
  passingScore: number,
  xpReward: number
): Promise<{ score: number; passed: boolean; xpEarned: number } | null> {
  const score = totalCount > 0 ? Math.round((correctCount / totalCount) * 100) : 0
  const passed = score >= passingScore
  const xpEarned = passed ? xpReward : Math.round(xpReward * 0.3)

  // Update attempt
  const { error: attemptError } = await supabase
    .from('quiz_attempts')
    .update({
      score,
      is_passed: passed,
      completed_at: new Date().toISOString(),
    })
    .eq('id', attemptId)

  if (attemptError) {
    console.error('Error completing quiz attempt:', attemptError)
    return null
  }

  // Increment XP directly on profile

  // Fallback: direct XP increment
  const { data: profile } = await supabase
    .from('profiles')
    .select('xp')
    .eq('id', userId)
    .single()

  if (profile) {
    await supabase
      .from('profiles')
      .update({ xp: (profile.xp || 0) + xpEarned })
      .eq('id', userId)
  }

  // Log XP transaction
  await supabase.from('xp_transactions').insert({
    user_id: userId,
    amount: xpEarned,
    reason: `Quiz completed: score ${score}%`,
  })

  return { score, passed, xpEarned }
}

// Get user's best attempt for a quiz
export async function getBestQuizAttempt(
  quizId: string,
  userId: string
): Promise<QuizAttempt | null> {
  const { data, error } = await supabase
    .from('quiz_attempts')
    .select('*')
    .eq('quiz_id', quizId)
    .eq('user_id', userId)
    .not('completed_at', 'is', null)
    .order('score', { ascending: false })
    .limit(1)
    .single()

  if (error && error.code !== 'PGRST116') {
    console.error('Error fetching best attempt:', error)
  }

  return data || null
}
