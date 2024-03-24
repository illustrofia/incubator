import { AuthForm } from "@/components"
import { createLazyFileRoute } from "@tanstack/react-router"

export const Route = createLazyFileRoute("/_auth/login")({
  component: () => <AuthForm action="login" />,
})
