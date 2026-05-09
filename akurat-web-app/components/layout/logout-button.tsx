'use client'

import { useRouter } from 'next/navigation'
import { LogOut } from 'lucide-react'
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
      className="flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-medium text-[#EF4444] transition-colors hover:bg-[#FEF2F2]"
    >
      <LogOut className="h-4 w-4" />
      Logout
    </button>
  )
}
