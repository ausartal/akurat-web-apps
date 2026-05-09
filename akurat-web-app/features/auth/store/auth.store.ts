import { create } from 'zustand'

type AuthState = {
  user: any | null
  loading: boolean

  setUser: (user: any | null) => void
  setLoading: (loading: boolean) => void
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,

  loading: true,

  setUser: (user) => set({ user }),

  setLoading: (loading) => set({ loading }),
}))

