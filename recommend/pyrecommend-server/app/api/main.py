from fastapi import Depends, FastAPI, HTTPException
from pydantic import BaseModel
from typing import Optional
from sqlalchemy.orm import Session, sessionmaker
import sqlalchemy.orm.session

from app.models.models import User
from app.db.database import SessionLocal
from app.common.crud import read_user

app = FastAPI()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.get("/recommend/remodel")
async def remodel_recommend_model():
    return True;

@app.get("/recommend/login")
async def get_sample_articles():
    return {"recommendList":[1, 2, 3, 4]};

@app.get("/recommend/{user_id}")
async def get_recommend_articles(user_id: int, db: Session = Depends(get_db)):
    db_user = read_user(db, user_id)

    print("db_idx : ", db_user.user_idx)
    print("db_email : ", db_user.user_email)
    print("db_name : ", db_user.user_name)
    for article in db_user.articles:
        print("article : ", article.article_idx)

    if not db_user:
        raise HTTPException(status_code=400, detail="Email already registered")

    return {"recommendList": [5, 6, 7, 8]};
