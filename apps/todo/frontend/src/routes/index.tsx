import { createFileRoute } from "@tanstack/react-router"

import { ProtectedRoute, TodoList } from "@/components"

export const Route = createFileRoute("/")({
  component: () => (
    <ProtectedRoute>
      <TodoList />
    </ProtectedRoute>
  ),
})
