import { SignupForm } from "@/components"
import { createLazyFileRoute } from "@tanstack/react-router"

export const Route = createLazyFileRoute("/signup/")({
  component: SignupForm,
})
