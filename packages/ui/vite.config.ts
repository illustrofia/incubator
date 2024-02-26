import react from "@vitejs/plugin-react"
import { resolve } from "node:path"
import { fileURLToPath } from "url"
import { defineConfig } from "vite"
import dts from "vite-plugin-dts"
import libCss from "vite-plugin-libcss"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), libCss(), dts({ outDir: "dist/types" })],
  build: {
    sourcemap: true,
    lib: {
      entry: resolve(__dirname, "src/index.ts"),
      name: "IncubatorDesignSystem",
      fileName: "index",
      formats: ["es", "cjs"],
    },
    rollupOptions: {
      external: ["react", "react-dom"],
      output: {
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
        },
      },
    },
  },
  resolve: {
    alias: {
      "@": resolve(fileURLToPath(new URL(".", import.meta.url)), "src"),
    },
  },
})
