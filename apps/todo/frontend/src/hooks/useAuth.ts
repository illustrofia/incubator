import { getMe, login, logout, register } from "@/api"
import { hasAuthToken } from "@/utils"
import { LoginUserSchema, RegisterUserSchema } from "@incubator/shared"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import { useNavigate, useRouterState } from "@tanstack/react-router"
import { useEffect } from "react"
import { useAuthStore } from "./useAuthStore"

export const useAuth = () => {
  const { isAuthenticated, setIsAuthenticated } = useAuthStore()

  const navigate = useNavigate()
  const { location } = useRouterState()

  const queryClient = useQueryClient()

  const { data: user, isError } = useQuery({
    queryKey: ["me"],
    queryFn: getMe,
    retry: false,
    enabled: hasAuthToken(),
  })
  useEffect(() => {
    if (isError) {
      queryClient.clear()
      setIsAuthenticated(false)
      navigate({ to: "/login" })
    }
  }, [isError, navigate, queryClient, setIsAuthenticated])

  useEffect(() => {
    if (user && hasAuthToken()) {
      setIsAuthenticated(true)
      if (location.pathname === "/login" || location.pathname === "/signup") {
        navigate({ to: "/tasks" })
      }
      return
    }

    setIsAuthenticated(false)
  }, [location.pathname, navigate, setIsAuthenticated, user])

  const handleLogin = async (credentials: LoginUserSchema) => {
    try {
      const { user, message } = await login(credentials)
      if (!user) {
        throw new Error(message)
      }
      queryClient.setQueryData(["me"], user)
    } catch (error) {
      queryClient.invalidateQueries({ queryKey: ["me"] })
      return error as Error
    }
  }

  const handleRegister = async (credentials: RegisterUserSchema) => {
    try {
      const { user, message } = await register(credentials)
      if (!user) {
        throw new Error(message)
      }
      queryClient.setQueryData(["me"], user)
    } catch (error) {
      queryClient.invalidateQueries({ queryKey: ["me"] })
      return error as Error
    }
  }

  const handleLogout = async () => {
    await logout()
    navigate({ to: "/login" })
    setIsAuthenticated(false)
    queryClient.clear()
  }

  return {
    user,
    isAuthenticated,
    handleLogin,
    handleRegister,
    handleLogout,
  }
}
