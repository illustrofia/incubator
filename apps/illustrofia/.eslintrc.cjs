/** @type {import("eslint").Linter.Config} */
module.exports = {
  root: true,
  extends: ["@incubator/eslint-config/next.cjs"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: true,
  },
}
