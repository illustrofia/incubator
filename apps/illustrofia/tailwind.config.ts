import sharedConfig from "@incubator/tailwind-config"
import type { Config } from "tailwindcss"

const config: Pick<Config, "content" | "presets" | "plugins"> = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  presets: [sharedConfig],
  plugins: [require("@tailwindcss/typography"), require("tailwindcss-animate")],
}

export default config
