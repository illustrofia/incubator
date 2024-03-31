import { TopBar } from "@/components"
import { Outlet, createRootRoute } from "@tanstack/react-router"

export const Route = createRootRoute({
  component: () => (
    <div className="text-foreground min-h-screen w-full">
      <TopBar />
      <Outlet />
    </div>
  ),
})
