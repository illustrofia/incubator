import { UserLoginSchema, UserSignupSchema } from "@incubator/shared"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import { useNavigate, useRouterState } from "@tanstack/react-router"
import Cookies from "js-cookie"
import { useEffect, useMemo } from "react"

import { getMe, login, logout, queryKeys, signup } from "@/api"
import { useToast } from "@/components"

const hasAuthToken = () => !!Cookies.get("hasAuthToken")

export const useAuth = () => {
  const queryClient = useQueryClient()
  const { location } = useRouterState()
  const navigate = useNavigate()
  const { toast } = useToast()

  const user = useQuery({
    queryKey: queryKeys.me,
    queryFn: getMe,
    enabled: hasAuthToken(),
  })

  useEffect(() => {
    if (!user.isError) {
      return
    }
    if (hasAuthToken()) {
      Cookies.remove("hasAuthToken")
      // only clear the cache once. Otherwise, react-query will keep trying to fetch the user
      queryClient.clear()
    }
    navigate({ to: "/login" })
    toast({ description: "Please login." })
  }, [navigate, queryClient, toast, user.isError])

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
      toast({ description: "Logged in." })
    }
  }, [isAuthenticated, location.href, navigate, toast])

  const handleLogin = async (credentials: UserLoginSchema) => {
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

  const handleSignup = async (credentials: UserSignupSchema) => {
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
    toast({ description: "Logged out." })
  }

  return {
    isAuthenticated,
    isLoadingAuth: user.isLoading,
    handleLogin,
    handleSignup,
    handleLogout,
  }
}
