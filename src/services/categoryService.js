import { httpClient } from "../httpClient/httpClient"
export const getCategories = (params) => {
    return httpClient.get("Categories", {params})
}
export const deleteCategory = (id) => {
    return httpClient.delete(`Categories/${id}`)
}
export const createCategory = (params) => {
    return httpClient.post(`Categories`,params)
}
export const getCategoryDetail = (id) => {
    return httpClient.get(`Categories/${id}`)
}
export const editCategory = (id,params) => {
    return httpClient.put(`Categories/${id}`,params)
}