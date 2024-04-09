import { prisma } from "@db/client"
import { zValidator } from "@hono/zod-validator"
import {
  LoginUserSchema,
  loginUserSchema,
  signupUserSchema,
} from "@incubator/shared"
import argon2 from "argon2"
import { Hono } from "hono"
import { deleteCookie, setCookie } from "hono/cookie"
import { sign } from "hono/jwt"

export const auth = new Hono()

const createToken = async (user: LoginUserSchema) => {
  if (!process.env.JWT_SECRET) {
    throw new Error("JWT secret not provided")
  }

  return await sign({ email: user.email }, process.env.JWT_SECRET)
}

const ONE_DAY = 60 * 60 * 24

auth.post("/auth/signup", zValidator("json", signupUserSchema), async (c) => {
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

  let token: string
  try {
    token = await createToken(newUser)
  } catch (error) {
    return c.json({ message: "Error creating token" }, 500)
  }

  setCookie(c, "token", token, {
    httpOnly: true,
    maxAge: ONE_DAY,
    sameSite: "Strict",
    secure: true,
  })
  setCookie(c, "hasAuthToken", "true", {
    maxAge: ONE_DAY,
    sameSite: "Strict",
    secure: true,
  })

  return c.json({
    user: {
      id: newUser.id,
      username: newUser.username,
      email: newUser.email,
    },
  })
})

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
    sameSite: "Strict",
    secure: true,
  })
  setCookie(c, "hasAuthToken", "true", {
    maxAge: ONE_DAY,
    sameSite: "Strict",
    secure: true,
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
    sameSite: "Strict",
    secure: true,
  })
  deleteCookie(c, "hasAuthToken", {
    sameSite: "Strict",
    secure: true,
  })

  return c.json({ message: "Logged out" })
})
