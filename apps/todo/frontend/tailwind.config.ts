import sharedConfig from "@incubator/tailwind-config"
import type { Config } from "tailwindcss"
import tailwindCssAnimate from "tailwindcss-animate"

const config: Pick<Config, "content" | "presets" | "plugins"> = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  presets: [sharedConfig],
  plugins: [tailwindCssAnimate],
}

export default config
