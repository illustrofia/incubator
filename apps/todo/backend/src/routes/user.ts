import { UserSchema } from "@incubator/todo-shared"
import { authenticate } from "@middleware"
import { Hono } from "hono"

type Variables = {
  user: UserSchema
}

export const user = new Hono<{ Variables: Variables }>()

user.get("/me", authenticate, (c) => {
  const user = c.get("user")
  return c.json(user)
})
