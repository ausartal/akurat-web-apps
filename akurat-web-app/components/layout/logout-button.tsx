'use client'

import { useRouter } from 'next/navigation'

import { signOut } from '@/features/auth/services/auth.service'

export default function LogoutButton() {
  const router = useRouter()

  async function handleLogout() {
    await signOut()

    router.push('/login')

    router.refresh()
  }

  return (
    <button
      onClick={handleLogout}
      className='rounded-lg bg-red-500 px-4 py-2 text-white'
    >
      Logout
    </button>
  )
}
