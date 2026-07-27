import os
from pathlib import Path
from dotenv import load_dotenv

root_dir = Path(__file__).resolve().parent.parent.parent.parent
load_dotenv(dotenv_path=root_dir / '.env')

DATABRICKS_HOST = os.getenv("DATABRICKS_HOST")
DATABRICKS_TOKEN = os.getenv("DATABRICKS_TOKEN")
WAREHOUSE_ID = os.getenv("WAREHOUSE_ID")

CATALOG = os.getenv("CATALOG")
SCHEMA = os.getenv("SCHEMA")
TABLE = os.getenv("TABLE")
LOCAL_TEST_EMAIL = os.getenv("LOCAL_TEST_EMAIL")

