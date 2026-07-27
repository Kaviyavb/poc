import os
from dotenv import load_dotenv

backend_dir = os.path.dirname(os.path.dirname(os.path.dirname(os.path.dirname(__file__))))
load_dotenv(dotenv_path=os.path.join(backend_dir, '.env'))

DATABRICKS_HOST = os.getenv("DATABRICKS_HOST")
DATABRICKS_TOKEN = os.getenv("DATABRICKS_TOKEN")
WAREHOUSE_ID = os.getenv("WAREHOUSE_ID")

CATALOG = os.getenv("CATALOG")
SCHEMA = os.getenv("SCHEMA")
TABLE = os.getenv("TABLE")
LOCAL_TEST_EMAIL = os.getenv("LOCAL_TEST_EMAIL")
