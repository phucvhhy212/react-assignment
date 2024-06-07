import { httpClient } from "../httpClient/httpClient"
export const createBorrowingRequest = (params) => {
    return httpClient.post("BorrowingRequests",params)
}
export const getBorrowingRequests = (params) => {
    return httpClient.get("BorrowingRequests",{params})
}
export const getBorrowingHistory = () => {
    return httpClient.get("BorrowingRequests/History")
}
export const changeBorrowingRequestStatus = (params) => {
    return httpClient.put(`BorrowingRequests/ChangeStatus?id=${params.id}&status=${params.status}`)
}
export const getBorrowingRequestDetail = (id) => {
    return httpClient.get(`BorrowingRequests/${id}`)
}