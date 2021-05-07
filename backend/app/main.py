"""Main module."""
import uvicorn
from fastapi import FastAPI

app = FastAPI(docs_url="/api/docs", openapi_url="/api/openapi", root_path="/api")


@app.get("/api")
def read_root():
    """Return hello world."""
    return {"Hello": "World"}


if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", reload=True, port=8888)
