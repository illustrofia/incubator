import { Brain } from "lucide-react"

import { auth } from "@/auth"

import { ModeToggle, SignOutButton } from "./"

export const Header = async () => {
  const session = await auth()
  return (
    <div className="border-border/70 flex h-16 w-full items-center border-b">
      <div className="container flex items-center justify-between gap-8">
        <div className="flex items-center gap-4">
          <Brain size={24} />
          <span className="text-xl">Thoughtful</span>
        </div>

        <div className="flex items-center gap-2">
          {session?.user && <SignOutButton />}

          <ModeToggle />
        </div>
      </div>
    </div>
  )
}
