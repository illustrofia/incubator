import { Brain } from "lucide-react"
import Link from "next/link"

import { auth, signOut } from "@/auth"

import { Button } from "../../components/ui"
import { ModeToggle } from "./mode-toggle"

export const Header = async () => {
  const session = await auth()

  return (
    <div className="border-border/70 flex h-16 w-full items-center border-b">
      <div className="container flex items-center justify-between gap-8">
        <Link
          href={session?.user ? "/dashboard" : "/"}
          className="flex items-center gap-4"
        >
          <Brain size={24} />
          <span className="text-xl">Thoughtful</span>
        </Link>

        <div className="flex items-center gap-2">
          {session?.user && (
            <form action={signOutAction}>
              <Button type="submit" variant={"ghost"}>
                Sign Out
              </Button>
            </form>
          )}

          <ModeToggle />
        </div>
      </div>
    </div>
  )
}

async function signOutAction() {
  "use server"
  await signOut()
}
