import { Button } from "@incubator/ui"
import { useState } from "react"
import "./App.css"

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Button
        variant="default"
        onClick={() => {
          setCount((prev) => prev + 1)
        }}
      >
        Count is {count}
      </Button>
    </>
  )
}

export default App
