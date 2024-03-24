import { login, logout, register } from "@/api"
import {
  LoginUserSchema,
  RegisterUserSchema,
  UserSchema,
} from "@incubator/shared"
import Cookies from "js-cookie"
import { useEffect } from "react"
import { create } from "zustand"

const hasAuthToken = () => !!Cookies.get("hasAuthToken")

interface AuthStore {
  isAuthenticated: boolean
  setIsAuthenticated: (isAuthenticated: boolean) => void

  user: UserSchema | null
  setUser: (user: UserSchema | null) => void

  errors: string[] | null
  setErrors: (error: string[] | null) => void
}

const useAuthStore = create<AuthStore>((set) => ({
  isAuthenticated: hasAuthToken(),
  setIsAuthenticated: (isAuthenticated) => set({ isAuthenticated }),

  user: null,
  setUser: (user) => set({ user }),

  errors: null,
  setErrors: (errors) => set({ errors }),
}))

export const useAuth = () => {
  const {
    isAuthenticated,
    setIsAuthenticated,
    user,
    setUser,
    errors,
    setErrors,
  } = useAuthStore()

  useEffect(() => {
    if (!hasAuthToken()) {
      setIsAuthenticated(false)
      return
    }
    setIsAuthenticated(true)
  }, [setIsAuthenticated])

  const handleLogin = async (credentials: LoginUserSchema) => {
    try {
      const { user, message } = await login(credentials)
      if (!user) {
        throw new Error(message)
      }
      setUser(user)
    } catch (error) {
      setUser(null)
      setErrors([(error as Error).message])
    }
  }

  const handleRegister = async (credentials: RegisterUserSchema) => {
    try {
      const { user, message } = await register(credentials)
      if (!user) {
        throw new Error(message)
      }
      setUser(user)
    } catch (error) {
      setUser(null)
      setErrors([(error as Error).message])
    }
  }

  const handleLogout = async () => {
    await logout()
    setUser(null)
  }

  return {
    isAuthenticated,
    user,
    errors,
    handleLogin,
    handleRegister,
    handleLogout,
  }
}
