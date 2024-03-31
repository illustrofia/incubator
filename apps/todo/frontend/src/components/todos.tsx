import { createTodo, getTodos, queryKeys, updateTodo } from "@/api"
import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Checkbox,
  Input,
} from "@/components"
import { TodoSchema } from "@incubator/shared"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { useState } from "react"

export const Todos = () => {
  const [newTodo, setNewTodo] = useState("")

  const queryClient = useQueryClient()

  const { mutateAsync: createTodoMutaion } = useMutation({
    mutationFn: (title: string) => createTodo({ title }),
    onSuccess: (data) => {
      setNewTodo("")
      // add new todo to cache
      queryClient.setQueryData(queryKeys.todos, (oldData: TodoSchema[]) => [
        ...oldData,
        data,
      ])
    },
  })

  const { mutateAsync: updateTodoMutation } = useMutation({
    mutationFn: updateTodo,
    onSuccess: (data) => {
      queryClient.setQueryData(queryKeys.todos, (oldData: TodoSchema[]) =>
        oldData.map((todo) => (todo.id === data.id ? data : todo)),
      )
    },
  })

  const todos = useQuery({
    queryKey: queryKeys.todos,
    queryFn: () => getTodos(),
  })

  return (
    <div className="container mx-auto pt-20">
      <Card className="mx-auto max-w-sm">
        <CardHeader>
          <CardTitle className="text-xl">Add todo</CardTitle>
          <CardDescription>Add a new item to your todo list</CardDescription>
        </CardHeader>

        <CardContent>
          <div className="space-y-4">
            <Input
              value={newTodo}
              placeholder="Get stuff done!"
              onChange={(e) => setNewTodo(e.target.value)}
            />
            <Button onClick={() => createTodoMutaion(newTodo)}>Add</Button>
          </div>
        </CardContent>
      </Card>
      {todos.isLoading && <p>Loading...</p>}
      {todos.isError && <p>Error: {todos.error.message}</p>}
      {todos.isSuccess && (
        <ul>
          {todos.data.map((todo) => (
            <li key={todo.id} className="flex items-center gap-2">
              <Checkbox
                checked={todo.completed}
                onCheckedChange={(checked) => {
                  updateTodoMutation({
                    id: todo.id,
                    completed: !!checked,
                  })
                }}
              />
              {todo.title}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
