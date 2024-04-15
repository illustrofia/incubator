import { Comment, Post } from "@prisma/client"

interface PostsRepository {
  create(data: {
    title: string
    content: string
    authorId: string
  }): Promise<Post>
  update(
    postId: string,
    data: { title?: string; content?: string },
  ): Promise<Post>
  delete(postId: string): Promise<Post>
  getPosts(page: number, pageSize: number): Promise<Post[]>
  getLikesCount(postId: string): Promise<number>
  getComments(
    postId: string,
    page: number,
    pageSize: number,
  ): Promise<Comment[]>
}

class PrismaPostsRepository implements PostsRepository {
  create = async (data: { title: string; content: string; authorId: string }) =>
    await prisma.post.create({
      data,
    })

  update = async (postId: string, data: { title?: string; content?: string }) =>
    await prisma.post.update({
      where: { id: postId },
      data,
    })

  delete = async (postId: string) =>
    await prisma.post.delete({
      where: { id: postId },
    })

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
