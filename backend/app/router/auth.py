"""Authentication router."""
import typing as tp

from fastapi import APIRouter, Depends
from fastapi.security import OAuth2PasswordRequestForm
from pydantic import BaseModel

from app.service.keycloak import authenticate_user, logout, refresh_token

router = APIRouter()


class Token(BaseModel):
    token: str


@router.post("/token")
async def login(form_data: OAuth2PasswordRequestForm = Depends()) -> tp.Dict[str, str]:
    """Login user."""
    token = await authenticate_user(form_data.username, form_data.password)
    return token


@router.post("/refresh")
async def refresh(token: Token) -> tp.Dict[str, str]:
    new_token = await refresh_token(token.token)
    return new_token


@router.post("/logout")
async def logout_user(token: Token) -> None:
    await logout(token.token)
