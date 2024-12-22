import { useState, useRef, useEffect } from "react";
import { Button } from "./Button";

let started: boolean = false;
/**
 * Component for recording video from user's camera
 * @component
 * @param {object} props - Component props
 * @param {VideoType} props.vtype - Type of video being recorded
 * @param {React.Dispatch<React.SetStateAction<Blob | null>>} props.setBlob - State setter function for video blob
 * @returns {JSX.Element} Video recording interface with controls
 *
 * @example
 * ```tsx
 * <VideoRecorder vtype={VideoType.FRONT} setBlob={setVideoBlob} />
 * ```
 *
 * The component handles:
 * - Camera stream initialization
 * - Video recording start/stop
 * - Recording preview
 * - Upload state management
 * - Video blob creation and handling
 */
export function VideoRecorder({callback}: {callback: (blob: Blob) => void}) {
    const [recording, setRecording] = useState(false);
    const [recorder, setRecorder] = useState<MediaRecorder | null>(null);
    const [chunks, setChunks] = useState<Blob[]>([]);
    const [videoBlob, setVideoBlob] = useState<Blob | null>(null);
    const videoRef = useRef<HTMLVideoElement>(null);
    try {
        useEffect(() => {
            const getStream = async () => {
                let stream: MediaStream = await navigator.mediaDevices.getUserMedia({
                    video: true,
                    audio: false
                });
                setRecorder(new MediaRecorder(stream));
                
                if (videoRef.current) {
                    videoRef.current.srcObject = stream;
                    videoRef.current.play();
                }
            };
            getStream();
        }, []);
        
        useEffect(() => {
            if(recording) {
                started = true;
                if (recorder) {
                    recorder.ondataavailable = (event) => {
                        console.log("data available");
                        setChunks(prev => [...prev, event.data]);
                    };
                    recorder!.start(500); // collect data every half-second
                }
                
            }
            else if(started) {
                console.log('stopping');
                started = false;
                recorder?.stop();
                const blob = new Blob(chunks, { type: 'video/mp4' });
                setVideoBlob(blob);
                if (videoRef.current) {
                    videoRef.current.srcObject = null;  // Remove the stream
                    videoRef.current.src = URL.createObjectURL(blob!);
                }
                }
        }, [recording]);
        /* use the stream */
      } catch (err) {
        /* handle the error */
      }
    return (
        <div>
            <video id="video" width="640" height="480" autoPlay ref={videoRef}></video>
            {videoBlob == null ? (<Button onclick={() => setRecording(!recording)}>{recording ? 'Stop' : 'Start'}</Button>) : (
                <>
                    <Button onclick={() => {window.location.reload()}}>Record again</Button>
                    <Button onclick={() => {callback(videoBlob!)}}>Continue</Button> 
                </>
            )}
            
        </div>
    );
}
