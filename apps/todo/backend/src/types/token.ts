import { UserSchema } from "@incubator/todo-shared"

export type Token = Pick<UserSchema, "email">
