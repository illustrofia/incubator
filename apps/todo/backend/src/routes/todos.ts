import {
  deleteTodosHandlers,
  getTodosHandlers,
  patchTodosHandlers,
  postTodosHandlers,
} from "@controllers"
import { Hono } from "hono"

export const todos = new Hono()

todos.get("/todos", ...getTodosHandlers)
todos.post("/todos", ...postTodosHandlers)
todos.patch("/todos/:id", ...patchTodosHandlers)
todos.delete("/todos/:id", ...deleteTodosHandlers)
