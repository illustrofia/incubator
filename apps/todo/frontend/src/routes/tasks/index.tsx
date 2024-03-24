import { createFileRoute, redirect } from "@tanstack/react-router"

export const Route = createFileRoute("/tasks/")({
  beforeLoad: ({ context, location }) => {
    if (!context.isAuthenticated) {
      throw redirect({
        to: "/login",
        search: {
          redirect: location.href,
        },
      })
    }
  },

  component: () => <div>Hello /tasks/!</div>,
})
