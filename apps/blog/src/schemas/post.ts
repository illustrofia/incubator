import { z } from "zod"

export const postSchema = z
  .object({
    id: z.string(),
    title: z.string(),
    content: z.string(),
    createdAt: z.date(),
    updatedAt: z.date(),
    authorId: z.string(),
  })
  .strip()

export type PostSchema = z.infer<typeof postSchema>

export const postCreateSchema = postSchema
  .pick({
    title: true,
    content: true,
    authorId: true,
  })
  .strip()

export type PostCreateSchema = z.infer<typeof postCreateSchema>

export const postUpdateSchema = postSchema
  .pick({
    title: true,
    content: true,
  })
  .strip()

export type PostUpdateSchema = z.infer<typeof postUpdateSchema>
