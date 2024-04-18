import { User } from "@prisma/client"

import { prisma } from "@/db"

interface UsersRepository {
  getUsers(page: number, pageSize: number): Promise<User[]>
}

class PrismaUsersRepository implements UsersRepository {
  getUsers = async (page: number, pageSize: number) =>
    await prisma.user.findMany({
      skip: (page - 1) * pageSize,
      take: pageSize,
    })
}

export const usersRepository: UsersRepository = new PrismaUsersRepository()
