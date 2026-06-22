from typing import Optional, List, Any
from pydantic import BaseModel, Field
from datetime import date

class WeatherInfoRequest(BaseModel):
    lat_long: Optional[tuple[float, float]] | None = None
    zip_code: Optional[int] | None = None
    city: Optional[str] | None = None
    start_date: Optional[date] | None = Field(default=None)
    end_date: Optional[date] | None = Field(default=None)
    days_forecast: int = Field(default=5, ge=1)

class WeatherCondition(BaseModel):
    text: str
    icon: str
    code: int

class WeatherResponse(BaseModel):
    date: Optional[date] = None
    max_temp: Optional[int] = None
    avg_temp: Optional[int] = None
    min_temp: Optional[int] = None
    condition: Optional[WeatherCondition] = None

class ResponseModel(BaseModel):
    status_code: int
    message: Optional[list[WeatherResponse]] | None = None
    error: Optional[str] | None = None