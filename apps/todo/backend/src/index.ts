import { auth, todos, user } from "@/routes"
import { serve } from "@hono/node-server"
import { sentry } from "@hono/sentry"
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
const app = new Hono()

app
  .use(logger())
  .use("*", cors({ origin: getOrigin(), credentials: true }))
  .use("*", sentry({ dsn: process.env.SENTRY_DNS }))
  .route("/v1", auth)
  .route("/v1", user)
  .route("/v1", todos)

app.get("/", (c) => c.json({ message: "Hello World!" }, 200))

app.onError((err, c) => {
  c.get("sentry").captureException(err)
  if (err instanceof HTTPException) {
    const { message, cause, status } = err
    return c.json({ message, cause }, status)
  }

  return c.json({ message: "Internal Server Error", cause: err }, 500)
})

const port = Number(process.env.PORT ?? 3000)
serve({
  fetch: app.fetch,
  port,
})

console.log(`Server running at http://localhost:${port}`)
