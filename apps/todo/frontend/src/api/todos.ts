import {
  TodoCreateSchema,
  TodoUpdateSchema,
  TodosFilterSchema,
  todoSchema,
} from "@incubator/shared"

import { z } from "zod"
import { API_BASEPATH } from "."

const todosSchema = z.array(todoSchema)

export const getTodos = async (filters?: TodosFilterSchema) => {
  const { completed } = filters || {}
  const response = await fetch(
    `${API_BASEPATH}/todos?${
      completed !== undefined ? `completed=${completed}` : ""
    }`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    },
  )
  const json = await response.json()
  return todosSchema.parse(json)
}

export const createTodo = async ({ title }: TodoCreateSchema) => {
  const response = await fetch(`${API_BASEPATH}/todos`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({ title }),
  })
  const json = await response.json()
  return todoSchema.parse(json)
}

export const updateTodo = async (todo: TodoUpdateSchema) => {
  const response = await fetch(`${API_BASEPATH}/todos/${todo.id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(todo),
  })
  const json = await response.json()
  return todoSchema.parse(json)
}

export const deleteTodo = async (id: string) => {
  const response = await fetch(`${API_BASEPATH}/todos/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  })
  const json = await response.json()
  return todoSchema.parse(json)
}
