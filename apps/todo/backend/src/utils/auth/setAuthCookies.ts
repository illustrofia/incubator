import { UserLoginSchema } from "@incubator/todo-schemas"
import { Context } from "hono"
import { setCookie } from "hono/cookie"
import { HTTPException } from "hono/http-exception"
import { sign } from "hono/jwt"

const ONE_DAY = 60 * 60 * 24
export const setAuthCookies = async (c: Context, token: string) => {
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
}
