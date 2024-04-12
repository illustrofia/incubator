import { createRootRoute, Outlet } from "@tanstack/react-router"

import { Footer, Header, Toaster } from "@/components"

export const Route = createRootRoute({
  component: () => (
    <div className="text-foreground flex min-h-screen w-full flex-col">
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <Toaster />
    </div>
  ),
})
