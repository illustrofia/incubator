import { auth, todos, user } from "@/routes"
import { serve } from "@hono/node-server"
import Sentry from "@sentry/node"
import { nodeProfilingIntegration } from "@sentry/profiling-node"
import { getOrigin } from "@utils"
import dotenv from "dotenv"
import { Hono } from "hono"
import { cors } from "hono/cors"
import { logger } from "hono/logger"

dotenv.config()

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  integrations: [nodeProfilingIntegration()],
  // Performance Monitoring
  tracesSampleRate: 1.0, //  Capture 100% of the transactions
  // Set sampling rate for profiling - this is relative to tracesSampleRate
  profilesSampleRate: 1.0,
})

const app = new Hono()
const port = Number(process.env.PORT ?? 3000)

const origin = getOrigin()

app.use(
  "*",
  cors({
    origin,
    credentials: true,
  }),
)
app.use(logger())

app.get("/", (c) => c.json({ message: "Hello World!" }, 200))

app.route("/v1", auth)
app.route("/v1", user)
app.route("/v1", todos)

app.onError((err, c) => {
  return c.json({ message: "Internal Server Error", cause: err }, 500)
})

const transaction = Sentry.startTransaction({
  op: "test",
  name: "My First Test Transaction",
})

setTimeout(() => {
  try {
    foo()
  } catch (e) {
    Sentry.captureException(e)
  } finally {
    transaction.finish()
  }
}, 99)

serve({
  fetch: app.fetch,
  port,
})

console.log(`Server running at http://localhost:${port}`)
