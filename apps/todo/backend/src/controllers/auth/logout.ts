import { deleteCookie } from "hono/cookie"
import { createFactory } from "hono/factory"

const factory = createFactory()

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
