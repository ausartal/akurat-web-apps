import { createClient } from '@/lib/supabase/client'

const supabase = createClient()

export async function getCourses() {
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
