const config = require("./base.cjs")

/** @type {import("eslint").Linter.Config} */
module.exports = {
  ...config,
  root: false,
  extends: [
    ...config.extends,
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
    "plugin:@tanstack/eslint-plugin-query/recommended",
  ],
  rules: {
    ...config.rules,
    "react/react-in-jsx-scope": "off",
    "react/no-unknown-property": ["error", { ignore: ["css"] }],
    "react/prop-types": "off",
    "react/jsx-indent": "off",
    "react-refresh/only-export-components": [
      "warn",
      { allowConstantExport: true },
    ],
  },
  settings: {
    react: {
      version: "detect",
    },
  },
  plugins: [...config.plugins, "react", "react-refresh"],
}
