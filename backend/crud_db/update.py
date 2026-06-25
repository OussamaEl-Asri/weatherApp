from sqlmodel import select, Session
from model.db import engine, Model
from datetime import date as Date

def update(date: Date, condition_text: str):
    with Session(engine) as session:
        statement = select(Model).where(Model.date == date)
        target = session.exec(statement).one()
        target.condition_text = condition_text
        
        session.commit()
