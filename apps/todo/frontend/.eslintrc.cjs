module.exports = {
  root: true,
  env: { browser: true, es2020: true, node: true },
  extends: [
    "@incubator/eslint-config/react.cjs",
    "plugin:@tanstack/eslint-plugin-query/recommended",
  ],
  parser: "@typescript-eslint/parser",
  plugins: ["react-refresh"],
  rules: {
    "react-refresh/only-export-components": [
      "warn",
      { allowConstantExport: true },
    ],
  },
  ignorePatterns: ["dist"],
}
