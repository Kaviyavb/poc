
# from fastapi import FastAPI

# from database import get_connection


# app = FastAPI(
#     title="Prescriber Search POC"
# )


# @app.get("/")
# def home():

#     return {

#         "message": "Prescriber Search API Running"

#     }


# @app.get("/test-db")
# def test_database():

#     connection = get_connection()

#     with connection.cursor() as cursor:

#         cursor.execute("""

#         SELECT COUNT(*)

#         FROM prescriber_search_poc

#         """)

#         count = cursor.fetchone()[0]

#     return {

#         "total_rows": count
#     }

from backend.app.main import app

__all__ = ["app"]