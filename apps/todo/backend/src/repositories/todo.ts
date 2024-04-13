import { prisma } from "@db/client"
import {
  TodoCreateSchema,
  TodoSchema,
  TodoUpdateSchema,
} from "@incubator/shared"
import { PrismaClient } from "@prisma/client"

export interface TodoRepository {
  getAll: (userId: string) => Promise<TodoSchema[]>
  create: (userId: string, payload: TodoCreateSchema) => Promise<TodoSchema>
  update: (userId: string, payload: TodoUpdateSchema) => Promise<TodoSchema>
  delete: (userId: string, todoId: string) => Promise<TodoSchema>
}

class PrismaTodoRepository implements TodoRepository {
  constructor(private prisma: PrismaClient) {}

  getAll = async (userId: string) => {
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

export const todoRepository: TodoRepository = new PrismaTodoRepository(prisma)
