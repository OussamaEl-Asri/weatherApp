from sqlmodel import select, Session
from model.db import engine, Model
from datetime import date as Date

def delete(date: Date):
    with Session(engine) as session:
        statement = select(Model).where(Model.date == date)
        row = session.exec(statement).one()
        
        session.delete(row)
        session.commit()