const config = require("./base.cjs")

/** @type {import("eslint").Linter.Config} */
module.exports = {
  ...config,
  root: false,
  extends: [
    // https://github.com/vercel/style-guide?tab=readme-ov-file#eslint
    require.resolve("@vercel/style-guide/eslint/next"),
    ...config.extends,
  ],
  env: {
    ...config.env,
    browser: true,
  },
}
