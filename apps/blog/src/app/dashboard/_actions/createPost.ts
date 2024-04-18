"use server"

import { permanentRedirect } from "next/navigation"

import { auth } from "@/auth"
import { postsRepository } from "@/repositories"

export const createPost = async () => {
  "use server"

  const session = await auth()

  if (!session?.user?.id) {
    throw new Error("Not logged in")
  }

  const newPost = await postsRepository.create({
    title: "Your new post",
    content: "",
    authorId: session.user.id,
  })

  permanentRedirect(`/edit/${newPost.id}`)
}
