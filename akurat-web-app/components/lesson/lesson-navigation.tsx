import Link from 'next/link'
import { Lesson } from '@/features/lesson/services/lesson.service'

interface LessonNavigationProps {
  nextLesson: Lesson | null
  previousLesson: Lesson | null
}

export function LessonNavigation({
  nextLesson,
  previousLesson,
}: LessonNavigationProps) {
  return (
    <div className="mt-12 pt-8 border-t border-gray-200 grid grid-cols-2 gap-4">
      {/* Previous Lesson */}
      {previousLesson ? (
        <Link
          href={`/dashboard/lessons/${previousLesson.slug}`}
          className="group p-4 rounded-lg border border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-all"
        >
          <p className="text-xs text-gray-600 mb-2">← Previous Lesson</p>
          <p className="font-medium text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-2">
            {previousLesson.title}
          </p>
        </Link>
      ) : (
        <div className="p-4 rounded-lg border border-gray-200 bg-gray-50 opacity-50">
          <p className="text-xs text-gray-600 mb-2">← Previous Lesson</p>
          <p className="font-medium text-gray-500">No previous lesson</p>
        </div>
      )}

      {/* Next Lesson */}
      {nextLesson ? (
        <Link
          href={`/dashboard/lessons/${nextLesson.slug}`}
          className="group p-4 rounded-lg border border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-all text-right"
        >
          <p className="text-xs text-gray-600 mb-2">Next Lesson →</p>
          <p className="font-medium text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-2">
            {nextLesson.title}
          </p>
        </Link>
      ) : (
        <div className="p-4 rounded-lg border border-gray-200 bg-gray-50 opacity-50 text-right">
          <p className="text-xs text-gray-600 mb-2">Next Lesson →</p>
          <p className="font-medium text-gray-500">No next lesson</p>
        </div>
      )}
    </div>
  )
}

