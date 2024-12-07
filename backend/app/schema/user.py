from pydantic import BaseModel, EmailStr

class UserCreate(BaseModel):
    name: str
    username : str
    email: EmailStr
    password: str

class UserResponse(BaseModel):
    id: str
    name: str
    username: str
    email: str

    
class CreateUserRequest(BaseModel):
    name: str
    email: EmailStr
    password: str

class Token(BaseModel):
    access_token: str
    token_type: str
    
class Config:
        orm_mode = True
    