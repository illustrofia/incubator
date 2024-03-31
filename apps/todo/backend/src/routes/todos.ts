import { prisma } from "@db/client"
import { zValidator } from "@hono/zod-validator"
import {
  UserSchema,
  createTodoSchema,
  updateTodoSchema,
} from "@incubator/shared"
import { authenticate } from "@middleware"
import { Hono } from "hono"

type Variables = {
  user: UserSchema
}

export const todos = new Hono<{ Variables: Variables }>()

todos.get("/todos", authenticate, async (c) => {
  const user = c.get("user")

  const todos = await prisma.todo.findMany({
    where: {
      userId: user.id,
    },
  })

  return c.json(todos)
})

todos.post(
  "/todos",
  authenticate,
  zValidator("json", createTodoSchema),
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

todos.patch(
  "/todos/:id",
  authenticate,
  zValidator("json", updateTodoSchema),
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
