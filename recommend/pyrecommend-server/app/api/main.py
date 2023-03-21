from fastapi import FastAPI

app = FastAPI()

@app.get("/recommend/remodel")
async def remodel_recommend_model():
    return True;

@app.get("/recommend/login")
async def get_sample_articles():
    return {"recommendList":[1, 2, 3, 4]};

@app.get("/recommend/{user_id}")
async def get_recommend_articles(user_id: int):
    return {"recommendList": [5, 6, 7, 8]};
