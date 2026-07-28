# Backend Service

This directory contains the production-style FastAPI backend for the Prescriber Search Portal.

## Structure

- app/main.py - application entry point
- app/api/routes - API route modules
- app/core/config.py - environment configuration
- app/services/databricks_client.py - Databricks SQL client

## Run locally

```bash
cd backend
pip install -r requirements.txt
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```
