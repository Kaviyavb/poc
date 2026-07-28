import httpx

from config import (
    DATABRICKS_HOST,
    DATABRICKS_TOKEN,
    WAREHOUSE_ID
)


class DatabricksClient:

    def __init__(self):

        self.url = f"https://{DATABRICKS_HOST}/api/2.0/sql/statements"

        self.headers = {
            "Authorization": f"Bearer {DATABRICKS_TOKEN}",
            "Content-Type": "application/json"
        }


    async def execute(self, query):

        payload = {
            "statement": query,
            "warehouse_id": WAREHOUSE_ID,
            "wait_timeout": "20s"
        }


        async with httpx.AsyncClient(timeout=30) as client:

            response = await client.post(
                self.url,
                json=payload,
                headers=self.headers
            )


            response.raise_for_status()

            data = response.json()


            # Extract columns
            columns = [
                col["name"]
                for col in data["manifest"]["schema"]["columns"]
            ]


            # Extract rows
            rows = (
                data
                .get("result", {})
                .get("data_array", [])
            )


            result = []

            for row in rows:
                result.append(
                    dict(zip(columns, row))
                )


            return result



db = DatabricksClient()