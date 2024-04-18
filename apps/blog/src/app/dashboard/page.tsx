import { auth } from "@/auth"
import { Button } from "@/components"
import { postsRepository } from "@/repositories"

import { createPost } from "./_actions"
import { PostCard } from "./_components"

export default async function Dashboard() {
  const session = await auth()

  if (!session?.user?.id) {
    return null
  }

  const postDrafts = await postsRepository.getPosts({
    authorId: session.user.id,
    pageSize: 10,
    page: 1,
    published: false,
  })

  const postsPublished = await postsRepository.getPosts({
    authorId: session.user.id,
    pageSize: 10,
    page: 1,
    published: true,
  })

  return (
    <main className="container mx-auto flex flex-1 flex-col gap-16 pt-8">
      <div className="space-y-16">
        <div className="space-y-4">
          <h2 className="text-2xl font-bold">Your Drafts</h2>

          {postDrafts.length === 0 && (
            <span className="text-muted-foreground text-lg">
              You don't have any drafts yet.
            </span>
          )}

          <div className="flex flex-wrap gap-4">
            {postDrafts.map((post) => (
              <div key={post.id} className="max-w-80 flex-1">
                <PostCard {...post} />
              </div>
            ))}
          </div>
        </div>

        <div className="flex gap-8">
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Your Posts</h2>
            <div className="flex flex-wrap gap-4">
              {postsPublished.length === 0 && (
                <span className="text-muted-foreground text-lg">
                  You don't have any posts yet.
                </span>
              )}

              {postsPublished.map((post) => (
                <div key={post.id} className="max-w-80 flex-1">
                  <PostCard {...post} />
                </div>
              ))}
            </div>
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
