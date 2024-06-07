import { httpClient } from "../httpClient/httpClient"
export const getUserRequest = () => {
    return httpClient.get("UserRequests")
}
export const createUserRequest = (params) => {
    return httpClient.post("UserRequests",params)
}
export const deleteUserRequest = (id) => {
    return httpClient.delete(`UserRequests/${id}`)
}
