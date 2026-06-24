from model.db import engine, Model
from model.model import WeatherResponse
from sqlmodel import Session, select


def insert(weather_inputs: list[WeatherResponse]):
    with Session(engine) as session:
        for weather_input in weather_inputs:
            existing = session.scalar(
                select(Model).where(Model.date == weather_input.date)
            )

            if existing:
                continue

            data = Model(date=weather_input.date,
                 max_temp=weather_input.max_temp,
                 avg_temp=weather_input.avg_temp,
                 min_temp=weather_input.min_temp,
                 condition_text=weather_input.condition.text,
                 condition_icon=weather_input.condition.icon,
                 condition_code=weather_input.condition.code
                 )
            session.add(data)

        session.commit()