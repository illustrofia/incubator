import { extname, relative, resolve } from "node:path"

import react from "@vitejs/plugin-react-swc"
import { glob } from "glob"
import { preserveDirectives } from "rollup-plugin-preserve-directives"
import { fileURLToPath } from "url"
import { defineConfig } from "vite"
import dts from "vite-plugin-dts"

const entry = resolve(
  fileURLToPath(new URL(".", import.meta.url)),
  "src/index.ts",
)

const input = Object.fromEntries(
  glob.sync("src/**/*.{ts,tsx}").map((file) => [
    // The name of the entry point
    // src/nested/foo.ts becomes nested/foo
    relative("src", file.slice(0, file.length - extname(file).length)),
    // The absolute path to the entry file
    // src/nested/foo.ts becomes /project/src/nested/foo.ts
    fileURLToPath(new URL(file, import.meta.url)),
  ]),
)

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), dts()],
  build: {
    lib: {
      formats: ["es"],
      entry,
    },
    minify: false,
    sourcemap: true,

    rollupOptions: {
      input,
      external: ["react", "react/jsx-runtime"],
      output: {
        preserveModules: true,
        globals: {
          react: "React",
          "react/jsx-runtime": "jsx",
        },
        format: "es",
        dir: "dist",
        entryFileNames: "[name].mjs",
        // check if file is index.mjs from the root and add 'import "./style.css";' if so
        intro: (i) => {
          if (i.fileName === "index.mjs") {
            return 'import "./style.css";'
          }
          return ""
        },
      },
      plugins: [preserveDirectives()],
    },
  },

  // alias the @ to be the root of the project
  resolve: {
    alias: {
      "@": resolve(fileURLToPath(new URL(".", import.meta.url)), "src"),
    },
  },
})
