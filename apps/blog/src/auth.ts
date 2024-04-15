import { NextResponse } from "next/server"
import NextAuth from "next-auth"
import Google from "next-auth/providers/google"

export const { auth, handlers, signIn, signOut } = NextAuth({
  providers: [Google],
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user
      const isHome = nextUrl.pathname === "/"
      if (isLoggedIn && isHome) {
        return NextResponse.redirect(new URL("/dashboard", nextUrl))
      }

      if (!isLoggedIn && !isHome) {
        return NextResponse.redirect(new URL("/", nextUrl))
      }

      return true
    },
  },
})
