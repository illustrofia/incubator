import { LoginForm } from "@/components/login-form"
import { createLazyFileRoute } from "@tanstack/react-router"

export const Route = createLazyFileRoute("/login/")({
  component: LoginForm,
})
