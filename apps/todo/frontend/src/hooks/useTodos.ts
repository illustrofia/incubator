import { useQuery } from "@tanstack/react-query"

import { getTodos, queryKeys } from "@/api"

export const useTodos = () => {
  const todos = useQuery({
    queryKey: queryKeys.todos,
    queryFn: () => getTodos(),
  })

  return {
    todos,
  }
}
