from sqlalchemy.orm import Session
from app.models.models import User

def read_user(db: Session, id : int):
    db_user = db.query(User).filter(User.user_idx == id).first()
    # db_user = db.query(User).all()
    return db_user
