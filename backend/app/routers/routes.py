from fastapi import APIRouter
from app.routers.auth import routers as auth_routers

api_routers = APIRouter()

# Register routes
api_routers.include_router(auth_routers, tags=["auth"])
