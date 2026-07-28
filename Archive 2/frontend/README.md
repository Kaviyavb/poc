# Prescriber Search Portal

A production-ready React 19 + TypeScript + Vite frontend for the FastAPI prescriber search backend.

## Features

- Search form with email and prescriber-name validation
- Responsive Material UI layout
- Search results cards with profile image, metadata, and expandable medicine details
- Copy medicine details action
- Health status indicator calling the backend health endpoint
- Friendly empty, loading, and error states

## Tech Stack

- React 19
- TypeScript
- Vite
- Material UI
- Axios
- React Router

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm run dev
   ```

3. Open the local URL shown by Vite.

## Environment

Set the backend base URL in the environment file:

```env
VITE_API_URL=http://localhost:8000
```

## Build

```bash
npm run build
```
