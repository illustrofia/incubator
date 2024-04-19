import { z } from "zod"

export const postSchema = z
  .object({
    id: z.string(),
    title: z.string(),
    content: z.string(),
    published: z.boolean(),
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
    id: true,
    title: true,
    content: true,
    authorId: true,
    published: true,
  })
  .partial()
  .required({
    id: true,
    authorId: true,
  })
  .strip()

export type PostUpdateSchema = z.infer<typeof postUpdateSchema>

export const postCommonSchema = postSchema
  .pick({
    id: true,
    authorId: true,
    published: true,
  })
  .partial({ published: true })
  .strip()

export type PostCommonSchema = z.infer<typeof postCommonSchema>
export type PostGetSchema = PostCommonSchema
export type PostPublishSchema = PostCommonSchema
export type PostDeleteSchema = PostCommonSchema

export const postsGetSchema = postSchema
  .pick({
    authorId: true,
  })
  .extend({
    page: z.number(),
    published: z.boolean().optional(),
  })
  .strip()

export type PostsGetSchema = z.infer<typeof postsGetSchema>
