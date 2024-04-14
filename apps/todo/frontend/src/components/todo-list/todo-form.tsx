import { zodResolver } from "@hookform/resolvers/zod"
import {
  Button,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
  Input,
} from "@incubator/design-system"
import { TodoCreateSchema, todoCreateSchema } from "@incubator/todo-schemas"
import { useForm } from "react-hook-form"

import { useTodosMutations } from "@/api/todos/use-todos-mutations"

export const TodoForm = () => {
  const { createTodo } = useTodosMutations()

  const form = useForm<TodoCreateSchema>({
    resolver: zodResolver(todoCreateSchema),
    defaultValues: {
      title: "",
    },
  })

  const onSubmit = async (values: TodoCreateSchema) => {
    form.reset()
    await createTodo.mutateAsync(values)
  }

  return (
    <Form {...form}>
      <form className="flex gap-2" onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormControl>
                <Input placeholder="What is your next task?" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={form.formState.isSubmitting}>
          Add
        </Button>
      </form>
    </Form>
  )
}
