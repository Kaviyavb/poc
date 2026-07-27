from fastapi import APIRouter, HTTPException

from ...core.config import CATALOG, SCHEMA, TABLE
from ...services.databricks_client import db

router = APIRouter()


@router.get("/prescriber-search")
async def prescriber_search(employee_email: str, prescriber_name: str):
    query = f"""
    SELECT
        emp_id,
        manager_id,
        employee_email,
        territory,
        hcp_id,
        npi,
        prescriber_first_name,
        prescriber_last_name,
        text_file,
        png_file
    FROM {CATALOG}.{SCHEMA}.{TABLE}
    WHERE lower(employee_email) = lower('{employee_email}')
      AND lower(
          concat(
              prescriber_first_name,
              ' ',
              prescriber_last_name
          )
      ) LIKE lower('%{prescriber_name}%')
    LIMIT 20
    """

    try:
        results = await db.execute(query)

        if not results:
            return {
                "message": "No prescribers found",
                "count": 0,
                "results": [],
            }

        return {
            "message": "Success",
            "count": len(results),
            "results": results,
        }

    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Databricks query failed: {str(e)}",
        )
