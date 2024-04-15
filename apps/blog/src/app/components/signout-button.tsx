import { signOut } from "@/auth"
import { Button } from "@/components"

const signOutAction = async () => {
  "use server"
  await signOut()
}

export const SignOutButton = () => {
  return (
    <form action={signOutAction}>
      <Button type="submit" variant={"ghost"}>
        Sign Out
      </Button>
    </form>
  )
}
