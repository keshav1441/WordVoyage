import motor.motor_asyncio
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

MONGO_DETAILS = os.getenv("MONGO_URI")  # MongoDB connection string from .env
client = motor.motor_asyncio.AsyncIOMotorClient(MONGO_DETAILS)
database = client["user_db"]  # Replace with your database name
user_collection = database.get_collection("users")  # Replace with your collection name

def get_db():
    return database
