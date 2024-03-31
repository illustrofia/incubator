import { ProtectedRoute } from "@/components"
import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/")({
  component: () => (
    <ProtectedRoute>
      <Todos />
    </ProtectedRoute>
  ),
})

function Todos() {
  return (
    <div className="container pt-20 text-center">
      <span className="text-2xl">Dome - simple todo app</span>
    </div>
  )
}
