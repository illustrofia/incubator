import Link from "next/link"

import { auth } from "@/auth"
import { Button } from "@/components"
import { usersRepository } from "@/repositories"

export default async function Dashboard() {
  const session = await auth()

  if (!session?.user?.id) {
    return null
  }

  const posts = await usersRepository.getPosts(session.user.id, 1, 10)

  return (
    <main className="container mx-auto flex flex-1 flex-col gap-8 pt-8">
      <div className="space-y-8">
        <span className="text-foreground text-xl font-medium">
          Welcome, {session.user.name ?? "User"}!
        </span>
        <h2 className="mt-8 text-2xl font-bold">Your Posts</h2>
        <div className="grid grid-cols-1 gap-4">
          {posts.map((post) => (
            <div key={post.id}>
              <h2 className="text-xl font-bold">{post.title}</h2>
              <p className="mt-2">{post.content}</p>
            </div>
          ))}
        </div>
      </div>

      <div>
        <Button asChild>
          <Link href="/editor">New Post</Link>
        </Button>
      </div>
    </main>
  )
}
