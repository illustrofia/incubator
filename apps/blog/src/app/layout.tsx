import "@incubator/tailwind-config/global.css"

import type { Metadata } from "next"
import { Inter } from "next/font/google"

import { ThemeProvider } from "@/providers/theme-provider"
import { cn } from "@/utils"

// TODO: eslint is not throwing an error here. Fix it.
import { Header } from "./components/header"

const fontSans = Inter({ subsets: ["latin"], variable: "--font-sans" })

export const metadata: Metadata = {
  title: "Thoughtful",
  description: "A blog platform for thoughtful people.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          "bg-background min-h-screen font-sans antialiased",
          fontSans.variable,
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
