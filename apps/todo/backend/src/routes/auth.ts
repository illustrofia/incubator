import { prisma } from "@db/client"
import { zValidator } from "@hono/zod-validator"
import { registerUserSchema } from "@incubator/shared"
import argon2 from "argon2"
import { Hono } from "hono"
import { HTTPException } from "hono/http-exception"

export const auth = new Hono()

auth.post(
  "/auth/register",
  zValidator("json", registerUserSchema),
  async (c) => {
    const { username, email, password } = c.req.valid("json")
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    })

    if (user) {
      throw new HTTPException(400, { message: "User already exists" })
    }
    const passwordHash = await argon2.hash(password)
    const newUser = await prisma.user.create({
      data: {
        username,
        email,
        password: passwordHash,
      },
    })

    return c.json({
      id: newUser.id,
      username: newUser.username,
      email: newUser.email,
    })
  },
)

auth.post("/auth/login", (c) => {
  return c.text("login")
})

auth.post("/auth/logout", (c) => {
  return c.text("logout")
})
