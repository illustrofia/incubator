import { login, logout, register } from "@/api"
import { hasAuthToken } from "@/utils"
import { LoginUserSchema, RegisterUserSchema } from "@incubator/shared"
import { useNavigate, useRouterState } from "@tanstack/react-router"
import { useEffect } from "react"
import { useAuthStore } from "./useAuthStore"

export const useAuth = () => {
  const { user, setUser, isAuthenticated, setIsAuthenticated } = useAuthStore()

  const navigate = useNavigate()
  const { location } = useRouterState()

  useEffect(() => {
    if (!hasAuthToken()) {
      setIsAuthenticated(false)
      return
    }
    setIsAuthenticated(true)
  }, [setIsAuthenticated])

  useEffect(() => {
    if (user && hasAuthToken()) {
      setIsAuthenticated(true)
      if (location.pathname === "/login" || location.pathname === "/signup") {
        navigate({ to: "/tasks" })
      }
      return
    }
  }, [location.pathname, navigate, setIsAuthenticated, user])

  const handleLogin = async (credentials: LoginUserSchema) => {
    try {
      const { user, message } = await login(credentials)
      if (!user) {
        throw new Error(message)
      }
      setUser(user)
    } catch (error) {
      setUser(null)
      return error as Error
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
      return error as Error
    }
  }

  const handleLogout = async () => {
    await logout()
    setUser(null)
    navigate({ to: "/login" })
    setIsAuthenticated(false)
  }

  return {
    user,
    isAuthenticated,
    handleLogin,
    handleRegister,
    handleLogout,
  }
}
