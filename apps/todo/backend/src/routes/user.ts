import { UserSchema } from "@incubator/shared"
import { authenticate } from "@middleware"
import { Hono } from "hono"

type Variables = {
  user: UserSchema
}

export const user = new Hono<{ Variables: Variables }>()

user.get("/me", authenticate, (c) => {
  return c.json(c.get("user"))
})
