import { Brain } from "lucide-react"

import { ModeToggle } from "../mode-toggle"

export const Header = () => {
  return (
    <div className="border-border/70 flex h-16 w-full items-center border-b">
      <div className="container flex items-center justify-between gap-8">
        <div className="flex items-center gap-4">
          <Brain size={24} />
          {/* <span className="text-xl">Thoughtful</span> */}
        </div>

        <ModeToggle />
      </div>
    </div>
  )
}
