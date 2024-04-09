import { auth, todos, user } from "@/routes"
import { serve } from "@hono/node-server"
import { getOrigin } from "@utils"
import dotenv from "dotenv"
import { Hono } from "hono"
import { cors } from "hono/cors"
import { logger } from "hono/logger"

dotenv.config()

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

app.route("/api/v1", auth)
app.route("/api/v1", user)
app.route("/api/v1", todos)

serve({
  fetch: app.fetch,
  port,
})

console.log(`Server running at http://localhost:${port}`)
