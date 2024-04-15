import { clsx } from "clsx"
import { X } from "lucide-react"

import { useTodos } from "@/api"
import { useTodosMutations } from "@/api/todos/use-todos-mutations"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Checkbox,
  Skeleton,
} from "@/components"

import { TodoForm } from "./todo-form"

export const TodoList = () => {
  const { todos } = useTodos()
  const { updateTodo, deleteTodo } = useTodosMutations()

  return (
    <div className="container mx-auto py-10">
      <Card className="mx-auto max-w-md">
        <CardHeader>
          <CardTitle>Todo List</CardTitle>
        </CardHeader>

        <CardContent className="space-y-4">
          <TodoForm />

          <div className="flex flex-col">
            {todos.isLoading && (
              <>
                <TodoSkeleton />
                <TodoSkeleton />
                <TodoSkeleton />
              </>
            )}

            {todos.isError && (
              <p className="text-destructive">
                Something went wrong: {todos.error.message}
              </p>
            )}

            {todos.isSuccess && todos.data?.length === 0 && (
              <p className="text-muted-foreground text-sm">
                Take a deep breath, there&apos;s nothing to do.
              </p>
            )}

            {todos.data?.map((todo) => (
              <div key={todo.id} className="group flex items-center gap-2 py-1">
                <Checkbox
                  className="size-4"
                  checked={todo.completed}
                  onCheckedChange={(checked) => {
                    updateTodo.mutate({
                      id: todo.id,
                      completed: !!checked,
                    })
                  }}
                />

                <span className={clsx(todo.completed && "line-through")}>
                  {todo.title}
                </span>

                <button
                  className="hover:text-primary ml-auto transition-all md:opacity-0 md:group-hover:opacity-100"
                  onClick={() => deleteTodo.mutate(todo.id)}
                >
                  <X />
                </button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

const TodoSkeleton = () => (
  <div className="my-1 flex items-center gap-2 py-1">
    <Skeleton className="size-4" />
    <Skeleton className="h-4 w-full py-1" />
  </div>
)
