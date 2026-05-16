import { createClient } from '@/lib/supabase/client'
import type { Tables } from '@/src/types/database'

const supabase = createClient()

export type Profile = Tables<'profiles'>

export async function getMyProfile(): Promise<Profile | null> {
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

