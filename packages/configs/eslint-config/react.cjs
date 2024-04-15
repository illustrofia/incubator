const config = require("./base.cjs")

/** @type {import("eslint").Linter.Config} */
module.exports = {
  ...config,
  root: false,
  extends: [
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
    "plugin:@tanstack/eslint-plugin-query/recommended",
    ...config.extends,
  ],
  rules: {
    ...config.rules,
    "react/react-in-jsx-scope": "off",
    "react/no-unknown-property": ["error", { ignore: ["css"] }],
    "react/prop-types": "off",
    "react/jsx-indent": "off",
  },
  settings: {
    react: {
      version: "detect",
    },
  },
  plugins: [...config.plugins, "react"],
}
