import { auth } from "@/auth"
import { Button } from "@/components"
import { postsRepository } from "@/repositories"

import { createPost, PostCard } from "./_posts"

export default async function Dashboard() {
  const session = await auth()

  if (!session?.user?.id) {
    return null
  }

  const posts = await postsRepository.getPosts({
    authorId: session.user.id,
    pageSize: 10,
    page: 1,
  })

  return (
    <main className="container mx-auto flex flex-1 flex-col gap-16 pt-8">
      <div className="space-y-16">
        <div className="space-y-4">
          <h2 className="text-2xl font-bold">Your Posts</h2>

          {posts.length === 0 && (
            <span className="text-muted-foreground text-lg">
              You don't have any posts yet.
            </span>
          )}

          <div className="flex flex-col flex-wrap gap-4 md:flex-row">
            {posts.map((post) => (
              <PostCard key={post.id} {...post} />
            ))}
          </div>
        </div>
      </div>

      <form action={createPost}>
        <Button type="submit" variant={"outline"}>
          Create Post
        </Button>
      </form>
    </main>
  )
}
