from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
import os
import sys

from model import model
from getWeather import weatherForcast



load_dotenv()

BASE_URL = os.environ.get("BASE_URL")
WEATHER_API = os.environ.get("WEATHER_API")

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # your frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.post("/currentWeather")
def current_weather(weather_input: model.WeatherInfoRequest) -> model.ResponseModel:
    return weatherForcast.get_current_weather(weather_input, BASE_URL, WEATHER_API)

@app.post("/weatherDateRange")
def weather_range_date(weather_input: model.WeatherInfoRequest)-> model.ResponseModel:
    return weatherForcast.get_date_range_weather(weather_input, BASE_URL, WEATHER_API)
