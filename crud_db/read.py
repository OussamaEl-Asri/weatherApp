from sqlmodel import select, Session
from model.db import engine, Model
from model.model import ResponseModel, WeatherResponse, WeatherCondition

import logging

logger = logging.getLogger(__name__)

def read() -> list[WeatherResponse]:
    response: list[WeatherResponse] = []

    with Session(engine) as session:
        statement = select(Model)
        results = session.exec(statement)
        
        for res in results:
            response.append(WeatherResponse(
                date=res.date,
                max_temp=res.max_temp,
                avg_temp=res.avg_temp,
                min_temp=res.min_temp,
                condition = WeatherCondition(text=res.condition_text, 
                                             icon=res.condition_icon, 
                                             code=res.condition_code)
            ))

    return response
