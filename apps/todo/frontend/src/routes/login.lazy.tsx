import { createLazyFileRoute } from "@tanstack/react-router"

import { LoginForm } from "@/components/auth/login-form"

export const Route = createLazyFileRoute("/login")({
  component: LoginForm,
})
