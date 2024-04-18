import { postsRepository } from "@/repositories"

import { PostEditor } from "./_components/post-editor"

interface PostEditProps {
  params: {
    id: string
  }
}

export default async function PostEdit({ params }: PostEditProps) {
  const post = await postsRepository.getPost(params.id)
  if (!post) {
    throw new Error("Post not found")
  }

  return (
    <main className="container mx-auto flex flex-1 flex-col gap-8 pt-8">
      <PostEditor id={params.id} content={post.content} />
    </main>
  )
}
