"""Main module."""
import uvicorn
from fastapi import Depends, FastAPI, Request
from fastapi.responses import Response
from simber import Logger

from app.routers import auth, users
from app.service.keycloak import verify_token

LOG_FORMAT = "{levelname} [{filename}:{lineno}]:"
logger = Logger(__name__, log_path="/logs/api.log")
logger.update_format(LOG_FORMAT)


app = FastAPI(docs_url="/api/docs", openapi_url="/api/openapi")


@app.exception_handler(Exception)
async def exception_handler(_: Request, exc: Exception):
    """Handle default exceptions.

    Args:
        exc: exception that ocurred

    Returns:
        HTTP 500 Internal Server Error
    """
    logger.error(exc)
    return Response(status_code=500)


@app.get("/api")
async def root():
    """Return hello world."""
    return {"message": "Hello world !"}


app.include_router(
    users.router, prefix="/api", tags=["users"], dependencies=[Depends(verify_token)]
)
app.include_router(auth.router, prefix="/api", tags=["auth"])

if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", reload=True, port=8888)
