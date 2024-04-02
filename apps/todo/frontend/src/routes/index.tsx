import { ProtectedRoute, TodoList } from "@/components"
import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/")({
  component: () => (
    <ProtectedRoute>
      <TodoList />
    </ProtectedRoute>
  ),
})
