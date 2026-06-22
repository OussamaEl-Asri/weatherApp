from typing import Optional, List, Any, ClassVar
from pydantic import BaseModel, Field, field_validator, model_validator
from datetime import date

class WeatherInfoRequest(BaseModel):
    lat_long: Optional[tuple[float, float]] | None = None
    zip_code: Optional[int] | None = None
    city: Optional[str] | None = None
    start_date: Optional[date] | None = Field(default=None)
    end_date: Optional[date] | None = Field(default=None)
    days_forecast: int = Field(default=5, ge=1)
    MIN_DATE: ClassVar[date] = date(2010, 1, 1)

    @field_validator("start_date", "end_date")
    @classmethod
    def check_min_date(cls, v: date) -> date:
        if v < cls.MIN_DATE:
            raise ValueError("Date must be on or after 2010-01-01")
        return v

    @model_validator(mode="after")
    def check_date_order(self):
        if self.start_date and self.end_date:
            if self.start_date >= self.end_date:
                raise ValueError("start_date must be strictly earlier than end_date")
        return self

    @model_validator(mode="after")
    def validate_location(self):
        count = sum([
            self.lat_long is not None,
            self.zip_code is not None,
            self.city is not None
        ])

        if count == 0:
            raise ValueError("Provide one location field")

        if count > 1:
            raise ValueError("Provide only one location field")

        return self

class WeatherCondition(BaseModel):
    text: str
    icon: str
    code: int
    
    @field_validator("icon")
    @classmethod
    def fix_icon_url(cls, v: str) -> str:
        if v.startswith("//"):
            return "https:" + v
        return v

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