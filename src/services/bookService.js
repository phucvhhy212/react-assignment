import { httpClient } from "../httpClient/httpClient"

export const getBooks = (params) => {
    return httpClient.get("Books", {params})
}


export const getBookDetail = (id) => {
    return httpClient.get("Books/{id}")
}

// export const updatePost = (body) => {
//     return axios
// }