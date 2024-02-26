"use client"
import { Button } from "@incubator/ui"
import { useState } from "react"

export default function Home() {
  const [count, setCount] = useState(0)

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4">
      Hello there!
      <Button variant={"default"} onClick={() => setCount((prev) => prev + 1)}>
        Count is: {count}
      </Button>
    </div>
  )
}
