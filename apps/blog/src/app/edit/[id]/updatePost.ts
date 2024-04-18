"use server"

import { revalidatePath } from "next/cache"

import { auth } from "@/auth"
import { postsRepository } from "@/repositories"
import { PostUpdateSchema } from "@/schemas"

export const updatePost = async (payload: PostUpdateSchema) => {
  const session = await auth()

  if (!session?.user?.id) {
    throw new Error("Not logged in")
  }

  await postsRepository.update({ ...payload, authorId: session.user.id })

  revalidatePath("/dashboard")
}
