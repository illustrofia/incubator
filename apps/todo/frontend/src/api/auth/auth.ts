import {
  UserLoginSchema,
  userSchema,
  UserSignupSchema,
} from "@incubator/todo-shared"
import { z } from "zod"

import { API_BASEPATH } from ".."

const authReturnSchema = z.object({
  user: userSchema.optional(),
  message: z.string().optional(),
})

export const login = async (loginCredentials: UserLoginSchema) => {
  const response = await fetch(`${API_BASEPATH}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(loginCredentials),
  })
  const json = await response.json()
  return authReturnSchema.parse(json)
}

export const logout = async () => {
  const response = await fetch(`${API_BASEPATH}/auth/logout`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  })
  return response
}

export const signup = async (signupCredentials: UserSignupSchema) => {
  const response = await fetch(`${API_BASEPATH}/auth/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(signupCredentials),
  })
  const json = await response.json()
  return authReturnSchema.parse(json)
}
