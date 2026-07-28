from pathlib import Path

from fastapi import FastAPI
from fastapi.responses import FileResponse
from fastapi.staticfiles import StaticFiles

from .api.routes.health import router as health_router
from .api.routes.prescribers import router as prescriber_router

app = FastAPI(
    title="Prescriber Search API",
    version="1.0",
)

app.include_router(health_router)
app.include_router(prescriber_router)

BASE_DIR = Path(__file__).resolve().parent
FRONTEND_DIST = BASE_DIR.parent.parent / "frontend" / "dist"

if FRONTEND_DIST.exists():
    assets_dir = FRONTEND_DIST / "assets"
    if assets_dir.exists():
        app.mount(
            "/assets",
            StaticFiles(directory=str(assets_dir)),
            name="assets",
        )

    @app.get("/")
    async def root():
        return FileResponse(str(FRONTEND_DIST / "index.html"))
else:

    @app.get("/")
    async def root():
        return {"message": "Prescriber Search API Running"}