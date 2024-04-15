import { Comment, Like, Post, User } from "@prisma/client"

interface UsersRepository {
  getAllUsers(page: number, pageSize: number): Promise<User[]>
  getUserPosts(userId: string, page: number, pageSize: number): Promise<Post[]>
  getUserComments(
    userId: string,
    page: number,
    pageSize: number,
  ): Promise<Comment[]>
  getUserLikes(userId: string, page: number, pageSize: number): Promise<Like[]>
}

class PrismaUsersRepository implements UsersRepository {
  async getAllUsers(page: number, pageSize: number): Promise<User[]> {
    return prisma.user.findMany({
      skip: (page - 1) * pageSize,
      take: pageSize,
    })
  }

  async getUserPosts(
    userId: string,
    page: number,
    pageSize: number,
  ): Promise<Post[]> {
    return prisma.post.findMany({
      where: { authorId: userId },
      skip: (page - 1) * pageSize,
      take: pageSize,
    })
  }

  async getUserComments(
    userId: string,
    page: number,
    pageSize: number,
  ): Promise<Comment[]> {
    return prisma.comment.findMany({
      where: { userId },
      skip: (page - 1) * pageSize,
      take: pageSize,
    })
  }

  async getUserLikes(
    userId: string,
    page: number,
    pageSize: number,
  ): Promise<Like[]> {
    return prisma.like.findMany({
      where: { userId },
      skip: (page - 1) * pageSize,
      take: pageSize,
    })
  }
}

export const usersRepository: UsersRepository = new PrismaUsersRepository()
