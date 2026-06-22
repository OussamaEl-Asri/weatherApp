from model import model
from typing import Any
from datetime import date
import requests
import json
import logging

logger = logging.getLogger(__name__)


def data_modeling(weathers: dict[str, Any]) -> list[model.WeatherResponse]:
    weather_response: list[model.WeatherResponse] = []
    forecastdays = weathers["forecast"]["forecastday"]

    for day in forecastdays:
        weath = model.WeatherResponse()
        weath.date = day["date"]
        weath.max_temp = day["day"]["maxtemp_c"]
        weath.min_temp = day["day"]["mintemp_c"]
        weath.avg_temp = day["day"]["avgtemp_c"]
        weath.condition = model.WeatherCondition(**day["day"]["condition"])
        weather_response.append(weath)

    return weather_response


def get_range_date(endpoint: str, start_date: date, end_date: date):
    pass

def get_weather(
        weather_input: model.WeatherInfoRequest, 
        base_url: str, 
        api_key: str | None = None
    ) -> model.ResponseModel:


    if weather_input.city:
        query_parameter = weather_input.city
    
    elif weather_input.lat_long:
        query_parameter = str(weather_input.lat_long[0]) + "," + \
                          str(weather_input.lat_long[1])
    
    elif weather_input.zip_code:
        query_parameter = str(weather_input.zip_code)
    
    if weather_input.start_date and weather_input.end_date:
        endpoint_url = base_url + \
            f"/future.json?key={api_key}&q={query_parameter}&dt={weather_input.start_date}"
    else:
        endpoint_url = base_url + \
        f"/forecast.json?key={api_key}&q={query_parameter}&days={weather_input.days_forecast}"
    
    response = requests.get(endpoint_url)
    
    if response.status_code != 200:
        return model.ResponseModel(status_code=response.status_code, error=response.text)

    else:
        data = data_modeling(response.json())
        return model.ResponseModel(status_code= 200, message=data)

