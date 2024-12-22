import { VideoRecorder } from "../VideoRecorder";
import { VideoType } from "../types";
export default function RGV() {
    return (
        <div>
            <h1>Record the gait video</h1>
            <VideoRecorder vtype={VideoType.GV} />
        </div>
    );
}