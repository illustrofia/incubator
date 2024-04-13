import sharedConfig from "@incubator/tailwind-config"
import type { Config } from "tailwindcss"

const config: Pick<Config, "content" | "presets"> = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  presets: [sharedConfig],
}

export default config
