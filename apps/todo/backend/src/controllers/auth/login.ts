import { prisma } from "@db/client"
import { zValidator } from "@hono/zod-validator"
import { UserLoginSchema, userLoginSchema } from "@incubator/shared"
import { verify } from "argon2"
import { createFactory } from "hono/factory"
import { HTTPException } from "hono/http-exception"

import { createToken, setAuthCookies } from "./utils"

const factory = createFactory()

export const loginHandlers = factory.createHandlers(
  zValidator("json", userLoginSchema),
  async (c) => {
    const userLoginPayload = c.req.valid("json")
    const user = await validateUserCredentials(userLoginPayload)

    const token = await createToken(user)
    setAuthCookies(c, token)

    return c.json({
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
      },
      message: "Logged in",
    })
  },
)

const validateUserCredentials = async ({
  email,
  password,
}: UserLoginSchema) => {
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  })

  if (!user) {
    throw new HTTPException(401, { message: "User not found" })
  }

  const validPassword = await verify(user.password, password)
  if (!validPassword) {
    throw new HTTPException(401, { message: "Invalid password" })
  }
  return user
}
