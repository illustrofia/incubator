import { prisma } from "@db/client"
import {
  UserLoginSchema,
  UserSchema,
  UserSignupSchema,
} from "@incubator/shared"
import { PrismaClient } from "@prisma/client"
import { hash, verify } from "argon2"
import { HTTPException } from "hono/http-exception"

export interface AuthRepository {
  verifyUser: (userLoginPayload: UserLoginSchema) => Promise<UserSchema>
  createUser: (userSignupPayload: UserSignupSchema) => Promise<UserSchema>
}

class PrismaAuthRepository implements AuthRepository {
  constructor(private prisma: PrismaClient) {}

  verifyUser = async ({ email, password }: UserLoginSchema) => {
    const user = await this.prisma.user.findUnique({
      where: {
        email,
      },
    })

    if (!user) {
      throw new HTTPException(401, { message: "User not found" })
    }

    const validPassword = await verify(user.password, password)
    if (!validPassword) {
      throw new HTTPException(401, { message: "Invalid password" })
    }

    const { password: _, ...userWithoutPassword } = user
    return userWithoutPassword
  }

  createUser = async ({ email, password, username }: UserSignupSchema) => {
    const user = await this.prisma.user.findUnique({
      where: {
        email,
      },
    })

    if (user) {
      throw new HTTPException(400, { message: "User already exists" })
    }

    const passwordHash = await hash(password)
    const newUser = await this.prisma.user.create({
      data: {
        username,
        email,
        password: passwordHash,
      },
    })

    const { password: _, ...userWithoutPassword } = newUser
    return userWithoutPassword
  }
}

export const authRepository: AuthRepository = new PrismaAuthRepository(prisma)
