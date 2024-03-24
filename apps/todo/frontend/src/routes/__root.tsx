import { Button } from "@/components"
import { ModeToggle } from "@/components/mode-toggle"
import { useAuth } from "@/hooks"
import { ThemeProvider } from "@/providers/theme-provider"
import {
  Link,
  Outlet,
  createRootRouteWithContext,
} from "@tanstack/react-router"
import { CheckCircle } from "lucide-react"

interface RouterContext {
  isAuthenticated: boolean
}

export const Route = createRootRouteWithContext<RouterContext>()({
  component: () => (
    <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
      <div className="text-foreground min-h-screen w-full">
        <TopBar />
        <Outlet />
      </div>
    </ThemeProvider>
  ),
})

function TopBar() {
  const { isAuthenticated } = useAuth()
  const { handleLogout } = useAuth()
  return (
    <div className="border-b-border flex w-full items-center justify-between border-b px-6 py-4">
      <div className="container flex items-center gap-8">
        <Link to="/" className="flex items-center gap-4">
          <CheckCircle size={24} />
          <span className="text-xl font-light tracking-wider">Dome</span>
        </Link>

        <div className="ml-auto flex items-center gap-8">
          {!isAuthenticated && (
            <>
              <Link to="/login" className="text-lg [&.active]:font-bold">
                Log in
              </Link>
              <Link to="/signup" className="text-lg [&.active]:font-bold">
                Sign up
              </Link>
            </>
          )}
          {isAuthenticated && (
            <Button
              className="text-lg"
              variant={"ghost"}
              onClick={handleLogout}
            >
              Log out
            </Button>
          )}

          <ModeToggle />
        </div>
      </div>
    </div>
  )
}
