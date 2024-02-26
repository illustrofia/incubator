/** @type {import("eslint").Linter.Config} */
module.exports = {
  root: true,
  extends: ["@incubator/eslint-config/next.js"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: true,
  },
  ignorePatterns: [
    "node_modules",
    ".next",
    ".eslintrc.cjs",
    "postcss.config.js",
  ],
}
