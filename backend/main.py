from fastapi import FastAPI
import os
from fastapi.middleware.cors import CORSMiddleware
from app.routers.routes import api_routers


app = FastAPI()

app.include_router(api_routers, prefix="/api")

@app.get("/")
async def root():
    return {"message": "Hello World"}


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all origins (can be restricted for production)
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000, log_level="info")
