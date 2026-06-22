from model import model
from typing import Any

def build_endpoit_url(weather_input: model.WeatherInfoRequest
                      , base_url: str, 
                      api_key: str | None = None) -> str:
    endpoint_url = base_url + f"/forecast.json?key={api_key}"
    
    if weather_input.city:
        endpoint_url += f"&q={weather_input.city}"
    
    elif weather_input.lat_long:
        endpoint_url += f"&q={weather_input.lat_long[0]},{weather_input.lat_long[1]}"
    
    elif weather_input.zip_code:
        endpoint_url += f"&q={weather_input.zip_code}"
    
    return endpoint_url

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
    