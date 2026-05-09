import { createClient } from '@/lib/supabase/client'

const supabase = createClient()

export async function getMyProfile() {
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) return null

  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single()

  if (error) {
    console.error(error)
    return null
  }

  return data
}

