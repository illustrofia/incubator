import { TanStackRouterVite } from "@tanstack/router-vite-plugin"
import react from "@vitejs/plugin-react-swc"
import { resolve } from "node:path"
import { fileURLToPath } from "url"
import { defineConfig } from "vite"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), TanStackRouterVite()],
  server: {
    port: 8080,
  },
  preview: {
    port: 8080,
  },
  // alias the @ to be the root of the project
  resolve: {
    alias: {
      "@": resolve(fileURLToPath(new URL(".", import.meta.url)), "src/"),
    },
  },
})
