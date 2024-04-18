import { prisma } from "@/db"
import {
  PostCreateSchema,
  PostDeleteSchema,
  PostGetSchema,
  PostPublishSchema,
  PostSchema,
  PostsGetSchema,
  PostUpdateSchema,
} from "@/schemas"

interface PostsRepository {
  create(payload: PostCreateSchema): Promise<PostSchema>
  update(payload: PostUpdateSchema): Promise<PostSchema>
  delete(payload: PostDeleteSchema): Promise<PostSchema>
  getPost(payload: PostGetSchema): Promise<PostSchema | null>
  getPosts(payload: PostsGetSchema): Promise<PostSchema[]>
  publishPost(payload: PostPublishSchema): Promise<PostSchema>
  unpublishPost(payload: PostPublishSchema): Promise<PostSchema>
}

class PrismaPostsRepository implements PostsRepository {
  create = async (payload: PostCreateSchema) =>
    await prisma.post.create({
      data: payload,
    })

  update = async (payload: PostUpdateSchema) =>
    await prisma.post.update({
      where: { id: payload.id },
      data: payload,
    })

  delete = async ({ id, authorId }: PostDeleteSchema) =>
    await prisma.post.delete({
      where: { id: id, authorId: authorId },
    })

  getPost = async ({ id, authorId }: PostGetSchema) =>
    await prisma.post.findUnique({
      where: { id, authorId },
    })

  getPosts = async ({ authorId, pageSize, page, published }: PostsGetSchema) =>
    await prisma.post.findMany({
      where: { authorId, published },
      skip: (page - 1) * pageSize,
      take: pageSize,
    })

  publishPost = async ({ authorId, id }: PostPublishSchema) =>
    await prisma.post.update({
      where: { id, authorId },
      data: { published: true },
    })

  unpublishPost = async ({ authorId, id }: PostPublishSchema) =>
    await prisma.post.update({
      where: { id, authorId },
      data: { published: false },
    })
}

export const postsRepository: PostsRepository = new PrismaPostsRepository()
