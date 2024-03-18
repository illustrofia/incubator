import { Hono } from "hono"

export const auth = new Hono()

auth.post("/auth/login", (c) => {
  return c.text("login")
})

auth.post("/auth/register", (c) => {
  return c.text("register")
})

auth.post("/auth/logout", (c) => {
  return c.text("logout")
})
