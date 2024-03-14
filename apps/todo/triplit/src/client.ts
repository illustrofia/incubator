import { TriplitClient } from "@triplit/client"
import { schema } from "../triplit/schema.js"

export const triplit = new TriplitClient({
  schema,
  storage: "indexeddb",
  token: import.meta.env.VITE_TRIPLIT_TOKEN,
  serverUrl: import.meta.env.VITE_TRIPLIT_SERVER_URL,
})
