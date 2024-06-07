import { httpClient } from "../httpClient/httpClient"
export const getStorageUrl = (params) => {
    let fd = new FormData();
    fd.append('file', params.image)
    return httpClient.post("Storage", fd, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    })
}
export const getObjectVersionId = (key) => {
    return httpClient.get(`Storage/GetObjectFinalVersionId/${key}`)
}
export const uploadFile = (url, file) => {
    return fetch(url, {
        method: 'PUT',
        body: file,
        headers: {
            'Content-Type': file.type,
        }
    })

}
