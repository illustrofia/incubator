import { auth, todos, user } from "@/routes"
import { serve } from "@hono/node-server"
import { captureSentryException, getOrigin, initSentry } from "@utils"
import dotenv from "dotenv"
import { Hono } from "hono"
import { cors } from "hono/cors"
import { HTTPException } from "hono/http-exception"
import { logger } from "hono/logger"

dotenv.config()

initSentry()

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
    status === 500 && captureSentryException(err)
    return c.json({ message, cause }, status)
  }

  captureSentryException(err)
  return c.json({ message: "Internal Server Error", cause: err }, 500)
})

const port = Number(process.env.PORT ?? 3000)
serve({
  fetch: app.fetch,
  port,
})

console.log(`Server running at http://localhost:${port}`)
