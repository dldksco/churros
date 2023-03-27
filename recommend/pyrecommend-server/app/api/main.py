from fastapi import Depends, FastAPI, HTTPException
from sqlalchemy.orm import Session
from app.db.database import SessionLocal
from app.common.crud import read_user
from app.recommend_models.model_LDA import user_recommend

app = FastAPI(root_path="/recommend")

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.get("/remodel")
async def remodel_recommend_model():
    return True;

@app.get("/login")
async def get_sample_articles():
    return {"recommendList":[1, 2, 3, 4]};

@app.get("/{user_id}")
async def get_recommend_articles(user_id: int, db: Session = Depends(get_db)):
    db_user = read_user(db, user_id)

    print("db_idx : ", db_user.user_idx)
    print("db_email : ", db_user.user_email)
    print("db_name : ", db_user.user_name)
    for article in db_user.articles:
        print("article : ", article.article_idx)
    
    if not db_user:
        raise HTTPException(status_code=400, detail="Email already registered")
    
    recommendations = user_recommend([300])
    return {"recommendList": recommendations};

