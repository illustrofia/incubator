"use server"

import { auth } from "@/auth"
import { postsRepository } from "@/repositories"
import { PostUpdateSchema } from "@/schemas"

export const updatePost = async (postId: string, payload: PostUpdateSchema) => {
  "use server"

  const session = await auth()

  if (!session?.user?.id) {
    throw new Error("Not logged in")
  }

  await postsRepository.update(postId, payload)
}
