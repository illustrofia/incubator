import { createTodo, deleteTodo, queryKeys, updateTodo } from "@/api"
import { useToast } from "@/components"
import { TodoSchema } from "@incubator/shared"
import { useMutation, useQueryClient } from "@tanstack/react-query"

// More on optimistic updates: https://tanstack.com/query/latest/docs/framework/react/guides/optimistic-updates
export const useTodosMutations = () => {
  const { toast } = useToast()
  const queryClient = useQueryClient()

  const createTodoMutation = useMutation({
    mutationFn: createTodo,
    onMutate: async (newTodo) => {
      await queryClient.cancelQueries({ queryKey: queryKeys.todos })
      const previousTodos = queryClient.getQueryData(queryKeys.todos)
      queryClient.setQueryData(queryKeys.todos, (old: TodoSchema[]) => [
        ...old,
        {
          ...newTodo,
          id: Math.random().toString(),
          completed: false,
          createdAt: new Date().toISOString(),
        },
      ])

      return { previousTodos }
    },
    onError: (_err, _newTodo, context) => {
      if (!context) return
      toast({
        title: "Error creating todo.",
        description: "Reverting to previous state.",
        variant: "destructive",
      })
      // TODO: log sentry error
      queryClient.setQueryData(queryKeys.todos, context.previousTodos)
    },
    onSettled: () => {
      toast({ description: "Todo created." })
      queryClient.invalidateQueries({ queryKey: queryKeys.todos })
    },
  })

  const updateTodoMutation = useMutation({
    mutationFn: updateTodo,
    onMutate: async (updatedTodo) => {
      await queryClient.cancelQueries({ queryKey: queryKeys.todos })

      const previousTodos: TodoSchema[] | undefined = queryClient.getQueryData(
        queryKeys.todos,
      )

      queryClient.setQueryData(queryKeys.todos, (old: TodoSchema[]) =>
        old.map((todo) =>
          todo.id === updatedTodo.id ? { ...todo, ...updatedTodo } : todo,
        ),
      )

      return { previousTodos }
    },
    onError: (_err, _updatedTodo, context) => {
      if (!context) return

      toast({
        title: "Error updating todo.",
        description: "Reverting to previous state.",
        variant: "destructive",
      })
      // TODO: log sentry error
      queryClient.setQueryData(queryKeys.todos, context.previousTodos)
    },
    onSettled: () => {
      toast({ description: "Todo updated." })
      queryClient.invalidateQueries({ queryKey: queryKeys.todos })
    },
  })

  const deleteTodoMutation = useMutation({
    mutationFn: deleteTodo,
    onMutate: async (deletedTodoId) => {
      await queryClient.cancelQueries({ queryKey: queryKeys.todos })

      const previousTodos: TodoSchema[] | undefined = queryClient.getQueryData(
        queryKeys.todos,
      )

      queryClient.setQueryData(queryKeys.todos, (old: TodoSchema[]) =>
        old.filter((todo) => todo.id !== deletedTodoId),
      )

      return { previousTodos }
    },
    onError: (_err, _deletedTodoId, context) => {
      if (!context) return
      toast({
        title: "Error deleting todo.",
        description: "Reverting to previous state.",
        variant: "destructive",
      })
      // TODO: log sentry error
      queryClient.setQueryData(queryKeys.todos, context.previousTodos)
    },
    onSettled: () => {
      toast({ description: "Todo deleted." })
      queryClient.invalidateQueries({ queryKey: queryKeys.todos })
    },
  })

  return {
    createTodo: createTodoMutation,
    updateTodo: updateTodoMutation,
    deleteTodo: deleteTodoMutation,
  }
}
