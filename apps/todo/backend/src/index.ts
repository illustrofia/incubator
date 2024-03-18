import { serve } from "@hono/node-server"
import dotenv from "dotenv"
import { Hono } from "hono"
import { cors } from "hono/cors"
import { auth } from "./routes"

dotenv.config()

const app = new Hono()
const port = Number(process.env.PORT ?? 3000)

const origin =
  process.env.NODE_ENV === "production"
    ? process.env.FRONTEND_PROD_URL!
    : "http://localhost:5173"

app.use(
  "*",
  cors({
    origin,
    credentials: true,
  }),
)

app.route("/api/v1", auth)

serve({
  fetch: app.fetch,
  port,
})
console.log(`Server running at http://localhost:${port}`)
