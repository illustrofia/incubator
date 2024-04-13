import { zValidator } from "@hono/zod-validator"
import {
  todoCreateSchema,
  todoUpdateSchema,
  UserSchema,
} from "@incubator/shared"
import { authenticate } from "@middleware"
import { todoRepository } from "@repositories"
import { createFactory } from "hono/factory"

type Variables = {
  user: UserSchema
}

const factory = createFactory<{ Variables: Variables }>()

export const getTodosHandlers = factory.createHandlers(
  authenticate,
  async (c) => {
    const user = c.get("user")
    const todos = await todoRepository.getAll(user.id)
    return c.json(todos)
  },
)

export const postTodosHandlers = factory.createHandlers(
  authenticate,
  zValidator("json", todoCreateSchema),
  async (c) => {
    const user = c.get("user")
    const todoCreatePayload = c.req.valid("json")
    const todo = await todoRepository.create(user.id, todoCreatePayload)
    return c.json(todo)
  },
)

export const patchTodosHandlers = factory.createHandlers(
  authenticate,
  zValidator("json", todoUpdateSchema),
  async (c) => {
    const user = c.get("user")
    const todoCreatePayload = c.req.valid("json")
    const updatedTodo = await todoRepository.update(user.id, todoCreatePayload)
    return c.json(updatedTodo)
  },
)

export const deleteTodosHandlers = factory.createHandlers(
  authenticate,
  async (c) => {
    const user = c.get("user")
    const todoId = c.req.param("id")
    const deletedTodo = await todoRepository.delete(user.id, todoId)
    return c.json(deletedTodo)
  },
)
