import { resolve } from "node:path"

import react from "@vitejs/plugin-react-swc"
import { fileURLToPath } from "url"
import { defineConfig } from "vite"
import dts from "vite-plugin-dts"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), dts()],
  build: {
    lib: {
      formats: ["es"],
      entry: resolve(
        fileURLToPath(new URL(".", import.meta.url)),
        "src/index.ts",
      ),
    },
    minify: false,
    sourcemap: true,

    rollupOptions: {
      external: ["react", "react/jsx-runtime"],
      output: {
        globals: {
          react: "React",
          "react/jsx-runtime": "jsx",
        },
        format: "es",
        dir: "dist",
        entryFileNames: "[name].mjs",
        intro: 'import "./style.css";',
      },
    },
  },

  // alias the @ to be the root of the project
  resolve: {
    alias: {
      "@": resolve(fileURLToPath(new URL(".", import.meta.url)), "src"),
    },
  },
})
