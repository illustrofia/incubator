import typescript from "@rollup/plugin-typescript"
import { sentryRollupPlugin } from "@sentry/rollup-plugin"

export default {
  input: "src/index.ts",
  output: {
    dir: "dist",
    format: "esm",
    entryFileNames: "[name].mjs",
    sourcemap: true, // for sentry
  },
  external: [
    "@sentry/node",
    "@hono/node-server",
    "@hono/zod-validator",
    "@incubator/shared",
    "@prisma/client",
    "argon2",
    "dotenv",
    "hono",
    "hono/cookie",
    "hono/cors",
    "hono/http-exception",
    "hono/jwt",
    "hono/logger",
    "hono/factory",
  ],

  watch: {
    clearScreen: false,
  },

  plugins: [
    typescript(),
    sentryRollupPlugin({
      authToken: process.env.SENTRY_AUTH_TOKEN,
      org: "illustrofia",
      project: "todo_backend",
    }),
  ],
}
