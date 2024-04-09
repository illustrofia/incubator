export const getOrigin = () => {
  if (process.env.NODE_ENV === "production" && !process.env.DOMAIN) {
    throw new Error("DOMAIN is not set")
  }

  return process.env.NODE_ENV === "production"
    ? process.env.DOMAIN!
    : "localhost"
}
