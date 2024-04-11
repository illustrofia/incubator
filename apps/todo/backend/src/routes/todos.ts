import {
  deleteTodosHandlers,
  getTodosHandlers,
  patchTodosHandlers,
  postTodosHandlers,
} from "@controllers"
import { UserSchema } from "@incubator/shared"
import { Hono } from "hono"

type Variables = {
  user: UserSchema
}

export const todos = new Hono<{ Variables: Variables }>()

todos.get("/todos", ...getTodosHandlers)
todos.post("/todos", ...postTodosHandlers)
todos.patch("/todos/:id", ...patchTodosHandlers)
todos.delete("/todos/:id", ...deleteTodosHandlers)
