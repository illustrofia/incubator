import { createTodo, deleteTodo, getTodos, queryKeys, updateTodo } from "@/api"
import { TodoSchema } from "@incubator/shared"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

export const useTodos = () => {
  const queryClient = useQueryClient()

  const todos = useQuery({
    queryKey: queryKeys.todos,
    queryFn: () => getTodos(),
  })

  // More on optimistic updates: https://tanstack.com/query/latest/docs/framework/react/guides/optimistic-updates
  const createTodoMutation = useMutation({
    mutationFn: createTodo,
    onMutate: async (newTodo) => {
      // Cancel any outgoing refetches
      // (so they don't overwrite our optimistic update)
      await queryClient.cancelQueries({ queryKey: queryKeys.todos })

      // Snapshot the previous value
      const previousTodos: TodoSchema[] | undefined = queryClient.getQueryData(
        queryKeys.todos,
      )

      // Optimistically update to the new value
      queryClient.setQueryData(queryKeys.todos, (old: TodoSchema[]) => [
        ...old,
        {
          ...newTodo,
          id: Math.random().toString(),
          completed: false,
          createdAt: new Date().toISOString(),
        },
      ])

      // Return a context object with the snapshotted value
      return { previousTodos }
    },
    // If the mutation fails,
    // use the context returned from onMutate to roll back
    onError: (err, newTodo, context) => {
      if (!context) return
      queryClient.setQueryData(queryKeys.todos, context.previousTodos)
    },
    // Always refetch after error or success:
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.todos })
    },
  })

  const updateTodoMutation = useMutation({
    mutationFn: updateTodo,
    onMutate: async (updatedTodo) => {
      // Cancel any outgoing refetches
      // (so they don't overwrite our optimistic update)
      await queryClient.cancelQueries({ queryKey: queryKeys.todos })

      // Snapshot the previous value
      const previousTodos: TodoSchema[] | undefined = queryClient.getQueryData(
        queryKeys.todos,
      )

      // Optimistically update to the new value
      queryClient.setQueryData(queryKeys.todos, (old: TodoSchema[]) =>
        old.map((todo) =>
          todo.id === updatedTodo.id ? { ...todo, ...updatedTodo } : todo,
        ),
      )

      // Return a context with the previous and new todo
      return { previousTodos }
    },
    // If the mutation fails, use the context we returned above
    onError: (err, updatedTodo, context) => {
      if (!context) return
      queryClient.setQueryData(queryKeys.todos, context.previousTodos)
    },
    // Always refetch after error or success:
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.todos })
    },
  })

  const deleteTodoMutation = useMutation({
    mutationFn: deleteTodo,
    onMutate: async (deletedTodoId) => {
      // Cancel any outgoing refetches
      // (so they don't overwrite our optimistic update)
      await queryClient.cancelQueries({ queryKey: queryKeys.todos })

      // Snapshot the previous value
      const previousTodos: TodoSchema[] | undefined = queryClient.getQueryData(
        queryKeys.todos,
      )

      // Optimistically update to the new value
      queryClient.setQueryData(queryKeys.todos, (old: TodoSchema[]) =>
        old.filter((todo) => todo.id !== deletedTodoId),
      )

      // Return a context with the previous and new todo
      return { previousTodos }
    },
    // If the mutation fails, use the context we returned above
    onError: (err, deletedTodoId, context) => {
      if (!context) return
      queryClient.setQueryData(queryKeys.todos, context.previousTodos)
    },
    // Always refetch after error or success:
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.todos })
    },
  })

  return {
    todos,
    createTodo: createTodoMutation,
    updateTodo: updateTodoMutation,
    deleteTodo: deleteTodoMutation,
  }
}
