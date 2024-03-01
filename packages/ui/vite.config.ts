import react from "@vitejs/plugin-react"
import { resolve } from "node:path"
import { fileURLToPath } from "url"
import { defineConfig } from "vite"
import dts from "vite-plugin-dts"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), dts()],
  build: {
    sourcemap: true,
    lib: {
      entry: resolve(__dirname, "src/index.ts"),
      name: "IncubatorDesignSystem",
      fileName: "index",
    },
    rollupOptions: {
      external: ["react", "react/jsx-runtime"],
      output: [
        {
          intro: 'import "./style.css";',
          format: "es",
          dir: "dist",
          entryFileNames: "[name].mjs",
        },
        {
          intro: 'import "./style.css";',
          format: "cjs",
          dir: "dist",
          entryFileNames: "[name].cjs",
        },
      ],
    },
  },
  resolve: {
    alias: {
      "@": resolve(fileURLToPath(new URL(".", import.meta.url)), "src"),
    },
  },
})
