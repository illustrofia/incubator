"use server"

import { revalidatePath } from "next/cache"
import { permanentRedirect } from "next/navigation"

import { auth } from "@/auth"
import { postsRepository } from "@/repositories"

export const createPost = async () => {
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

export const deletePost = async (id: string) => {
  const session = await auth()

  if (!session?.user?.id) {
    throw new Error("Not logged in")
  }

  await postsRepository.delete({ authorId: session.user.id, id })
  revalidatePath("/dashboard")
}

export const publishPost = async (id: string) => {
  const session = await auth()

  if (!session?.user?.id) {
    throw new Error("Not logged in")
  }

  await postsRepository.publishPost({ authorId: session.user.id, id })

  revalidatePath("/dashboard")
}

export const unpublishPost = async (id: string) => {
  const session = await auth()

  if (!session?.user?.id) {
    throw new Error("Not logged in")
  }

  await postsRepository.unpublishPost({ authorId: session.user.id, id })

  revalidatePath("/dashboard")
}
