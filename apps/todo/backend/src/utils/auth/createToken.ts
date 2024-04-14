import { UserLoginSchema } from "@incubator/todo-schemas"
import { HTTPException } from "hono/http-exception"
import { sign } from "hono/jwt"

export const createToken = async (user: Pick<UserLoginSchema, "email">) => {
  if (!process.env.JWT_SECRET) {
    throw new HTTPException(500, { message: "JWT secret missing" })
  }
  return await sign({ email: user.email }, process.env.JWT_SECRET)
}
