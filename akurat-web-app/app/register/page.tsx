'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

import { signUp } from '@/features/auth/services/auth.service'

export default function RegisterPage() {
  const router = useRouter()

  const [full_name, setFullName] = useState('')

  const [email, setEmail] = useState('')

  const [password, setPassword] = useState('')

  const [loading, setLoading] = useState(false)

  async function handleRegister(
    e: React.FormEvent
  ) {
    e.preventDefault()

    setLoading(true)

    const { error } = await signUp({
      full_name,
      email,
      password,
    })

    setLoading(false)

    if (error) {
      alert(error.message)
      return
    }

    router.push('/dashboard')
  }

  return (
    <div className='flex min-h-screen items-center justify-center'>
      <form
        onSubmit={handleRegister}
        className='flex w-full max-w-sm flex-col gap-4'
      >
        <h1 className='text-2xl font-bold'>
          Register
        </h1>

        <input
          type='text'
          placeholder='Full Name'
          value={full_name}
          onChange={(e) =>
            setFullName(e.target.value)
          }
          className='border p-3 rounded'
        />

        <input
          type='email'
          placeholder='Email'
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
          className='border p-3 rounded'
        />

        <input
          type='password'
          placeholder='Password'
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
          className='border p-3 rounded'
        />

        <button
          type='submit'
          disabled={loading}
          className='bg-blue-600 text-white p-3 rounded'
        >
          {loading
            ? 'Loading...'
            : 'Register'}
        </button>
      </form>
    </div>
  )
}
