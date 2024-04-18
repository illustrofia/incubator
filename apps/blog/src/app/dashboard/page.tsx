import Link from "next/link"

import { auth } from "@/auth"
import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components"
import { usersRepository } from "@/repositories"

import { createPost, deletePost } from "./_actions"

export default async function Dashboard() {
  const session = await auth()

  if (!session?.user?.id) {
    return null
  }

  const userId = session.user.id
  const posts = await usersRepository.getPosts(userId, 1, 10)

  return (
    <main className="container mx-auto flex flex-1 flex-col gap-8 pt-8">
      <div className="space-y-8">
        <span className="text-foreground text-xl font-medium">
          Welcome, {session.user.name ?? "User"}!
        </span>
        <h2 className="mt-8 text-2xl font-bold">Your Posts</h2>
        <div className="flex flex-wrap gap-4">
          {posts.map(({ id, title, updatedAt }) => (
            <div key={id} className="max-w-80 flex-1">
              <Card className="group">
                <CardHeader>
                  <CardTitle>{title}</CardTitle>
                  <CardDescription>
                    {updatedAt.toLocaleString()}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  This is where a preview of the post content would go.
                </CardContent>
                <CardFooter className="flex justify-end gap-4 transition-opacity lg:opacity-0 lg:group-hover:opacity-100">
                  <Button variant={"secondary"} asChild>
                    <Link href={`edit/${id}`}>Edit</Link>
                  </Button>
                  <form action={deletePost.bind(null, id)}>
                    <Button variant={"destructive"} type="submit">
                      Delete
                    </Button>
                  </form>
                </CardFooter>
              </Card>
            </div>
          ))}
        </div>
      </div>

      <form action={createPost}>
        <Button type="submit">Create Post</Button>
      </form>
    </main>
  )
}
