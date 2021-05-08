"""Authentication router."""
from fastapi import APIRouter, Depends
from fastapi.security import OAuth2PasswordRequestForm

from app.service.keycloak import authenticate_user

router = APIRouter()


@router.post("/token")
async def login(form_data: OAuth2PasswordRequestForm = Depends()):
    """Login user."""
    token = await authenticate_user(form_data.username, form_data.password)
    return token
