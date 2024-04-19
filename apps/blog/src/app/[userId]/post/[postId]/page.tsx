import { Tiptap } from "@/app/edit/[id]/_components/tiptap"
import { postsRepository } from "@/repositories"

interface PostPageProps {
  params: {
    userId: string
    postId: string
  }
}

export default async function PostPage({ params }: PostPageProps) {
  const { userId, postId } = params
  const post = await postsRepository.getPost({
    id: postId,
    authorId: userId,
    published: true,
  })

  if (!post) {
    throw new Error("Post not found")
  }

  const parsedContent = JSON.parse(post.content)

  return (
    <main className="container flex-1 py-8 focus:outline-none md:py-16 xl:py-20">
      <Tiptap
        editorOptions={{
          content: parsedContent,
          editable: false,
        }}
      />
    </main>
  )
}
