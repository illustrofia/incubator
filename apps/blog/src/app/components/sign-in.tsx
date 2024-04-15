import { signIn } from "@/auth"
import { Button } from "@/components"

export function SignIn() {
  return (
    <form
      action={async () => {
        "use server"
        await signIn("google")
      }}
    >
      <Button type="submit">Sign in with Google</Button>
    </form>
  )
}
