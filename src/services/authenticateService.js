import { httpClient } from "../httpClient/httpClient"

export const login = (email,password) => {
    return httpClient.post("Authenticates/Login", {email,password})
}
export const register = (email,password) => {
    return httpClient.post("Authenticates/Register", {email,password})
}