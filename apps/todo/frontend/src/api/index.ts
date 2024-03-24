export * from "./auth"
export * from "./user"

export const API_BASEPATH =
  import.meta.env.VITE_API_BASEPATH || "http://localhost:3000/api/v1"
