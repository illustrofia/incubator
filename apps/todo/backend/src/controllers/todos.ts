import { prisma } from "@db/client"
import { zValidator } from "@hono/zod-validator"
import {
  todoCreateSchema,
  todoUpdateSchema,
  UserSchema,
} from "@incubator/shared"
import { authenticate } from "@middleware"
import { createFactory } from "hono/factory"

type Variables = {
  user: UserSchema
}

const factory = createFactory<{ Variables: Variables }>()

export const getTodosHandlers = factory.createHandlers(
  authenticate,
  async (c) => {
    const user = c.get("user")

    const todos = await prisma.todo.findMany({
      orderBy: {
        createdAt: "asc",
      },
      where: {
        userId: user.id,
      },
    })

    return c.json(todos)
  },
)

export const postTodosHandlers = factory.createHandlers(
  authenticate,
  zValidator("json", todoCreateSchema),
  async (c) => {
    const user = c.get("user")
    const { title } = c.req.valid("json")

    const todo = await prisma.todo.create({
      data: {
        title,
        userId: user.id,
      },
    })

    return c.json(todo)
  },
)

export const patchTodosHandlers = factory.createHandlers(
  authenticate,
  zValidator("json", todoUpdateSchema),
  async (c) => {
    const user = c.get("user")
    const { title, completed } = c.req.valid("json")
    const id = c.req.param("id")

    const updatedTodo = await prisma.todo.update({
      where: {
        id,
        userId: user.id,
      },
      data: {
        title,
        completed,
      },
    })

    return c.json(updatedTodo)
  },
)

export const deleteTodosHandlers = factory.createHandlers(
  authenticate,
  async (c) => {
    const user = c.get("user")
    const id = c.req.param("id")

    const deletedTodo = await prisma.todo.delete({
      where: {
        id,
        userId: user.id,
      },
    })

    return c.json(deletedTodo)
  },
)
