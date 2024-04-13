import { prisma } from "@db/client"
import { TodoCreateSchema, TodoUpdateSchema } from "@incubator/shared"
import { PrismaClient } from "@prisma/client"

class PrismaTodoRepository {
  constructor(private prisma: PrismaClient) {}

  async getAll(userId: string) {
    return await this.prisma.todo.findMany({
      orderBy: {
        createdAt: "desc",
      },
      where: {
        userId,
      },
    })
  }

  create = async (userId: string, payload: TodoCreateSchema) => {
    return await this.prisma.todo.create({
      data: {
        userId,
        ...payload,
      },
    })
  }

  update = async (
    userId: string,
    { id, title, completed }: TodoUpdateSchema,
  ) => {
    return await this.prisma.todo.update({
      where: {
        userId,
        id,
      },
      data: { title, completed },
    })
  }

  delete = async (userId: string, todoId: string) => {
    return await this.prisma.todo.delete({
      where: {
        userId,
        id: todoId,
      },
    })
  }
}

export const todoRepository = new PrismaTodoRepository(prisma)
