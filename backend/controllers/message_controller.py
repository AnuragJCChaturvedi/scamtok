from utils.process_user_profile import *

def handle_message(name,message):
    return {
        "success": True,
        "received": {
            "name": name,
            "message": message
        }
    }
