import { z } from "zod"

export const userSchema = z
  .object({
    id: z.string(),
    username: z
      .string()
      .min(3, { message: "Username must be at least 3 characters" })
      .refine((value) => value.trim().length > 0, {
        message: "You can't just use spaces for a username 🙃",
      }),
    email: z.string().min(1, { message: "Email is required" }).email({
      message: "Must be a valid email",
    }),
  })
  .strip()

export type UserSchema = z.infer<typeof userSchema>

export const userLoginSchema = userSchema
  .pick({ email: true })
  .extend({
    password: z
      .string()
      .min(6, { message: "Password must be at least 6 characters" })
      .refine((value) => value.trim().length > 0, {
        message: "You can't just use spaces for a password 🙃",
      }),
  })
  .strip()

export type UserLoginSchema = z.infer<typeof userLoginSchema>

export const userSignupSchema = userSchema
  .pick({ username: true })
  .merge(userLoginSchema)
  .extend({
    confirmPassword: z
      .string()
      .min(6, { message: "Password must be at least 6 characters" })
      .refine((value) => value.trim().length > 0, {
        message: "You can't just use spaces for a password 🙃",
      }),
  })
  .strip()
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  })

export type UserSignupSchema = z.infer<typeof userSignupSchema>
