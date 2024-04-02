import { getTodos, queryKeys } from "@/api"
import { useQuery } from "@tanstack/react-query"

export const useTodos = () => {
  const todos = useQuery({
    queryKey: queryKeys.todos,
    queryFn: () => getTodos(),
  })

  return {
    todos,
  }
}
