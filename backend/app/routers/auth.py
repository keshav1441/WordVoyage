from fastapi import APIRouter, HTTPException
from fastapi.responses import RedirectResponse
from werkzeug.security import generate_password_hash, check_password_hash
from app.configs.database import user_collection
from app.models.user import user_helper
from app.schema.user import UserCreate, UserResponse

routers = APIRouter()

@routers.post("/signup", response_model=UserResponse)
async def create_user(user: UserCreate):
    # Check if email already exists
    existing_user = await user_collection.find_one({"email": user.email})
    if existing_user:
        # Check if the password matches (only if email is already registered)
        if check_password_hash(existing_user["password"], user.password):
            # Redirect to home page if email and password match
            return RedirectResponse(url="/")
        else:
            raise HTTPException(status_code=400, detail="Incorrect password")

    existing_user = await user_collection.find_one({"username": user.username})
    if existing_user:
        raise HTTPException(status_code=400, detail="Username already registered")

    # Hash the password for new user
    user_data = {
        "name": user.name,
        "username": user.username,
        "email": user.email,
        "password": generate_password_hash(user.password),
    }

    # Insert into the database
    new_user = await user_collection.insert_one(user_data)
    created_user = await user_collection.find_one({"_id": new_user.inserted_id})

    return user_helper(created_user)


@routers.get("/")
async def run():
    return {"message": "Hello World"}