from pydantic import BaseModel

# Define request model
class MessageRequest(BaseModel):
    name: str
    message: str




class UserProfile(BaseModel):
    knowledge_level: int
    strengths: int
