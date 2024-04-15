const { resolve } = require("node:path")
const config = require("./base.cjs")

const vercelStyleGuide = require.resolve("@vercel/style-guide/eslint/next")
/** @type {import("eslint").Linter.Config} */
module.exports = {
  ...config,
  root: false,
  extends: [vercelStyleGuide, ...config.extends],
  env: {
    ...config.env,
    browser: true,
  },
}
