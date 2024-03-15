import tailwindcss from "@tailwindcss/vite"
import react from "@vitejs/plugin-react-swc"
import { resolve } from "node:path"
import { fileURLToPath } from "url"
import { PluginOption, defineConfig } from "vite"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss() as PluginOption],
  // alias the @ to be the root of the project
  resolve: {
    alias: {
      "@": resolve(fileURLToPath(new URL(".", import.meta.url)), "src"),
    },
  },
})
