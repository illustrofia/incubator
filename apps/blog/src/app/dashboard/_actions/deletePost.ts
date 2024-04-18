"use server"

import { revalidatePath } from "next/cache"

import { auth } from "@/auth"
import { postsRepository } from "@/repositories"

export const deletePost = async (postId: string) => {
  "use server"

  const session = await auth()

  if (!session?.user?.id) {
    throw new Error("Not logged in")
  }

  await postsRepository.delete(postId)
  revalidatePath("/dashboard")
}
