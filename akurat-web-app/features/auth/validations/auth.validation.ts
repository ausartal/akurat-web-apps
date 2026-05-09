import { z } from 'zod'

export const loginSchema = z.object({
  email: z.email(),
  password: z.string().min(6),
})

export const registerSchema = z.object({
  full_name: z.string().min(3),

  email: z.email(),

  password: z.string().min(6),
})

export type LoginInput = z.infer<typeof loginSchema>

export type RegisterInput = z.infer<typeof registerSchema>

