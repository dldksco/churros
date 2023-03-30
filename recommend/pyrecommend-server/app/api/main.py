import os
import sys
# sys.path.append(os.path.dirname(os.path.abspath(os.path.dirname(__file__))))
from datetime import datetime, timedelta
from fastapi import Depends, FastAPI, HTTPException
from sqlalchemy.orm import Session
from app.db.database import SessionLocal
from app.common.crud import read_user
from app.recommend_models.model_LDA import LDAmodel
import logging
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')

app = FastAPI()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
remodel = LDAmodel()
@app.get("/recommend/remodel")
async def remodel_recommend_model():
    return {"result" : "true"}

@app.get("/recommend/login")
async def get_sample_articles():
    return {"recommendList":[40001, 40002, 40003, 40004]}

@app.get("/recommend/{user_id}")
async def get_recommend_articles(user_id: int, db: Session = Depends(get_db)):
    db_user = read_user(db, user_id)

    if not db_user:
        raise HTTPException(status_code=400, detail="user 정보가 존재하지 않습니다.")

    dislikes = set(db_user.dislikes.likes_idx)
    logging.info(f"user_id조회 결과 : [idx : {db_user.user_idx}, email : {db_user.user_email}, name : {db_user.user_name}]")
    for article in db_user.articles:
        print("article : ", article.article_idx)

    # 2주 안에 읽은 데이터들을 최신 날짜 순으로 정렬
    today = datetime.now().date()
    two_weeks_ago = today - timedelta(days=14)

    read_articles = [ra for ra in db_user.articles
                    if ra.read_date >= two_weeks_ago]
    sorted_read_articles = sorted(read_articles, key=lambda x : x.read_date, reverse=True)
    read_idx = [sra.read_idx for sra in sorted_read_articles]

    # 이후 읽은 순서에 따라 우선 탐색...
    recommendations = []
    N = (12//(len(read_idx)//5)) + 2
    for i in range(0, len(read_idx), 5):
        cur_articles = read_idx[0:i+5]
        cur_recommendations:list = remodel.user_recommend(cur_articles, dislikes, N)
        recommendations += cur_recommendations
        if len(recommendations) >= 12:
            break

    return {"recommendList": recommendations[:12]}
