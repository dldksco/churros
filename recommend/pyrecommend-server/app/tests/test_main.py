import os
import sys
sys.path.append(os.path.dirname(os.path.abspath(os.path.dirname(__file__))))

from fastapi.testclient import TestClient
from app.api.main import app

client = TestClient(app)

def test_remodel_recommend_model():
    response = client.get("/recommend/remodel")
    assert response.status_code == 200
    assert response.json() == {"result" : "true"}

def test_get_sample_articles():
    response = client.get("/recommand/login")
    assert response.status_code == 200
    assert response.json() == {"recommendList":[1, 2, 3, 4]}

def test_get_recommend_articles():
    response = client.get("/recommend/1")
    assert response.status_code == 200