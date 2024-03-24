import { useAuthStore } from "@/hooks"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { RouterProvider } from "@tanstack/react-router"
import { router } from "./router"

const queryClient = new QueryClient()

export default function App() {
  const { isAuthenticated } = useAuthStore()
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} context={{ isAuthenticated }} />
    </QueryClientProvider>
  )
}
