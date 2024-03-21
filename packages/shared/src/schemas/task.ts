import { z } from "zod"

export const taskSchema = z
  .object({
    id: z.number(),
    title: z
      .string()
      .min(1, {
        message: "Title must be at least 1 character",
      })
      .max(100, { message: "Title must be maximum 100 characters" }),
    completed: z.boolean(),
    createdAt: z.date().or(z.string()),
  })
  .strip()

export type TaskSchema = z.infer<typeof taskSchema>

export const createTaskSchema = taskSchema
  .pick({
    title: true,
  })
  .extend({
    completed: z.boolean().optional(),
  })
  .strip()

export type CreateTaskSchema = z.infer<typeof createTaskSchema>

export const updateTaskSchema = createTaskSchema
  .partial()
  .extend({
    id: z.number(),
  })
  .strip()

export type UpdateTaskSchema = z.infer<typeof updateTaskSchema>

export const getTasksSchema = z.object({
  completed: z.boolean().optional(),
})

export type GetTasksSchema = z.infer<typeof getTasksSchema>
