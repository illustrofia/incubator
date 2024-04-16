import { UserSchema } from "@incubator/todo-schemas"
import { HTTPException } from "hono/http-exception"
import { sign } from "hono/jwt"

export const createToken = async ({ id }: Pick<UserSchema, "id">) => {
  if (!process.env.JWT_SECRET) {
    throw new HTTPException(500, { message: "JWT secret missing" })
  }
  return await sign({ id }, process.env.JWT_SECRET)
}
