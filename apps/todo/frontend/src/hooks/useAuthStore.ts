import { hasAuthToken } from "@/utils"
import { create } from "zustand"

interface AuthStore {
  isAuthenticated: boolean
  setIsAuthenticated: (isAuthenticated: boolean) => void
}

export const useAuthStore = create<AuthStore>((set) => ({
  isAuthenticated: hasAuthToken(),
  setIsAuthenticated: (isAuthenticated) => set({ isAuthenticated }),
}))
