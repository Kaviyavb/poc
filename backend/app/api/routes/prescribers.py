import os

from fastapi import APIRouter, HTTPException, Request

from ...core.config import CATALOG, LOCAL_TEST_EMAIL, SCHEMA, TABLE
from ...services.databricks_client import db

router = APIRouter()


@router.get("/prescriber-search")
async def prescriber_search(request: Request, prescriber_name: str):
    forwarded_email = request.headers.get("x-forwarded-email")
    local_test_email = os.getenv("LOCAL_TEST_EMAIL") or LOCAL_TEST_EMAIL

    print(f"DEBUG request.headers: {dict(request.headers)}")
    print(f"DEBUG x-forwarded-email header: {forwarded_email!r}")
    print(f"DEBUG LOCAL_TEST_EMAIL: {local_test_email!r}")

    employee_email = (forwarded_email or local_test_email or "").strip() or None
    print(f"DEBUG resolved employee_email: {employee_email!r}")

    print(
        "DEBUG employee_email is None/empty: "
        f"{employee_email is None or not str(employee_email).strip()}"
    )
    print(f"DEBUG received prescriber_name: {prescriber_name!r}")

    if employee_email is None:
        raise HTTPException(
            status_code=401,
            detail="Unable to determine logged-in user.",
        )

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

    print(f"DEBUG SQL filter employee_email: {employee_email!r}")
    print("DEBUG full SQL query:")
    print(query)

    try:
        results = await db.execute(query)
        print(f"DEBUG rows returned: {len(results)}")

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
