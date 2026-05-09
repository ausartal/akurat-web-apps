import type { Metadata } from 'next'
import { QuizContainer } from '@/components/quiz/quiz-container'

interface QuizPageProps {
  params: Promise<{ quizId: string }>
}

export async function generateMetadata({ params }: QuizPageProps): Promise<Metadata> {
  const { quizId } = await params
  return {
    title: `Quiz — AKURAT`,
    description: `Take a quiz on AKURAT chemistry platform`,
  }
}

export default async function QuizPage({ params }: QuizPageProps) {
  const { quizId } = await params

  return (
    <div className="min-h-screen bg-[#F8FAFC] py-10 px-4">
      <div className="mx-auto max-w-2xl">
        <QuizContainer quizId={quizId} />
      </div>
    </div>
  )
}
