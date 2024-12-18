from flask import Flask
from flask_socketio import SocketIO
import os
import whisper
import random
import threading
from collections import deque
import time

# Flask and SocketIO Setup
app = Flask(__name__)
app.config["SECRET_KEY"] = "your-secret-key"
socketio = SocketIO(app, cors_allowed_origins="*")

# Load Whisper model
model = whisper.load_model("base")
print("Whisper model loaded.")

# Audio chunks and buffer
audio_chunks = deque()  # Use deque for thread-safe operations
chunk_limit = 50  # Number of chunks to process in one batch
transcribed_text = ""

# Ensure `received_audio` directory exists
os.makedirs("received_audio", exist_ok=True)

@socketio.on("audio_chunk")
def handle_audio_chunk(audio_data):
    """
    Handles incoming audio chunks sent by the client.
    """
    global audio_chunks
    try:
        # Append audio data to the buffer
        audio_chunks.append(audio_data)
        print(f"Received chunk of size: {len(audio_data)} bytes (Total: {len(audio_chunks)})")

        # Process audio chunks when the limit is reached
        if len(audio_chunks) >= chunk_limit:
            # Extract the required number of chunks
            chunks_to_process = [audio_chunks.popleft() for _ in range(chunk_limit)]

            # Generate a unique file name
            file_name = f"received_audio/audio_{random.randint(1, 999999999)}.mp3"
            audio_data = b"".join(chunks_to_process)

            # Process the chunks in a separate thread
            thread = threading.Thread(target=transcribe_audio, args=(file_name, audio_data))
            thread.start()
    except Exception as e:
        print(f"Error processing audio chunk: {e}")

def transcribe_audio(file_name, audio_data):
    """
    Processes and transcribes audio data using Whisper.
    """
    try:
        # Save the received audio data as a file
        print("Saving audio file...")
        with open(file_name, "wb") as f:
            f.write(audio_data)
        print(f"Audio file saved: {file_name}")

        # Transcribe the audio using Whisper
        print("Starting transcription...")
        result = model.transcribe(file_name)
        transcription = result['text']
        print("Transcription result:", transcription)

        # Emit the transcription result to the client
        socketio.emit("transcription_result", {"text": transcription})
    except Exception as e:
        print(f"Error during transcription: {e}")
    finally:
        # Clean up saved audio file after processing
        if os.path.exists(file_name):
            os.remove(file_name)

@socketio.on("stop")
def handle_stop():
    """
    Stops audio processing, transcribes remaining data, and emits the final result.
    """
    global audio_chunks
    wav_file_path = "recording.wav"

    try:
        # Combine remaining audio chunks into a single byte stream
        audio_data = b"".join(audio_chunks)
        audio_chunks.clear()

        # Save as a WAV file
        if os.path.exists(wav_file_path):
            os.remove(wav_file_path)
        with open(wav_file_path, "wb") as audio_f:
            audio_f.write(audio_data)

        print(f"Saved final WAV file: {wav_file_path}")

        # Transcribe the combined audio data
        result = model.transcribe(wav_file_path)
        transcription = result["text"]
        print(f"Final Transcription: {transcription}")

        # Emit the transcription result to the client
        socketio.emit("transcription_result", {"text": transcription})
    except Exception as e:
        print(f"Error during final transcription: {e}")
    finally:
        # Clean up the temporary WAV file
        if os.path.exists(wav_file_path):
            os.remove(wav_file_path)

@socketio.on("connect")
def handle_connect():
    print("Client connected")

@socketio.on("disconnect")
def handle_disconnect():
    print("Client disconnected")

if __name__ == "__main__":
    socketio.run(app, debug=True)
