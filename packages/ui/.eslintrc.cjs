/** @type {import("eslint").Linter.Config} */
module.exports = {
  root: true,
  extends: ["@incubator/eslint-config/react-internal.js"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: "./tsconfig.json",
  },
  ignorePatterns: [
    "dist",
    ".eslintrc.cjs",
    "vite.config.ts",
    "tailwind.config.cjs",
  ],
}
