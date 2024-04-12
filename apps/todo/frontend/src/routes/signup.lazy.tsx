import { createLazyFileRoute } from "@tanstack/react-router"

import { SignupForm } from "@/components"

export const Route = createLazyFileRoute("/signup")({
  component: SignupForm,
})
