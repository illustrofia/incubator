import Link from "next/link"

import { Logo } from "./logo"
import { ModeToggle } from "./mode-toggle"

export const Header = async () => {
  return (
    <div className="border-border/70 flex h-16 w-full items-center border-b">
      <div className="container flex items-center justify-between gap-8">
        <Link href="/" className="flex items-center gap-4">
          <span className="text-foreground">
            <Logo />
          </span>
          <span className="text-xl">Illustrofia</span>
        </Link>

        <ModeToggle />
      </div>
    </div>
  )
}
