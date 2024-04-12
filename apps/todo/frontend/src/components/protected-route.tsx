import { useNavigate } from "@tanstack/react-router"
import { PropsWithChildren, useEffect } from "react"

import { useAuth } from "@/hooks"

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
