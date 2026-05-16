import { createClient } from '@/lib/supabase/client'
import type { Tables } from '@/src/types/database'

const supabase = createClient()

export type Course = Tables<'courses'>

export async function getCourses(): Promise<Course[]> {
  const { data, error } = await supabase
    .from('courses')
    .select('*')
    .eq('is_published', true)
    .order('created_at', {
      ascending: false,
    })

  if (error) {
    console.error(error)

    return []
  }

  return data
}

