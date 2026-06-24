from sqlmodel import Field, SQLModel, create_engine
from datetime import date as Date
from dotenv import load_dotenv
import os


load_dotenv()
POSTGRESS_API_KEY = os.environ.get("POSTGRESS_API")

class Model(SQLModel, table=True):
    id: int | None = Field(default=None, primary_key=True)
    date: Date = Field(unique=True)
    max_temp: float
    avg_temp: float
    min_temp: float
    condition_text: str
    condition_icon: str
    condition_code: int


sqlite_url = f"postgresql://neondb_owner:{POSTGRESS_API_KEY}@ep-purple-recipe-at4en0wx-pooler.c-9.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require"

engine = create_engine(sqlite_url, echo=True)

