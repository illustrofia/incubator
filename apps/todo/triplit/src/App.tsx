import { useQuery } from "@triplit/react"
import { useState } from "react"
import { triplit } from "./client"
import { Todo } from "./components/todo"

const useTodos = () => {
  const todosQuery = triplit.query("todos").order("created_at", "DESC")
  const { results: todos, error } = useQuery(triplit, todosQuery)
  return { todos, error }
}

const App = () => {
  const [text, setText] = useState("")
  const { todos } = useTodos()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await triplit.insert("todos", { text })
    setText("")
  }

  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center gap-4">
      <form onSubmit={handleSubmit} className="flex gap-4">
        <input
          type="text"
          placeholder="What needs to be done?"
          className="rounded-lg border-gray-400 p-2.5"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button
          className="cursor-pointer rounded-lg border border-gray-400 bg-white p-2.5 transition-colors hover:border-gray-500 hover:bg-gray-100"
          type="submit"
          disabled={!text}
        >
          Add Todo
        </button>
      </form>
      {todos && (
        <div>
          {Array.from(todos).map(([id, todo]) => (
            <Todo key={id} todo={todo} />
          ))}
        </div>
      )}
    </div>
  )
}

export default App
