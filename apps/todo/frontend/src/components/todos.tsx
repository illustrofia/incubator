import { createTodo, deleteTodo, getTodos, queryKeys, updateTodo } from "@/api"
import { Button, Checkbox, Input, Label } from "@/components"
import { TodoSchema } from "@incubator/shared"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { clsx } from "clsx"
import { X } from "lucide-react"
import { useState } from "react"

export const Todos = () => {
  const [newTodo, setNewTodo] = useState("")

  const queryClient = useQueryClient()

  const todos = useQuery({
    queryKey: queryKeys.todos,
    queryFn: () => getTodos(),
  })

  const { mutateAsync: createTodoMutaion } = useMutation({
    mutationFn: createTodo,
    onSuccess: (data) => {
      setNewTodo("")
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

  const { mutateAsync: deleteTodoMutation } = useMutation({
    mutationFn: deleteTodo,
    onSuccess: (data) => {
      queryClient.setQueryData(queryKeys.todos, (oldData: TodoSchema[]) =>
        oldData.filter((todo) => todo.id !== data.id),
      )
    },
  })

  return (
    <div className="container mx-auto space-y-4 pt-10">
      <div className="mx-auto flex max-w-sm flex-col gap-2">
        <Label>Add a todo</Label>
        <div className="flex gap-2">
          <Input
            value={newTodo}
            placeholder="Get stuff done!"
            onChange={(e) => setNewTodo(e.target.value)}
          />
          <Button
            disabled={newTodo.trim().length === 0}
            onClick={() => createTodoMutaion({ title: newTodo })}
          >
            Add
          </Button>
        </div>
      </div>

      <div className="border-border mx-auto min-h-16 max-w-sm rounded-md border p-4">
        {todos.isLoading && <p>Loading...</p>}
        {todos.isError && <p>Error: {todos.error.message}</p>}
        {todos.isSuccess && todos.data?.length === 0 && (
          <p>Take a deep breath, there's nothing to do.</p>
        )}
        {todos.data?.map((todo) => (
          <div key={todo.id} className="flex items-center gap-2">
            <Checkbox
              checked={todo.completed}
              onCheckedChange={(checked) => {
                updateTodoMutation({
                  id: todo.id,
                  completed: !!checked,
                })
              }}
            />
            <span
              className={clsx({
                "line-through": todo.completed,
              })}
            >
              {todo.title}
            </span>
            <span
              className="hover:text-primary ml-auto transition-colors"
              onClick={() => deleteTodoMutation(todo.id)}
            >
              <X />
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
