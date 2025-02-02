from fastapi import fastapi
import requests
import json
import subprocess
from MessageRequest import UserProfile
from utils.general import *

app = FastAPI()






@app.post("/generate")
async def generate_text(request:UserProfile):
    """
    Receives a user profile (JSON) and returns text results from an Ollama model.
    """
    print(request)

    prompt = make_prompt({"knowledge_level":request.knowledge_level,"strengths":request.strengths})

    ollama_payload = {
        "model": "deepseek-r1:1.5b",  # Change to the Ollama model you're using
        "prompt": prompt,
        "stream": False
    }
    
    response = requests.post(OLLAMA_URL, json=ollama_payload)

    if response.status_code == 200:
        return post_process(response.json()['response'])
    else:
        return {"error": "Failed to fetch response from Ollama"}

# Run with: uvicorn app:app --host 0.0.0.0 --port 8000


@app.get("/test")
async def test():
    return {"message": "API is working!"}
