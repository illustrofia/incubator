import { auth } from "@/auth"

export default async function Dashboard() {
  const session = await auth()
  return (
    <main className="container mx-auto  flex flex-1 flex-col">
      Welcome, {session?.user?.name}!
    </main>
  )
}
