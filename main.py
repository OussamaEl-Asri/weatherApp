from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from model.db import engine
from sqlmodel import SQLModel
from dotenv import load_dotenv
import os
from datetime import date


from model import model
from getWeather import weatherForcast
from crud_db.insert import insert
from crud_db.read import read
from crud_db.update import update

import logging

logger = logging.getLogger(__name__)

load_dotenv()

BASE_URL = os.environ.get("BASE_URL")
WEATHER_API = os.environ.get("WEATHER_API")

app = FastAPI()
SQLModel.metadata.create_all(engine)

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

@app.post('/insert')
def insert_db(query: list[model.WeatherResponse]) -> model.ResponseModel:
    try:
        insert(query)
        return model.ResponseModel(status_code=201)
    except Exception as e:
        logger.warning(e)
        return model.ResponseModel(status_code=500, error="DataBase failed to insert the query")

@app.get("/readDataBase")
def read_db() -> model.ResponseModel:
    try:
        result: list[model.WeatherResponse] = read()
        return model.ResponseModel(status_code=200, message=result)
    except:
        return model.ResponseModel(status_code=500, error="Failed to Fetch data from dataBase")

@app.put("/updateCondition")
def update_condition(req: model.UpdateConditionRequest) -> model.ResponseModel:
    try:
        update(req.date, req.condition_text)
        return model.ResponseModel(status_code=201)
    except:
        return model.ResponseModel(status_code=500, error="Failed to update the query")