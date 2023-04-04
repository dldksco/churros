import os
import sys
import random
# sys.path.append(os.path.dirname(os.path.abspath(os.path.dirname(__file__))))
from datetime import date, timedelta
from fastapi import Depends, FastAPI, HTTPException
from sqlalchemy.orm import Session
from app.db.database import SessionLocal
# from app.db.mock_database import SessionLocal
from app.common.crud import read_user
from app.recommend_models.model_LDA import LDAmodel
import logging
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')

app = FastAPI()
remodel = LDAmodel()
_RECOMMEND_ARTICLE_CNT = 12
_SLICING_NUM = 5
_MIN_VLUE = 2

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.get("/recommend/remodel")
async def remodel_recommend_model():
    remodel.change_model_files()

    return {"result" : "success"}

@app.get("/recommend/sample")
async def get_sample_articles():
    recommendList = []
    samplelist = random.sample(range(0,30), 6)
    print("뽑아낸 렌덤 값",samplelist)
    for i in range(6):
        recommendList.append(remodel.sample_article(samplelist[i]))
    return {"recommendList":recommendList}

@app.get("/recommend/{user_id}")
async def get_recommend_articles(user_id: int, db: Session = Depends(get_db)):
    db_user = read_user(db, user_id)

    if not db_user:
        logging.info("user 정보가 존재하지 않습니다.")
        raise HTTPException(status_code=400, detail="user 정보가 존재하지 않습니다.")

    logging.debug(f"user_id조회 결과 : [idx : {db_user.user_idx}, email : {db_user.user_email}, name : {db_user.user_name}, 읽은 기사 개수 : {len(db_user.articles)}]")

    if not db_user.articles:
        logging.info("읽은 기사 정보가 존재하지 않습니다.")
        raise HTTPException(status_code=400, detail="읽은 기사 정보가 존재하지 않습니다.")

    # 싫어요를 누른 기사의 중복 제거
    dislikes = set(re.likes_idx for re in db_user.dislikes)

    # 2주 안에 읽은 데이터들을 최신 날짜 순으로 정렬
    today = date.now().date()
    two_weeks_ago = today - timedelta(days=14)

    read_articles = [ra for ra in db_user.articles
                    if ra.read_date >= two_weeks_ago]
    sorted_read_articles = sorted(read_articles, key=lambda x : x.read_date, reverse=True)
    read_idx = [sra.read_idx for sra in sorted_read_articles]
    logging.debug(f'최근 읽은 기사 인덱스 : {read_idx}')

    # 이후 읽은 순서에 따라 우선 탐색...
    recommendations = []
    N = (_RECOMMEND_ARTICLE_CNT//((len(read_idx)//_SLICING_NUM)+1))
    if N < _MIN_VLUE:
        N = _MIN_VLUE
    for i in range(0, len(read_idx), _SLICING_NUM):
        cur_articles = read_idx[0 : i + _SLICING_NUM]
        cur_recommendations:list = remodel.user_recommend(cur_articles, dislikes, read_idx, N)
        recommendations += cur_recommendations
        if len(recommendations) >= _RECOMMEND_ARTICLE_CNT:
            break

    return {"recommendList": recommendations[:_RECOMMEND_ARTICLE_CNT]}