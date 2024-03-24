import { prisma } from "@db/client"
import { zValidator } from "@hono/zod-validator"
import {
  LoginUserSchema,
  loginUserSchema,
  registerUserSchema,
} from "@incubator/shared"
import argon2 from "argon2"
import { Hono } from "hono"
import { deleteCookie, setCookie } from "hono/cookie"
import { sign } from "hono/jwt"

export const auth = new Hono()

const createToken = async (user: LoginUserSchema) =>
  await sign({ email: user.email }, process.env.JWT_SECRET)

const ONE_DAY = 60 * 60 * 24

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
      return c.json({ message: "User already exists" }, 400)
    }
    const passwordHash = await argon2.hash(password)
    const newUser = await prisma.user.create({
      data: {
        username,
        email,
        password: passwordHash,
      },
    })

    const token = await createToken(newUser)
    setCookie(c, "token", token, {
      httpOnly: true,
      maxAge: ONE_DAY,
      sameSite: "None",
      secure: true,
      domain: process.env.DOMAIN || "localhost",
    })
    setCookie(c, "hasAuthToken", "true", {
      maxAge: ONE_DAY,
      sameSite: "None",
      secure: true,
      domain: process.env.DOMAIN || "localhost",
    })

    return c.json({
      id: newUser.id,
      username: newUser.username,
      email: newUser.email,
    })
  },
)

auth.post("/auth/login", zValidator("json", loginUserSchema), async (c) => {
  const { email, password } = c.req.valid("json")
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  })

  if (!user) {
    return c.json({ message: "User not found" }, 401)
  }

  const validPassword = await argon2.verify(user.password, password)
  if (!validPassword) {
    return c.json({ message: "Invalid password" }, 401)
  }

  const token = await createToken(user)

  setCookie(c, "token", token, {
    httpOnly: true,
    maxAge: ONE_DAY,
    sameSite: "None",
    secure: true,
    domain: process.env.DOMAIN || "localhost",
  })
  setCookie(c, "hasAuthToken", "true", {
    maxAge: ONE_DAY,
    sameSite: "None",
    secure: true,
    domain: process.env.DOMAIN || "localhost",
  })

  return c.json({
    user: {
      id: user.id,
      username: user.username,
      email: user.email,
    },
    message: "Logged in",
  })
})

auth.post("/auth/logout", async (c) => {
  deleteCookie(c, "token", {
    httpOnly: true,
    sameSite: "None",
    secure: true,
    domain: process.env.DOMAIN || "localhost",
  })
  deleteCookie(c, "hasAuthToken", {
    sameSite: "None",
    secure: true,
    domain: process.env.DOMAIN || "localhost",
  })

  return c.json({ message: "Logged out" })
})
