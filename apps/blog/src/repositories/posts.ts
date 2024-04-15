import { Post } from "@prisma/client"

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
  getPostLikesCount(postId: string): Promise<number>
}

class PrismaPostsRepository implements PostsRepository {
  async create(data: {
    title: string
    content: string
    authorId: string
  }): Promise<Post> {
    return prisma.post.create({
      data,
    })
  }

  async update(
    postId: string,
    data: { title?: string; content?: string },
  ): Promise<Post> {
    return prisma.post.update({
      where: { id: postId },
      data,
    })
  }

  async delete(postId: string): Promise<Post> {
    return prisma.post.delete({
      where: { id: postId },
    })
  }

  async getPostLikesCount(postId: string): Promise<number> {
    const count = await prisma.like.count({
      where: { postId },
    })
    return count
  }
}

export const postsRepository: PostsRepository = new PrismaPostsRepository()
