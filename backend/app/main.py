from fastapi import FastAPI

from .api.routes.health import router as health_router
from .api.routes.prescribers import router as prescriber_router

app = FastAPI(
    title="Prescriber Search API",
    version="1.0",
)

app.include_router(health_router)
app.include_router(prescriber_router)


@app.get("/")
def root():
    return {"message": "Prescriber Search API Running"}
