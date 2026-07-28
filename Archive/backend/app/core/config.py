import os
from pathlib import Path
from dotenv import load_dotenv

root_dir = Path(__file__).resolve().parent.parent.parent.parent
load_dotenv(dotenv_path=root_dir / '.env')

DATABRICKS_HOST = (os.getenv("DATABRICKS_HOST") or "").strip() or None
DATABRICKS_TOKEN = (os.getenv("DATABRICKS_TOKEN") or "").strip() or None
WAREHOUSE_ID = (os.getenv("WAREHOUSE_ID") or "").strip() or None

CATALOG = os.getenv("CATALOG")
SCHEMA = os.getenv("SCHEMA")
TABLE = os.getenv("TABLE")
LOCAL_TEST_EMAIL = os.getenv("LOCAL_TEST_EMAIL")

