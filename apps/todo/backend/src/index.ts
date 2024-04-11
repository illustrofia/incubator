import { auth, todos, user } from "@/routes"
import { serve } from "@hono/node-server"
import Sentry from "@sentry/node"
import { getOrigin } from "@utils"
import dotenv from "dotenv"
import { Hono } from "hono"
import { cors } from "hono/cors"
import { HTTPException } from "hono/http-exception"
import { logger } from "hono/logger"

dotenv.config()

if (!process.env.SENTRY_DSN) {
  throw new Error("SENTRY_DSN is required")
}
Sentry.init({ dsn: process.env.SENTRY_DSN })

const app = new Hono()
app
  .use(logger())
  .use("*", cors({ origin: getOrigin(), credentials: true }))
  .route("/v1", auth)
  .route("/v1", user)
  .route("/v1", todos)

app.get("/healthy", (c) => c.json({ message: "Alive and kicking!" }, 200))

app.onError((err, c) => {
  if (err instanceof HTTPException) {
    const { message, cause, status } = err
    status === 500 && Sentry.captureException(err)
    return c.json({ message, cause }, status)
  }

  Sentry.captureException(err)
  return c.json({ message: "Internal Server Error", cause: err }, 500)
})

const port = Number(process.env.PORT ?? 3000)
serve({
  fetch: app.fetch,
  port,
})

console.log(`Server running at http://localhost:${port}`)
