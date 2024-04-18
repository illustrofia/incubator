import { auth } from "@/auth"
import {
  Button,
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components"
import { postsRepository } from "@/repositories"

import { createPost, PostCard } from "./_posts"

export interface DashboardProps {
  searchParams: {
    page?: string
  }
}

export default async function Dashboard({ searchParams }: DashboardProps) {
  const session = await auth()

  if (!session?.user?.id) {
    throw new Error("Not authenticated")
  }

  const page = Number(searchParams.page ?? 1)

  const { posts, postCount, pageCount } = await postsRepository.getPosts({
    authorId: session.user.id,
    page,
  })

  return (
    <main className="container mx-auto flex flex-1 flex-col gap-16 py-8">
      <div className="space-y-16">
        <div className="space-y-8">
          <div className="flex items-center gap-8">
            <h2 className="text-2xl font-bold">Your Posts</h2>
            <form action={createPost}>
              <Button type="submit">Create Post</Button>
            </form>
          </div>

          {posts.length === 0 && (
            <div className="text-muted-foreground text-lg">
              You don't have any posts yet.
            </div>
          )}

          <div className="flex flex-col flex-wrap gap-4 md:flex-row">
            {posts.map((post) => (
              <PostCard key={post.id} {...post} />
            ))}
          </div>
        </div>
        <div className="space-y-4">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  href={`/dashboard?page=${page - 1}`}
                  disabled={page === 1}
                />
              </PaginationItem>
              {page > 2 && (
                <PaginationItem>
                  <PaginationLink href={`/dashboard?page=${page - 2}`}>
                    {page - 2}
                  </PaginationLink>
                </PaginationItem>
              )}
              {page > 1 && (
                <PaginationItem>
                  <PaginationLink href={`/dashboard?page=${page - 1}`}>
                    {page - 1}
                  </PaginationLink>
                </PaginationItem>
              )}
              <PaginationItem>
                <PaginationLink href={`/dashboard?page=${page}`} isActive>
                  {page}
                </PaginationLink>
              </PaginationItem>
              {page < pageCount - 1 && (
                <PaginationItem>
                  <PaginationLink href={`/dashboard?page=${page + 1}`}>
                    {page + 1}
                  </PaginationLink>
                </PaginationItem>
              )}
              {page < pageCount - 2 && (
                <PaginationItem>
                  <PaginationLink href={`/dashboard?page=${page + 2}`}>
                    {page + 2}
                  </PaginationLink>
                </PaginationItem>
              )}
              <PaginationItem>
                <PaginationNext
                  href={`/dashboard?page=${page + 1}`}
                  disabled={page === pageCount}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
          <div className="flex items-center justify-center gap-4">
            <span className="text-muted-foreground text-sm">
              Page {page} of {pageCount}
            </span>
            <span className="text-muted-foreground text-sm">
              Showing {posts.length} of {postCount} posts
            </span>
          </div>
        </div>
      </div>
    </main>
  )
}
