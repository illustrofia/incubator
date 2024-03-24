import { userSchema } from "@incubator/shared"
import { z } from "zod"
import { API_BASEPATH } from "."

const returnUserSchema = userSchema.or(
  z.object({
    message: z.string(),
  }),
)

export const getMe = async () => {
  const response = await fetch(`${API_BASEPATH}/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  })
  const json = await response.json()
  return returnUserSchema.parse(json)
}
