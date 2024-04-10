import { Footer, Header } from "@/components"
import { Outlet, createRootRoute } from "@tanstack/react-router"

export const Route = createRootRoute({
  component: () => (
    <div className="text-foreground flex min-h-screen w-full flex-col">
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  ),
})
