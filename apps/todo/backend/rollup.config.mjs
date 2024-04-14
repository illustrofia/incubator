import typescript from "@rollup/plugin-typescript"
import { sentryRollupPlugin } from "@sentry/rollup-plugin"

import packageJson from "./package.json" assert { type: "json" }

export default {
  input: "src/index.ts",
  output: {
    dir: "dist",
    format: "esm",
    entryFileNames: "[name].mjs",
    sourcemap: true, // for sentry
  },

  plugins: [
    typescript(),
    sentryRollupPlugin({
      authToken: process.env.SENTRY_AUTH_TOKEN,
      org: "illustrofia",
      project: "todo_backend",
    }),
  ],

  external: [
    ...Object.keys(packageJson.dependencies),
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
}
