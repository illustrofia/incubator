const config = require("./base.cjs")

/** @type {import("eslint").Linter.Config} */
module.exports = {
  ...config,
  root: false,
  extends: [
    // https://github.com/vercel/style-guide?tab=readme-ov-file#eslint
    ...config.extends,
    require.resolve("@vercel/style-guide/eslint/next"),
  ],
  env: {
    ...config.env,
    browser: true,
  },
}
