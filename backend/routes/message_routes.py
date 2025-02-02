from fastapi import APIRouter, Depends
from controllers.message_controller import *
from models.MessageRequest import MessageRequest
from pydantic import BaseModel

router = APIRouter()


@router.post("/message")
def post_message(request: MessageRequest):
    return handle_message(request.name,request.message)
