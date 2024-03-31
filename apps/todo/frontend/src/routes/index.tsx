import { ProtectedRoute, Todos } from "@/components"
import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/")({
  component: () => (
    <ProtectedRoute>
      <Todos />
    </ProtectedRoute>
  ),
})
