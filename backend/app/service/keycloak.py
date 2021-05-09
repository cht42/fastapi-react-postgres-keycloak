"""Module used for keycloak backend calls."""
import os
import typing as tp

from fastapi import Depends, HTTPException
from fastapi.security import OAuth2PasswordBearer
from jose.exceptions import JWTError
from keycloak.exceptions import KeycloakAuthenticationError, KeycloakGetError
from keycloak.keycloak_openid import KeycloakOpenID

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

keycloak_openid = KeycloakOpenID(
    server_url=os.environ.get("KEYCLOAK_SERVER_URL"),
    realm_name=os.environ.get("KEYCLOAK_REALM_NAME"),
    client_id=os.environ.get("KEYCLOAK_CLIENT_ID"),
    client_secret_key=os.environ.get("KEYCLOAK_CLIENT_SECRET_KEY"),
)

KEYCLOAK_PUBLIC_KEY = (
    "-----BEGIN PUBLIC KEY-----\n"
    f"{keycloak_openid.public_key()}"
    "\n-----END PUBLIC KEY-----"
)


async def authenticate_user(username: str, password: str) -> tp.Dict[str, str]:
    """Authenticate user with Keycloak backend.

    Args:
        username
        password

    Returns:
        Access token and refresh token with their expiration time
    """
    try:
        return keycloak_openid.token(username, password)
    except KeycloakAuthenticationError as error:
        raise HTTPException(status_code=401, detail="Invalid credentials") from error


async def verify_token(token: str = Depends(oauth2_scheme)) -> tp.Dict[str, str]:
    """Verify token with Keycloak public key.

    Args:
        token: access token to decode

    Returns:
        Token decoded
    """
    try:
        return keycloak_openid.decode_token(
            token,
            key=KEYCLOAK_PUBLIC_KEY,
            options={"verify_signature": True, "verify_aud": False, "exp": True},
        )
    except (KeycloakGetError, JWTError) as error:
        raise HTTPException(
            status_code=401, detail=str(error), headers={"WWW-Authenticate": "Bearer"}
        ) from error
