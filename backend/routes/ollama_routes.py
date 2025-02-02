from fastapi import FastAPI
import ollama
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


    # ollama docker
    # ollama.chat(
    #     model=llm_model, #"codellama",
    #     # model = "mistral",
    #     messages=msg_to_llm,
    #     stream=False,
    #     options={
    #         "temperature":0,
    #         # "repeat_penalty":1.5,
    #         "max_tokens":1024
    #         # "top_p":1,
    #         # "frequency_penalty":0,
    #         # "presence_penalty":0
    #     }
        
    # )

    response = ollama.generate(model=llm_model,prompt=prompt)
    print(response)

    post_process(response.json()['response'])

# Run with: uvicorn app:app --host 0.0.0.0 --port 8000


@app.get("/test")
async def test():
    return {"message": "API is working!"}
