import { Like, Post, User } from "@prisma/client"

interface UsersRepository {
  getUsers(page: number, pageSize: number): Promise<User[]>
  getUserLikes(userId: string, page: number, pageSize: number): Promise<Like[]>
  getPosts(userId: string, page: number, pageSize: number): Promise<Post[]>
}

class PrismaUsersRepository implements UsersRepository {
  getUsers = async (page: number, pageSize: number) =>
    await prisma.user.findMany({
      skip: (page - 1) * pageSize,
      take: pageSize,
    })

  getUserLikes = async (userId: string, page: number, pageSize: number) =>
    await prisma.like.findMany({
      where: { userId },
      skip: (page - 1) * pageSize,
      take: pageSize,
    })

  getPosts = async (userId: string, page: number, pageSize: number) =>
    await prisma.post.findMany({
      where: { authorId: userId },
      skip: (page - 1) * pageSize,
      take: pageSize,
    })
}

export const usersRepository: UsersRepository = new PrismaUsersRepository()
