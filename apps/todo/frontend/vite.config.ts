import { resolve } from "node:path"

import { sentryVitePlugin } from "@sentry/vite-plugin"
import { TanStackRouterVite } from "@tanstack/router-vite-plugin"
import react from "@vitejs/plugin-react-swc"
import { fileURLToPath } from "url"
import { defineConfig } from "vite"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    TanStackRouterVite(),
    sentryVitePlugin({
      org: "illustrofia",
      project: "todo_frontend",
    }),
  ],

  // alias the @ to be the root of the project
  resolve: {
    alias: {
      "@": resolve(fileURLToPath(new URL(".", import.meta.url)), "src/"),
    },
  },

  build: {
    sourcemap: true,
  },
})
