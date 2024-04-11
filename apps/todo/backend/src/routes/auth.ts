import { loginHandlers, logoutHandlers, signupHandlers } from "@controllers"
import { Hono } from "hono"

export const auth = new Hono()

auth.post("/auth/signup", ...signupHandlers)
auth.post("/auth/login", ...loginHandlers)
auth.post("/auth/logout", ...logoutHandlers)
