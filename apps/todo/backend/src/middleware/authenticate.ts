import { authRepository } from "@repositories"
import { Token } from "@types"
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

  const { email } = tokenDecoded as Token
  const user = await authRepository.getUser({ email })

  c.set("user", user)

  await next()
}
