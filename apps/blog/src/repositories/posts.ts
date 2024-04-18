import { prisma } from "@/db"
import {
  CommentSchema,
  PostCreateSchema,
  PostSchema,
  PostUpdateSchema,
} from "@/schemas"

interface PostsRepository {
  create(payload: PostCreateSchema): Promise<PostSchema>
  update(postId: string, payload: PostUpdateSchema): Promise<PostSchema>
  delete(postId: string): Promise<PostSchema>
  getPosts(page: number, pageSize: number): Promise<PostSchema[]>
  getPost(postId: string): Promise<PostSchema | null>
  getLikesCount(postId: string): Promise<number>
  getComments(
    postId: string,
    page: number,
    pageSize: number,
  ): Promise<CommentSchema[]>
}

class PrismaPostsRepository implements PostsRepository {
  create = async (payload: PostCreateSchema) =>
    await prisma.post.create({
      data: payload,
    })

  update = async (postId: string, payload: PostUpdateSchema) =>
    await prisma.post.update({
      where: { id: postId },
      data: payload,
    })

  delete = async (postId: string) =>
    await prisma.post.delete({
      where: { id: postId },
    })

  getPost = async (postId: string) => {
    const post = await prisma.post.findUnique({
      where: { id: postId },
    })
    return post
  }

  getPosts = async (page: number, pageSize: number) =>
    await prisma.post.findMany({
      skip: (page - 1) * pageSize,
      take: pageSize,
    })

  getLikesCount = async (postId: string) =>
    await prisma.like.count({
      where: { postId },
    })

  getComments = async (postId: string, page: number, pageSize: number) =>
    await prisma.comment.findMany({
      where: { postId },
      skip: (page - 1) * pageSize,
      take: pageSize,
    })
}

export const postsRepository: PostsRepository = new PrismaPostsRepository()
