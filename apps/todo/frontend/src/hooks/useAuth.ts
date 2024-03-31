import { getMe, login, logout, queryKeys, signup } from "@/api"
import { hasAuthToken } from "@/utils"
import { LoginUserSchema, RegisterUserSchema } from "@incubator/shared"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import { useNavigate, useRouterState } from "@tanstack/react-router"
import { useEffect, useMemo } from "react"

export const useAuth = () => {
  const queryClient = useQueryClient()
  const { location } = useRouterState()
  const navigate = useNavigate()

  const user = useQuery({
    queryKey: queryKeys.me,
    queryFn: getMe,
    retry: false,
    enabled: hasAuthToken(),
  })

  useEffect(() => {
    if (user.isError) {
      queryClient.clear()
      navigate({ to: "/login" })
    }
  }, [navigate, queryClient, user.isError])

  const isAuthenticated = useMemo(
    () => !!user.data && hasAuthToken(),
    [user.data],
  )

  useEffect(() => {
    if (
      isAuthenticated &&
      (location.href === "/login" || location.href === "/signup")
    ) {
      navigate({ to: "/" })
    }
  }, [isAuthenticated, location.href, navigate])

  const handleLogin = async (credentials: LoginUserSchema) => {
    try {
      const { user, message } = await login(credentials)
      if (!user) {
        throw new Error(message)
      }
      queryClient.setQueryData(queryKeys.me, user)
    } catch (error) {
      return error as Error
    }
  }

  const handleSignup = async (credentials: RegisterUserSchema) => {
    try {
      const { user, message } = await signup(credentials)
      if (!user) {
        throw new Error(message)
      }
      queryClient.setQueryData(queryKeys.me, user)
    } catch (error) {
      return error as Error
    }
  }

  const handleLogout = async () => {
    await logout()
    queryClient.clear()
    navigate({ to: "/login" })
  }

  return {
    isAuthenticated,
    isLoadingAuth: user.isLoading,
    handleLogin,
    handleSignup,
    handleLogout,
  }
}
