import "./global.css"
import "@incubator/tailwind-config/global.css"

import React from "react"
import ReactDOM from "react-dom/client"

import App from "./app"
import { initSentry } from "./utils"

initSentry()

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
