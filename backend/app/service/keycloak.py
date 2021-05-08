"""Module used for keycloak backend calls."""
from fastapi import Depends, HTTPException
from fastapi.security import OAuth2PasswordBearer
from jose.exceptions import JWTError
from keycloak.exceptions import KeycloakAuthenticationError, KeycloakGetError

from keycloak import KeycloakOpenID

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

keycloak_openid = KeycloakOpenID(
    server_url="http://keycloak:8080/auth/",
    client_id="app",
    realm_name="master",
    client_secret_key="94673fb7-0086-4456-8000-83d53ccb927f",
)

KEYCLOAK_PUBLIC_KEY = (
    "-----BEGIN PUBLIC KEY-----\n"
    f"{keycloak_openid.public_key()}"
    "\n-----END PUBLIC KEY-----"
)


async def authenticate_user(username: str, password: str):
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


async def verify_token(token: str = Depends(oauth2_scheme)):
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
