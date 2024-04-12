import Sentry from "@sentry/node"
import { HTTPException } from "hono/http-exception"

export const initSentry = () => {
  if (!process.env.SENTRY_DSN) {
    throw new Error("SENTRY_DSN is required")
  }
  Sentry.init({ dsn: process.env.SENTRY_DSN })
}

export const captureErrorSentry = (err: Error | HTTPException) => {
  if (process.env.NODE_ENV === "production") {
    Sentry.captureException(err)
  }
}
