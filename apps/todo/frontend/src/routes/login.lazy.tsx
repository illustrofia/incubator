import { createLazyFileRoute } from "@tanstack/react-router"

import { LoginForm } from "@/components/login-form"

export const Route = createLazyFileRoute("/login")({
  component: LoginForm,
})
