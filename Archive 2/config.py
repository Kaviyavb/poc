import os
from dotenv import load_dotenv

load_dotenv()

DATABRICKS_HOST = os.getenv("DATABRICKS_HOST")
DATABRICKS_TOKEN = os.getenv("DATABRICKS_TOKEN")
WAREHOUSE_ID = os.getenv("WAREHOUSE_ID")

CATALOG = os.getenv("CATALOG")
SCHEMA = os.getenv("SCHEMA")
TABLE = os.getenv("TABLE")
LOCAL_TEST_EMAIL = os.getenv("LOCAL_TEST_EMAIL")
DATABRICKS_TOKEN = (os.getenv("DATABRICKS_TOKEN") or "").strip() or None