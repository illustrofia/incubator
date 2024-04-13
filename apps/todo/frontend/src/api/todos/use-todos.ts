import { useQuery } from "@tanstack/react-query"

import { getTodos, queryKeys, useAuth } from "@/api"

export const useTodos = () => {
  const { isAuthenticated } = useAuth()

  const todos = useQuery({
    queryKey: queryKeys.todos,
    queryFn: () => getTodos(),
    enabled: isAuthenticated,
  })

  return {
    todos,
  }
}
