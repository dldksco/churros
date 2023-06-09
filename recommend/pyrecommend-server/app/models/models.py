from sqlalchemy import Column, ForeignKey, Integer, String, Date
from sqlalchemy.orm import relationship, backref

from app.db.database import Base
# from app.db.mock_database import Base

class User(Base):
    __tablename__ = "user"

    user_idx = Column(Integer, primary_key=True, index=True)
    user_email = Column(String)
    user_name = Column(String)
    user_provider = Column(Integer)
    user_roles = Column(Integer)
    user_image_url = Column(String)

class ReadArticle(Base):
    __tablename__ = "read_article"

    read_idx = Column(Integer, primary_key=True, index=True)
    user_idx = Column(Integer, ForeignKey('user.user_idx'))
    user = relationship("User", backref=backref("articles", order_by=read_idx))
    article_idx = Column(Integer)
    read_date = Column(Date)
    valid_date = Column(Date)

class LikedArticle(Base):
    __tablename__ = "liked_article"

    likes_idx = Column(Integer, primary_key=True, index=True)
    user_idx = Column(Integer, ForeignKey('user.user_idx'))
    user = relationship("User", backref=backref("likes", order_by=likes_idx))
    article_idx = Column(Integer)

class DislikedArticle(Base):
    __tablename__ = "dis_liked_article"

    likes_idx = Column(Integer, primary_key=True, index=True)
    user_idx = Column(Integer, ForeignKey('user.user_idx'))
    user = relationship("User", backref=backref("dislikes", order_by=likes_idx))
    article_idx = Column(Integer)
