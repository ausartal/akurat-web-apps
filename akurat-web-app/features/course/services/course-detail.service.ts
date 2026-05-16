import { createClient } from '@/lib/supabase/client'
import type { Tables } from '@/src/types/database'

const supabase = createClient()

export type CourseLesson = Tables<'lessons'>
export type CourseModule = Tables<'modules'> & {
  lessons: CourseLesson[]
}
export type CourseDetail = Tables<'courses'> & {
  modules: CourseModule[]
}

export async function getCourseBySlug(slug: string): Promise<CourseDetail | null> {
  const { data, error } = await supabase
    .from('courses')
    .select(`
      *,
      modules (
        *,
        lessons (*)
      )
    `)
    .eq('slug', slug)
    .single()

  if (error) {
    console.error(error)
    return null
  }

  return data as CourseDetail
}

