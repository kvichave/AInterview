"use client";
import { useEffect, useRef, useState } from "react";
import io from "socket.io-client";

export default function Home() {
  const [socket, setSocket] = useState(null);
  const [transcription, setTranscription] = useState("");
  const mediaRecorder = useRef(null);
  const [isRecording, setIsRecording] = useState(false);

  // Establish socket connection
  useEffect(() => {
    const newSocket = io("http://127.0.0.1:5000");
    setSocket(newSocket);

    newSocket.on("transcription_result", (data) => {
      setTranscription((prev) => prev + "\n" + data.text);
    });

    return () => newSocket.disconnect();
  }, []);

  const startRecording = async () => {
    setIsRecording(true);
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    mediaRecorder.current = new MediaRecorder(stream);

    mediaRecorder.current.ondataavailable = (event) => {
      if (event.data.size > 0) {
        --enable - libsrt;
        socket.emit("audio_chunk", event.data);
      }
    };

    mediaRecorder.current.start(500); // Send chunks every 500ms
  };

  const stopRecording = () => {
    setIsRecording(false);
    mediaRecorder.current?.stop();
    mediaRecorder.current = null;
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Real-time Transcription</h1>
      <button onClick={isRecording ? stopRecording : startRecording}>
        {isRecording ? "Stop Recording" : "Start Recording"}
      </button>
      <textarea
        value={transcription}
        rows={10}
        cols={50}
        readOnly
        style={{ marginTop: "20px", display: "block" }}
      />
    </div>
  );
}
