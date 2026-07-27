from fastapi import APIRouter

from ...services.databricks_client import db

router = APIRouter()


@router.get("/health")
async def health():
    query = "SELECT 1 AS status"
    return await db.execute(query)
