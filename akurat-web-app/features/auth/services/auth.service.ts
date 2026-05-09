import { createClient } from '@/lib/supabase/client'

import type {
  LoginInput,
  RegisterInput,
} from '../validations/auth.validation'

const supabase = createClient()

export async function signUp(data: RegisterInput) {
  const response = await supabase.auth.signUp({
    email: data.email,
    password: data.password,

    options: {
      data: {
        full_name: data.full_name,
      },
    },
  })

  return response
}

export async function signIn(data: LoginInput) {
  const response = await supabase.auth.signInWithPassword({
    email: data.email,
    password: data.password,
  })

  return response
}

export async function signOut() {
  return await supabase.auth.signOut()
}

export async function getCurrentUser() {
  const {
    data: { user },
  } = await supabase.auth.getUser()

  return user
}

