import { Button, Skeleton } from "@incubator/design-system"
import { CheckCircle } from "lucide-react"

import { useAuth } from "@/api"
import { ModeToggle } from "@/components/mode-toggle"

export const Header = () => {
  const { isAuthenticated, isLoadingAuth } = useAuth()
  const { handleLogout } = useAuth()
  return (
    <div className="border-border/70 flex h-16 w-full items-center border-b">
      <div className="container flex items-center justify-between gap-8">
        <div className="flex items-center gap-4">
          <CheckCircle size={24} />
          <span className="text-xl">Dome</span>
        </div>

        <div className="flex items-center gap-2">
          {isLoadingAuth && <Skeleton className="h-10 w-24 rounded-lg" />}

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
