from fastapi.responses import RedirectResponse
from fastapi import APIRouter, Depends, HTTPException, status
from app.configs.database import user_collection
from app.models.user import user_helper, token_helper
from app.schema.user import UserCreate, UserResponse, Token
from passlib.context import CryptContext
from fastapi.security import OAuth2PasswordRequestForm, OAuth2PasswordBearer
from jose import jwt
from datetime import timedelta, datetime
from dotenv import load_dotenv
import os
from typing import Annotated

# Load environment variables
load_dotenv()

SECRET_KEY = os.getenv("SECRET_KEY", "default-secret-key")
ALGORITHM = os.getenv("ALGORITHM", "HS256")

bcrypt_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

routers = APIRouter()

@routers.post("/signup", response_model=Token)
async def create_user(user: UserCreate):
    # Check if user already exists with the provided email
    existing_user = await user_collection.find_one({"email": user.email})
    if existing_user:
        # Check if password matches
        if bcrypt_context.verify(user.password, existing_user["password"]):
            return RedirectResponse(url="/", status_code=status.HTTP_302_FOUND)
        raise HTTPException(status_code=400, detail="Incorrect password")
    
    # Check if username already exists
    existing_user = await user_collection.find_one({"username": user.username})
    if existing_user:
        raise HTTPException(status_code=400, detail="Username already registered")
    
    # Hash the password
    user_data = {
        "name": user.name,
        "username": user.username,
        "email": user.email,
        "password": bcrypt_context.hash(user.password),
    }

    # Insert into database
    new_user = await user_collection.insert_one(user_data)
    
    # Fetch the created user from the database
    created_user = await user_collection.find_one({"_id": new_user.inserted_id})

    if created_user is None:
        raise HTTPException(status_code=500, detail="User creation failed")
    
    # After creating the user, generate and return the access token
    token = await login_for_access_token(OAuth2PasswordRequestForm(username=user.username, password=user.password))

    return token_helper({"access_token": token, "token_type": "bearer"})

async def login_for_access_token(form_data: OAuth2PasswordRequestForm):
    user = await authenticate_user(form_data.username, form_data.password)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
        )
    token = create_access_token(user["username"], user["email"], timedelta(minutes=30))
    
    # Print the token
    print(f"Generated Token: {token}")  # This will print the token to the console

    return token


async def authenticate_user(username: str, password: str):
    user = await user_collection.find_one({"username": username})
    if not user:
        return False
    if not bcrypt_context.verify(password, user["password"]):
        return False
    return user

def create_access_token(username: str, email: str, expires_delta: timedelta):
    to_encode = {"sub": username, "email": email}
    expire = datetime.utcnow() + expires_delta
    to_encode = {**to_encode, "exp": expire}  # Merge dictionaries without using .update()
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt


@routers.get("/")
async def root():
    return {"message": "Hello World"}