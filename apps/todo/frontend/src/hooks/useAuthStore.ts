import { hasAuthToken } from "@/utils"
import { UserSchema } from "@incubator/shared"
import { create } from "zustand"

interface AuthStore {
  isAuthenticated: boolean
  setIsAuthenticated: (isAuthenticated: boolean) => void

  user: UserSchema | null
  setUser: (user: UserSchema | null) => void

  errors: string[] | null
  setErrors: (error: string[] | null) => void
}

export const useAuthStore = create<AuthStore>((set) => ({
  isAuthenticated: hasAuthToken(),
  setIsAuthenticated: (isAuthenticated) => set({ isAuthenticated }),

  user: null,
  setUser: (user) => set({ user }),

  errors: null,
  setErrors: (errors) => set({ errors }),
}))
