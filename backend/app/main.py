"""Main module."""
from fastapi import Depends, FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import Response
from simber import Logger
import uvicorn

from app.router import auth, targets
from app.service.keycloak import verify_token

LOG_FORMAT = "{levelname} [{filename}:{lineno}]:"
logger = Logger(__name__, log_path="/logs/api.log")
logger.update_format(LOG_FORMAT)


app = FastAPI(docs_url="/api/docs", openapi_url="/api/openapi")

origins = ["http://localhost", "http://frontend:3000"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.exception_handler(Exception)
async def exception_handler(_: Request, exc: Exception) -> Response:
    """Handle default exceptions.

    Args:
        exc: exception that ocurred

    Returns:
        HTTP 500 Internal Server Error
    """
    logger.error(exc)
    return Response(status_code=500)


@app.get("/api")
async def root() -> Response:
    """Health check."""
    return Response(status_code=200)


app.include_router(
    targets.router,
    prefix="/api",
    tags=["targets"],
    dependencies=[Depends(verify_token)],
)
app.include_router(auth.router, prefix="/api", tags=["auth"])

if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", reload=True, port=8888)  # nosec
