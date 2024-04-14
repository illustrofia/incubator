import { prisma } from "@db/client"
import { UserSchema } from "@incubator/todo-schemas"
import { MiddlewareHandler } from "hono"
import { getCookie } from "hono/cookie"
import { HTTPException } from "hono/http-exception"
import { verify } from "hono/jwt"

export const authenticate: MiddlewareHandler = async (c, next) => {
  const token = getCookie(c, "token")

  if (!token) {
    throw new HTTPException(401, { message: "Unauthorized" })
  }

  if (!process.env.JWT_SECRET) {
    throw new HTTPException(500, { message: "JWT secret missing" })
  }

  const tokenDecoded = await verify(token, process.env.JWT_SECRET)
  if (!tokenDecoded) {
    throw new HTTPException(401, { message: "Invalid token" })
  }

  const user = await prisma.user.findUnique({
    where: {
      email: (tokenDecoded as UserSchema).email,
    },
  })
  if (!user) {
    throw new HTTPException(404, { message: "User not found" })
  }

  c.set("user", {
    id: user.id,
    email: user.email,
    username: user.username,
  })

  await next()
}
