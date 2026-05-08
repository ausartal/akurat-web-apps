import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { createClient as createServerClient } from '@/lib/supabase/server'
import {
  getLessonBySlug,
  getLessonProgress,
  getNextLesson,
  getPreviousLesson,
} from '@/features/lesson/services/lesson.service'
import { LessonContent } from '@/components/lesson/lesson-content'
import { LessonSidebar } from '@/components/lesson/lesson-sidebar'
import { LessonNavigation } from '@/components/lesson/lesson-navigation'

type LessonPageProps = {
  params: Promise<{
    slug: string
  }>
}

export async function generateMetadata({
  params,
}: LessonPageProps): Promise<Metadata> {
  const { slug } = await params
  const lesson = await getLessonBySlug(slug)

  if (!lesson) {
    return {
      title: 'Lesson Not Found',
    }
  }

  return {
    title: `${lesson.title} - AKURAT Chemistry Learning`,
    description: lesson.content?.slice(0, 160) || 'Learn chemistry with AKURAT',
  }
}

export default async function LessonPage({ params }: LessonPageProps) {
  const { slug } = await params

  // Fetch lesson data
  const lesson = await getLessonBySlug(slug)

  if (!lesson) {
    notFound()
  }

  // Get current user
  const supabase = await createServerClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    notFound()
  }

  // Fetch user's progress on this lesson
  const progress = await getLessonProgress(lesson.id, user.id)
  const isCompleted = progress?.is_completed || false

  // Fetch next and previous lessons
  const [nextLesson, previousLesson] = await Promise.all([
    getNextLesson(lesson.module_id, lesson.order_index),
    getPreviousLesson(lesson.module_id, lesson.order_index),
  ])

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-4xl font-bold text-gray-900">{lesson.title}</h1>
        {lesson.module && (
          <p className="text-gray-600">
            Module: <span className="font-medium">{lesson.module.title}</span>
          </p>
        )}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content - 2 cols on desktop, full width on mobile */}
        <div className="lg:col-span-2">
          <LessonContent lesson={lesson} />
          <LessonNavigation nextLesson={nextLesson} previousLesson={previousLesson} />
        </div>

        {/* Sidebar - Full width on mobile, sticky on desktop */}
        <div className="lg:col-span-1">
          <LessonSidebar
            lesson={lesson}
            module={lesson.module as any}
            isCompleted={isCompleted}
            userId={user.id}
          />
        </div>
      </div>
    </div>
  )
}
