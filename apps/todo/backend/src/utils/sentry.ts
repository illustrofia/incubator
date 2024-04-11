import Sentry from "@sentry/node"

export const initSentry = () => {
  if (!process.env.SENTRY_DSN) {
    throw new Error("SENTRY_DSN is required")
  }
  Sentry.init({ dsn: process.env.SENTRY_DSN })
}

export const captureSentryException = (err: any) => {
  if (process.env.NODE_ENV === "production") {
    Sentry.captureException(err)
  }
}
