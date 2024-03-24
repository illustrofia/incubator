import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/")({
  component: Home,
})

function Home() {
  return (
    <div className="container pt-20 text-center">
      <span className="text-2xl">Dome - simple todo app</span>
    </div>
  )
}
