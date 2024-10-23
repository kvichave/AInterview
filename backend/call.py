from flask import Blueprint, request, jsonify, session,send_from_directory
import os
import google.generativeai as genai
import json
import asyncio

import audio_controller
# Configure the Gemini API key
genai.configure(api_key="AIzaSyC0O4dCvtLxrXg3BMBciSzrXhO3Vkb5Irw")

# Create a blueprint for user-related routes
call = Blueprint('call', __name__)
AUDIO_FOLDER = 'AUDIOS'

# Set the directory to save audio files
UPLOAD_FOLDER = 'uploads'
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

# Define the path for the JSON file to store conversation history
HISTORY_FILE_PATH = 'session_data.json'

def load_history():
    """Load conversation history from a JSON file."""
    if os.path.exists(HISTORY_FILE_PATH):
        with open(HISTORY_FILE_PATH, 'r') as f:
            return json.load(f)
    return []  # Return an empty list if the file does not exist

def save_history(history):
    """Save conversation history to a JSON file."""
    with open(HISTORY_FILE_PATH, 'w') as f:
        json.dump(history, f, indent=4)

@call.route('/send_audio', methods=['POST'])
async def send_audio():
    # Check if the audio file is provided
    if 'audio' not in request.files:
        return jsonify({"error": "No audio file provided"}), 400

    audio_file = request.files['audio']
    file_path = os.path.join(UPLOAD_FOLDER, "recorded_audio.mp3")
    
    # Save the audio file
    audio_file.save(file_path)

    # Transcribe the audio file
    user_reply = transcribe(file_path)
    
    # Add the transcription to the conversation history and generate a response
    bot_reply = generate(user_reply)
    print("bot_reply::::::::::::: ",bot_reply)
    # print("type::::::::::::: ",type(bot_reply))


    json_data = json.loads(bot_reply)
    # reply_list=await((json_data))   
    if type(json_data) == dict:
        json_data = [json_data]
    print("json_data::::::::::::: ",json_data)
    # Run speakers in the background without blocking the current loop
    reply_list = await audio_controller.speakers(json_data)

    # Wait for the result (non-blocking)
    print("reply_list:::::::::::: ",reply_list)
    audio_urls = [f'http://127.0.0.1:5000/audio/{file.split("/")[-1]}' for file in reply_list]
    # return jsonify(audio_urls)

    return jsonify({"message": "Audio received and transcribed successfully!", "user_reply": user_reply, "bot_reply": bot_reply, "audio_urls": audio_urls}), 200

def transcribe(file_path):
    """Transcribe the uploaded audio file using Gemini."""
    # Upload the file to Gemini
    myfile = genai.upload_file(file_path)
    
    # Generate the transcription
    model = genai.GenerativeModel("gemini-1.5-flash")
    result = model.generate_content([myfile, "Transcribe this audio clip, provide only plain text response"])
    
    # Return the transcription
    return result.text

def generate(user_reply):
    """Generate a bot response using the Gemini model based on user reply and conversation history."""
    
    # Load conversation history from JSON file
    history = load_history()
    
    # Add the user's transcription to the conversation history
    history.append({
        "role": "user",
        "parts": [user_reply]
    })
    
    # Create the model
    generation_config = {
        "temperature": 1,
        "top_p": 0.95,
        "top_k": 64,
        "max_output_tokens": 8192,
        "response_mime_type": "application/json",
    }

    model = genai.GenerativeModel(
        model_name="gemini-1.5-flash",
        generation_config=generation_config,
    )
    print("11111111111111111111")
    # Start the chat session with the current conversation history
    chat_session = model.start_chat(
        history=history
    )
    print("222222222222222222222222222")

    # Send the user transcription to the AI model for a response
    response = chat_session.send_message(user_reply)
    print("33333333333333333333333333333333333")
    # Append the AI's reply to the conversation history
    history.append({
        "role": "model",
        "parts": [response.text]
    })

    # Save the updated history back to the JSON file
    save_history(history)

    # Return the AI's reply
    print("response.text::::::::::::: ",response.text)
    return response.text


@call.route('/audio/<path:filename>', methods=['GET'])
def serve_audio(filename):
    # Serve audio files from the AUDIOS directory
    return send_from_directory(AUDIO_FOLDER, filename)

