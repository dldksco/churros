from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from starlette.config import Config

config = Config("app/.env")

maria_user = config.get("MARIA_USER")
maria_passwd = config.get("MARIA_PASSWD")
maria_host = config.get("MARIA_HOST")
maria_port = config.get("MARIA_PORT")
maria_db_name = config.get("MARIA_DB_NAME")

SQLALCHEMY_DATABASE_URL = f"mysql+pymysql://{maria_user}:{maria_passwd}@{maria_host}:{maria_port}/{maria_db_name}"

engine = create_engine(
    SQLALCHEMY_DATABASE_URL
)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()
