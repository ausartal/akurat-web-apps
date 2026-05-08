import { useState } from 'react'

export function useCompleteLessonAction() {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const completeLesson = async (
    lessonId: string,
    userId: string,
    xpReward?: number
  ) => {
    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch('/api/lessons/complete', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          lessonId,
          userId,
          xpReward,
        }),
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || 'Failed to complete lesson')
      }

      const data = await response.json()
      return { success: true, data }
    } catch (err) {
      const message = err instanceof Error ? err.message : 'An error occurred'
      setError(message)
      return { success: false, error: message }
    } finally {
      setIsLoading(false)
    }
  }

  return { completeLesson, isLoading, error }
}
