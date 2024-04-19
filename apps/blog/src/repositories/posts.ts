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
  getPost(filters: PostGetSchema): Promise<PostSchema | null>
  getPosts(payload: PostsGetSchema): Promise<{
    posts: PostSchema[]
    postCount: number
    pageCount: number
  }>
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

  getPost = async (filters: PostGetSchema) =>
    await prisma.post.findUnique({
      where: filters,
    })

  getPosts = async ({ authorId, page, published }: PostsGetSchema) => {
    const postCount = await prisma.post.count({
      where: { authorId, published },
    })

    const pageSize = 10
    const pageCount = Math.ceil(postCount / pageSize)
    const posts = await prisma.post.findMany({
      where: { authorId, published },
      skip: (page - 1) * pageSize,
      take: pageSize,
    })

    return {
      posts,
      postCount,
      pageCount,
    }
  }

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
