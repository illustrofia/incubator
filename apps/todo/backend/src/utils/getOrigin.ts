export const getOrigin = () => {
  if (process.env.NODE_ENV === "production" && !process.env.FRONTEND_PROD_URL) {
    throw new Error("FRONTEND_PROD_URL is not set")
  }

  return process.env.NODE_ENV === "production"
    ? process.env.FRONTEND_PROD_URL!
    : "localhost"
}
