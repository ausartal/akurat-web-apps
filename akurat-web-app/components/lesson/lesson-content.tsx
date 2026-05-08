import { Lesson } from '@/features/lesson/services/lesson.service'

interface LessonContentProps {
  lesson: Lesson
  isLoading?: boolean
}

export function LessonContent({
  lesson,
  isLoading = false,
}: LessonContentProps) {
  if (isLoading) {
    return (
      <div className="space-y-4 animate-pulse">
        <div className="h-8 bg-gray-200 rounded-lg w-3/4" />
        <div className="h-64 bg-gray-200 rounded-lg" />
        <div className="space-y-2">
          <div className="h-4 bg-gray-200 rounded" />
          <div className="h-4 bg-gray-200 rounded" />
          <div className="h-4 bg-gray-200 rounded w-5/6" />
        </div>
      </div>
    )
  }

  // Safely extract video_url from metadata
  const videoUrl =
    lesson.metadata &&
    typeof lesson.metadata === 'object' &&
    !Array.isArray(lesson.metadata) &&
    'video_url' in lesson.metadata
      ? (lesson.metadata as Record<string, any>).video_url
      : null

  return (
    <div className="space-y-6">
      {/* Video Section */}
      {videoUrl && typeof videoUrl === 'string' && (
        <div className="rounded-xl overflow-hidden bg-gradient-to-b from-blue-50 to-white border border-blue-100">
          <div className="aspect-video bg-gray-900 flex items-center justify-center">
            <video controls className="w-full h-full" src={videoUrl}>
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
      )}

      {/* Content Section */}
      <div className="prose prose-sm max-w-none">
        <div
          className="rounded-lg border border-gray-200 bg-white p-6 text-gray-700 leading-relaxed"
          dangerouslySetInnerHTML={{ __html: lesson.content || '' }}
        />
      </div>

      {/* Metadata */}
      <div className="mt-8 pt-6 border-t border-gray-200">
        <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
          <div>
            <p className="font-medium text-gray-900">Time to Complete</p>
            <p className="mt-1">{lesson.estimated_minutes} minutes</p>
          </div>
          <div>
            <p className="font-medium text-gray-900">Status</p>
            <p className="mt-1 inline-block px-2 py-1 rounded-full bg-blue-100 text-blue-700 text-xs font-medium">
              {lesson.is_published ? 'Published' : 'Draft'}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
