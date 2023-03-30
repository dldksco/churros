import os
import sys
sys.path.append(os.path.dirname(os.path.abspath(os.path.dirname(__file__))))

from fastapi.testclient import TestClient
from app.api.main import app, get_db
from unittest.mock import MagicMock
from sqlalchemy.orm import Session

client = TestClient(app)

def test_get_users(db: Session = MagicMock()):
    # Mocking된 db를 get_db 함수에서 반환
    def override_get_db():
        yield db

    app.dependency_overrides[get_db] = override_get_db

    response = client.get("/recommand/login")
    assert response.status_code == 200
    assert response.json() == {"recommendList":[40001, 40002, 40003, 40004]}

def test_remodel_recommend_model():
    response = client.get("/recommend/remodel")
    assert response.status_code == 200
    assert response.json() == {"result" : "true"}

def test_get_sample_articles():
    response = client.get("/recommand/login")
    assert response.status_code == 200
    assert response.json() == {"recommendList":[40001, 40002, 40003, 40004]}

def test_get_recommend_articles():
    response = client.get("/recommend/1")
    assert response.status_code == 200