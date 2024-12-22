import { VideoRecorder } from "../VideoRecorder";
import { UploadState, VideoType } from "../types"
import { upload } from "../upload";
import { useState } from "react";
export default function RCV() {
    const [uploadState, setUploadState] = useState<UploadState>(UploadState.NOT_STARTED);
    const helper_upload = async (videoBlob: Blob) => {
        setUploadState(await upload(videoBlob!,() => setUploadState(UploadState.UPLOADING),VideoType.CV,{path_length: }))
    }
    return (
        <div>
            <h1>Record the checkerboard video</h1>
            <VideoRecorder vtype={VideoType.CV} />
        </div>
    );
}