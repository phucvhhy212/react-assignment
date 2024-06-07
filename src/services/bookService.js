import { httpClient } from "../httpClient/httpClient"

export const getBooks = (params) => {
    return httpClient.get("Books", {params})
}
export const getBookDetail = (id) => {
    return httpClient.get(`Books/${id}`)
}
export const createBook = (request) => {
    return httpClient.post("Books",request)
}
export const editBook = (id,params) => {
    return httpClient.put(`Books/${id}`,params)
}
export const deleteBook = (id) => {
    return httpClient.delete(`Books/${id}`)
}
export const getBooksByCategoryId = (params) => {
    return httpClient.get("Books/GetByCategoryId",{params})
}