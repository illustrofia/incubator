import Cookies from "js-cookie"

export const hasAuthToken = () => !!Cookies.get("hasAuthToken")
