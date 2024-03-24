import { AuthForm } from "@/components"
import { createLazyFileRoute } from "@tanstack/react-router"

export const Route = createLazyFileRoute("/_auth/signup")({
  component: () => <AuthForm action="signup" />,
})
