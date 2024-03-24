import { useAuth } from "@/hooks"
import { RouterProvider } from "@tanstack/react-router"
import { router } from "./router"

export default function App() {
  const { isAuthenticated } = useAuth()
  return <RouterProvider router={router} context={{ isAuthenticated }} />
}
