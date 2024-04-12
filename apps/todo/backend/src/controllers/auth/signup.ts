import { prisma } from "@db/client"
import { zValidator } from "@hono/zod-validator"
import { UserSignupSchema, userSignupSchema } from "@incubator/shared"
import { hash } from "argon2"
import { createFactory } from "hono/factory"
import { HTTPException } from "hono/http-exception"

import { createToken, setAuthCookies } from "./utils"

const factory = createFactory()

export const signupHandlers = factory.createHandlers(
  zValidator("json", userSignupSchema),
  async (c) => {
    const userSignupPayload = c.req.valid("json")
    const user = await createUser(userSignupPayload)

    const token = await createToken(user)
    setAuthCookies(c, token)
    return c.json({
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
      },
    })
  },
)

const createUser = async ({ email, password, username }: UserSignupSchema) => {
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  })

  if (user) {
    throw new HTTPException(400, { message: "User already exists" })
  }

  const passwordHash = await hash(password)
  const newUser = await prisma.user.create({
    data: {
      username,
      email,
      password: passwordHash,
    },
  })
  return newUser
}
