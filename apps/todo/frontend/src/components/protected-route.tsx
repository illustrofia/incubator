import { useAuth } from "@/hooks"
import { useNavigate } from "@tanstack/react-router"
import { PropsWithChildren, useEffect } from "react"

export const ProtectedRoute = ({ children }: PropsWithChildren) => {
  const { isAuthenticated, isLoadingAuth } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (isLoadingAuth) {
      return
    }

    if (!isAuthenticated) {
      navigate({ to: "/login" })
    }
  }, [isAuthenticated, isLoadingAuth, navigate])

  return <>{children}</>
}
