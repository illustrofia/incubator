// This configuration only applies to the package manager root.
/** @type {import("eslint").Linter.Config} */
module.exports = {
  ignorePatterns: ["apps/**", "packages/**"],
  extends: ["@incubator/eslint-config/base.cjs"],
  parserOptions: {
    project: true,
  },
}
