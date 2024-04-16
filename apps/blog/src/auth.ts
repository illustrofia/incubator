import { PrismaAdapter } from "@auth/prisma-adapter"
import { NextResponse } from "next/server"
import NextAuth from "next-auth"
import Google from "next-auth/providers/google"

import { db } from "@/db"

export const { auth, handlers, signIn, signOut } = NextAuth({
  providers: [Google],
  session: {
    strategy: "jwt",
    maxAge: 60 * 60 * 24,
    updateAge: 60 * 60,
  },
  adapter: PrismaAdapter(db),
  callbacks: {
    session: async ({ token, session }) => {
      if (token.sub && session.user) {
        session.user.id = token.sub
      }
      return session
    },
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user
      const isHome = nextUrl.pathname === "/"

      if (!isLoggedIn && !isHome) {
        return NextResponse.redirect(new URL("/", nextUrl))
      }

      return true
    },
  },
})
