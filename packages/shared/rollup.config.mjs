import typescript from "@rollup/plugin-typescript"

export default {
  input: "src/index.ts",
  output: {
    dir: "dist",
    format: "esm",
    entryFileNames: "[name].mjs",
  },
  external: ["zod"],
  watch: { clearScreen: false },
  plugins: [typescript()],
}
