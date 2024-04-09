import { prisma } from "@db/client"
import { UserSchema } from "@incubator/shared"
import { MiddlewareHandler } from "hono"
import { getCookie } from "hono/cookie"
import { verify } from "hono/jwt"

export const authenticate: MiddlewareHandler = async (c, next) => {
  const token = getCookie(c, "token")

  if (!token) {
    return c.json({ message: "Unauthorized" }, 401)
  }

  if (!process.env.JWT_SECRET) {
    return c.json({ message: "JWT secret not provided" }, 500)
  }

  const tokenDecoded = await verify(token, process.env.JWT_SECRET)
  if (!tokenDecoded) {
    return c.json({ message: "Invalid token" }, 401)
  }

  const user = await prisma.user.findUnique({
    where: {
      email: (tokenDecoded as UserSchema).email,
    },
  })
  if (!user) {
    return c.json({ message: "User not found" }, 404)
  }

  c.set("user", {
    id: user.id,
    email: user.email,
    username: user.username,
  })

  await next()
}
