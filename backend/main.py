from fastapi import FastAPI
from models.MessageRequest import MessageRequest
from routes.message_routes import router as message_router

app = FastAPI()

# POST API endpoint
app.include_router(message_router, prefix="/api")

# Run the server: uvicorn main:app --reload
