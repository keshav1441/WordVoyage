from bson.objectid import ObjectId

# Helper to convert MongoDB document to dictionary
def user_helper(user) -> dict:
    return {
        "id": str(user["_id"]),
        "name": user["name"],
        "username" : user["username"],
        "email": user["email"],
        "password": user["password"],
    }
class Users:
    def __init__(self, name: str, email: str):
        self.name = name
        self.email = email
