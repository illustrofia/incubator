import { Button, Skeleton } from "@/components"
import { ModeToggle } from "@/components/mode-toggle"
import { useAuth } from "@/hooks"
import { Link } from "@tanstack/react-router"
import { CheckCircle } from "lucide-react"

export const TopBar = () => {
  const { isAuthenticated, isLoadingAuth } = useAuth()
  const { handleLogout } = useAuth()
  return (
    <div className="border-b-border flex w-full items-center justify-between border-b px-6 py-4">
      <div className="container flex items-center gap-8">
        <Link
          to="/"
          disabled={!isAuthenticated}
          className="flex items-center gap-4"
        >
          <CheckCircle size={24} />
          <span className="text-xl font-light tracking-wider">Dome</span>
        </Link>

        <div className="ml-auto flex items-center gap-8">
          {isLoadingAuth && <Skeleton className="h-10 w-24 rounded-lg" />}

          {!isLoadingAuth && !isAuthenticated && (
            <>
              <Link to="/login" className="text-lg">
                Log in
              </Link>
            </>
          )}

          {!isLoadingAuth && isAuthenticated && (
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
