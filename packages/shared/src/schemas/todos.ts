import { z } from "zod"

export const todoSchema = z
  .object({
    id: z.string(),
    title: z
      .string()
      .min(1, {
        message: "Must be at least 1 character",
      })
      .max(100, { message: "Must be maximum 100 characters" })
      .refine((val) => val.trim().length !== 0, {
        message: "Must not be empty",
      }),
    completed: z.boolean(),
    createdAt: z.date().or(z.string()),
  })
  .strip()

export type TodoSchema = z.infer<typeof todoSchema>

export const createTodoSchema = todoSchema
  .pick({
    title: true,
  })
  .extend({
    completed: z.boolean().optional(),
  })
  .strip()

export type CreateTodoSchema = z.infer<typeof createTodoSchema>

export const updateTodoSchema = createTodoSchema
  .partial()
  .extend({
    id: z.string(),
  })
  .strip()

export type UpdateTodoSchema = z.infer<typeof updateTodoSchema>

export const todosFilterSchema = z.object({
  completed: z.boolean().optional(),
})

export type TodosFilterSchema = z.infer<typeof todosFilterSchema>
