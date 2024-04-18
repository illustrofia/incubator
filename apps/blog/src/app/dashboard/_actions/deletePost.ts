"use server"

import { revalidatePath } from "next/cache"

import { auth } from "@/auth"
import { postsRepository } from "@/repositories"

export const deletePost = async (id: string) => {
  const session = await auth()

  if (!session?.user?.id) {
    throw new Error("Not logged in")
  }

  await postsRepository.delete({ authorId: session.user.id, id })
  revalidatePath("/dashboard")
}
