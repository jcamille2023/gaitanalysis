import { useState, useRef, useEffect } from "react";
import { Button } from "./Button";
let started: boolean = false;
export function VideoRecorder() {
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
                console.log('recording');
                if (recorder) {
                    recorder.ondataavailable = (event) => {
                        console.log("data available");
                        setChunks(prev => [...prev, event.data]);
                    };
                    recorder.start(1000); // collect data every second
                }
                
            }
            else if(started) {
                console.log('stopping');
                started = false;
                recorder?.stop();
                recorder?.stop();
                const blob = new Blob(chunks, { type: 'video/webm' });
                setVideoBlob(blob);
                if (videoRef.current) {
                    videoRef.current.srcObject = null;  // Remove the stream
                    videoRef.current.src = URL.createObjectURL(blob);
                }
                }
            console.log(started);
        }, [recording]);
        /* use the stream */
      } catch (err) {
        /* handle the error */
      }
    return (
        <div>
        <video id="video" width="640" height="480" autoPlay ref={videoRef}></video>
        <Button onclick={() => setRecording(!recording)}>{recording ? 'Stop' : 'Start'}</Button>
        </div>
    );
}
