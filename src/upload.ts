import { UploadState, VideoType } from "./types"
export async function upload(blob: Blob,onProgress: () => void,type:VideoType,props: object): Promise<UploadState> {
    let state: UploadState = UploadState.UPLOADING
    try {
        let path = "http://" + window.location.hostname + ":3000"
        if(type == VideoType.CV) path += "/cv"
        else if (type == VideoType.GV) path += "/gv"
        let request = new XMLHttpRequest()
        const fileData = new FormData()
        fileData.append("file",blob)
        request.open("POST",path)

        request.setRequestHeader("Path-Length", String(2))
        // wait for request to finish or fail
        await new Promise((resolve, reject) => {
            request.upload.addEventListener("progress", onProgress)

            request.addEventListener("load", () => {
                if (request.status >= 200 && request.status < 300) {
                    state = UploadState.UPLOADED
                    resolve(null)
                } else {
                    reject(new Error(`HTTP ${request.status}: ${request.statusText}`))
                }
            })
            request.addEventListener("error", () => {
                reject(new Error('Network error occurred'))
            })
            request.send(fileData)
        })
    } catch (error) {
        console.log("Error thrown:", error)
        state = UploadState.ERROR
    }
    return state
    

}