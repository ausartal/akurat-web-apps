import { createClient } from '@/lib/supabase/client'
import type { Database, Tables } from '@/src/types/database'

const supabase = createClient()

export type Lesson = Tables<'lessons'>
export type LessonProgress = Tables<'lesson_progress'>
export type Module = Tables<'modules'>

interface LessonDetail extends Lesson {
  module?: Module
}

export async function getLessonBySlug(
  slug: string
): Promise<LessonDetail | null> {
  const { data, error } = await supabase
    .from('lessons')
    .select(
      `
      *,
      module:modules (
        id,
        title,
        slug,
        course_id,
        description,
        order_index
      )
    `
    )
    .eq('slug', slug)
    .single()

  if (error) {
    console.error('Error fetching lesson:', error)
    return null
  }

  return data as LessonDetail
}

export async function getLessonProgress(
  lessonId: string,
  userId: string
): Promise<LessonProgress | null> {
  const { data, error } = await supabase
    .from('lesson_progress')
    .select('*')
    .eq('lesson_id', lessonId)
    .eq('user_id', userId)
    .single()

  if (error && error.code !== 'PGRST116') {
    console.error('Error fetching lesson progress:', error)
  }

  return data || null
}

export async function getNextLesson(
  moduleId: string,
  currentOrderIndex: number
): Promise<Lesson | null> {
  const { data, error } = await supabase
    .from('lessons')
    .select('*')
    .eq('module_id', moduleId)
    .eq('is_published', true)
    .gt('order_index', currentOrderIndex)
    .order('order_index', { ascending: true })
    .limit(1)
    .single()

  if (error && error.code !== 'PGRST116') {
    console.error('Error fetching next lesson:', error)
  }

  return data || null
}

export async function getPreviousLesson(
  moduleId: string,
  currentOrderIndex: number
): Promise<Lesson | null> {
  const { data, error } = await supabase
    .from('lessons')
    .select('*')
    .eq('module_id', moduleId)
    .eq('is_published', true)
    .lt('order_index', currentOrderIndex)
    .order('order_index', { ascending: false })
    .limit(1)
    .single()

  if (error && error.code !== 'PGRST116') {
    console.error('Error fetching previous lesson:', error)
  }

  return data || null
}

export async function completeLesson(
  lessonId: string,
  userId: string,
  xpReward: number = 50
): Promise<{ success: boolean; error?: string }> {
  try {
    // Upsert lesson progress
    const { error: progressError } = await supabase
      .from('lesson_progress')
      .upsert(
        {
          lesson_id: lessonId,
          user_id: userId,
          is_completed: true,
          progress_percent: 100,
          completed_at: new Date().toISOString(),
        },
        { onConflict: 'lesson_id,user_id' }
      )

    if (progressError) {
      console.error('Error updating lesson progress:', progressError)
      return { success: false, error: 'Failed to mark lesson as completed' }
    }

    return { success: true }
  } catch (error) {
    console.error('Error completing lesson:', error)
    return { success: false, error: 'An unexpected error occurred' }
  }
}

