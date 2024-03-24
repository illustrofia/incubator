import { Outlet, createFileRoute, redirect } from "@tanstack/react-router"

export const Route = createFileRoute("/_auth")({
  beforeLoad: ({ context }) => {
    if (context.isAuthenticated) {
      throw redirect({ to: "/tasks" })
    }
  },
  component: Auth,
})

function Auth() {
  return (
    <div className="container flex items-center justify-center pt-20">
      <div className="w-[300px]">
        <Outlet />
      </div>
    </div>
  )
}
