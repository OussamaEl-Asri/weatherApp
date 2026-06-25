# Weather App

A full-stack weather application that provides weather forecasts through a FastAPI backend and a React-based frontend.

## Tech Stack

### Backend

* Python 3.12+
* FastAPI
* SQLModel
* PostgreSQL
* uv

### Frontend

* React
* Tailwind CSS
* npm

## Getting Started

### 1. Clone the repository

```bash
git clone git@github.com:OussamaEl-Asri/weatherApp.git
cd weatherApp
```

## Backend Setup

```bash
cd backend

# Create and activate a virtual environment
uv venv
source .venv/bin/activate

# Install dependencies
uv sync
```

Create a `.env` file inside the `backend` directory:

```env
WEATHER_API="YOUR_WEATHER_API_KEY"
BASE_URL="http://api.weatherapi.com/v1"
POSTGRESS_API="YOUR_POSTGRES_CONNECTION_STRING"
```

Run the backend:

```bash
uv run fastapi dev
```

## Frontend Setup

```bash
cd frontend

# Install dependencies
npm install
```

Create a `.env` file inside the `frontend` directory:

```env
VITE_YOUTUBE_API_KEY="YOUR_YOUTUBE_API_KEY"
```

Run the frontend:

```bash
npm run dev
```

## Environment Variables

### Backend

| Variable        | Description                  |
| --------------- | ---------------------------- |
| `WEATHER_API`   | WeatherAPI API key           |
| `BASE_URL`      | WeatherAPI base URL          |
| `POSTGRESS_API` | PostgreSQL connection string |

### Frontend

| Variable               | Description          |
| ---------------------- | -------------------- |
| `VITE_YOUTUBE_API_KEY` | YouTube Data API key |
