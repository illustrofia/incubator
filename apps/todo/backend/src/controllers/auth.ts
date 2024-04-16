import { zValidator } from "@hono/zod-validator"
import { userLoginSchema, userSignupSchema } from "@incubator/todo-shared"
import { authRepository } from "@repositories"
import { createToken, setAuthCookies } from "@utils"
import { deleteCookie } from "hono/cookie"
import { createFactory } from "hono/factory"

const factory = createFactory()

export const signupHandlers = factory.createHandlers(
  zValidator("json", userSignupSchema),
  async (c) => {
    const userSignupPayload = c.req.valid("json")
    const user = await authRepository.createUser(userSignupPayload)

    const token = await createToken(user)
    setAuthCookies(c, token)

    return c.json({ user })
  },
)

export const loginHandlers = factory.createHandlers(
  zValidator("json", userLoginSchema),
  async (c) => {
    const userLoginPayload = c.req.valid("json")
    const user = await authRepository.verifyUser(userLoginPayload)

    const token = await createToken(user)
    setAuthCookies(c, token)

    return c.json({ user, message: "Logged in" })
  },
)

export const logoutHandlers = factory.createHandlers(async (c) => {
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
