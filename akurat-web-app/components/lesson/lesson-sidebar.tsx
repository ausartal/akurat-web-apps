'use client'

import { useState } from 'react'
import { Lesson, Module } from '@/features/lesson/services/lesson.service'
import { useCompleteLessonAction } from '@/features/lesson/hooks/useCompleteLessonAction'
import { Button } from '@/components/ui/button'

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
  const [showSuccess, setShowSuccess] = useState(false)

  const handleComplete = async () => {
    const result = await completeLesson(lesson.id, userId, 50)
    if (result.success) {
      setShowSuccess(true)
      setTimeout(() => setShowSuccess(false), 3000)
      onLessonCompleted?.()
    }
  }

  return (
    <div className="sticky top-24 space-y-6">
      {/* Progress Card */}
      <div className="rounded-xl bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200 p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-lg bg-blue-600 text-white flex items-center justify-center font-bold">
            {lesson.order_index}
          </div>
          <div>
            <p className="text-xs font-medium text-blue-700 uppercase tracking-wide">
              Lesson
            </p>
            <p className="text-sm font-semibold text-gray-900">{lesson.title}</p>
          </div>
        </div>

        {/* Progress Indicator */}
        <div className="mt-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-medium text-gray-700">Progress</span>
            <span className="text-xs font-bold text-blue-600">
              {isCompleted ? '100%' : '0%'}
            </span>
          </div>
          <div className="w-full h-2 bg-blue-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-blue-600 transition-all duration-300"
              style={{ width: isCompleted ? '100%' : '0%' }}
            />
          </div>
        </div>
      </div>

      {/* Module Info */}
      {module && (
        <div className="rounded-lg border border-gray-200 bg-white p-4">
          <p className="text-xs font-medium text-gray-600 uppercase mb-2">
            Module
          </p>
          <p className="font-semibold text-gray-900">{module.title}</p>
          {module.description && (
            <p className="text-sm text-gray-600 mt-2">{module.description}</p>
          )}
        </div>
      )}

      {/* Stats */}
      <div className="rounded-lg border border-gray-200 bg-white p-4 space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600">Duration</span>
          <span className="font-medium text-gray-900">
            {lesson.estimated_minutes} min
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600">XP Reward</span>
          <span className="font-medium text-blue-600 text-lg">+50</span>
        </div>
      </div>

      {/* Complete Button */}
      <div className="space-y-3">
        {isCompleted ? (
          <div className="rounded-lg bg-green-50 border border-green-200 p-4 text-center">
            <p className="text-sm font-medium text-green-700">✓ Completed</p>
            <p className="text-xs text-green-600 mt-1">
              You've earned 50 XP
            </p>
          </div>
        ) : (
          <Button
            onClick={handleComplete}
            disabled={isLoading || isCompleted}
            className="w-full"
            variant="default"
            size="lg"
          >
            {isLoading ? 'Completing...' : 'Complete Lesson'}
          </Button>
        )}

        {error && (
          <div className="rounded-lg bg-red-50 border border-red-200 p-3 text-sm text-red-700">
            {error}
          </div>
        )}

        {showSuccess && (
          <div className="rounded-lg bg-green-50 border border-green-200 p-3 text-sm text-green-700 animate-fade-in">
            ✓ Lesson completed! +50 XP earned
          </div>
        )}
      </div>

      {/* Info */}
      <div className="rounded-lg bg-blue-50 border border-blue-200 p-4">
        <p className="text-xs text-blue-700 leading-relaxed">
          Complete this lesson to earn XP and progress through the module. Each completed lesson increases your streak!
        </p>
      </div>
    </div>
  )
}
