import { auth } from "@/auth"
import { postsRepository } from "@/repositories"

import { PostEditor } from "./_components/post-editor"

interface PostEditProps {
  params: {
    id: string
  }
}

export default async function PostEdit({ params }: PostEditProps) {
  const session = await auth()

  if (!session?.user?.id) {
    throw new Error("Not logged in")
  }

  const post = await postsRepository.getPost({
    id: params.id,
    authorId: session.user.id,
  })

  if (!post) {
    throw new Error("Post not found")
  }

  return (
    <main className="container mx-auto flex flex-1 pt-8">
      <PostEditor
        id={params.id}
        authorId={session.user.id}
        content={post.content}
      />
    </main>
  )
}
