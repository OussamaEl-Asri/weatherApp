from model import model
from datetime import timedelta
from util import utils

import requests
import logging

logger = logging.getLogger(__name__)



def get_date_range_weather(
        weather_input: model.WeatherInfoRequest,
        base_url: str, 
        api_key: str | None = None) ->  model.ResponseModel:
    weather_response : list[model.WeatherResponse] = []
    endpoint_url = utils.build_endpoit_url(weather_input, base_url, api_key)

    start_date = weather_input.start_date
    end_date = weather_input.end_date
    
    if not start_date or not end_date:
        return model.ResponseModel(status_code=400, error="start_date or end_date doensn't provided")

    while start_date <= end_date:
        response = requests.get(endpoint_url + f"&dt={start_date}")
        
        if response.status_code != 200:
            return model.ResponseModel(status_code=response.status_code, error=response.text)
        res = response.json()
        weather_response.extend(utils.data_modeling(res))
        start_date += timedelta(days=1)

    return model.ResponseModel(status_code=200, message=weather_response)

def get_current_weather(
        weather_input: model.WeatherInfoRequest, 
        base_url: str, 
        api_key: str | None = None
    ) -> model.ResponseModel:

    endpoint_url = utils.build_endpoit_url(weather_input, base_url, api_key) + f"&days={weather_input.days_forecast}"

    response = requests.get(endpoint_url)
    
    if response.status_code != 200:
        return model.ResponseModel(status_code=response.status_code, error=response.text)

    else:
        data = utils.data_modeling(response.json())
        return model.ResponseModel(status_code= 200, message=data)
