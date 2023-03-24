FROM python:3.9

ENV MARIA_USER=root
ENV MARIA_PASSWD=root
ENV MARIA_HOST=maria-db
ENV MARIA_PORT=3333
ENV MARIA_DB_NAME=churros

ENV MONGO_HOST=localhost
ENV MONGO_PORT=27020
ENV MONGO_USER=churros
ENV MONGO_PASSWD=A503
ENV MONGO_DB_NAME=newsdb
ENV MONGO_ADMIN_DB=admin

WORKDIR /fast-api

COPY requirements.txt requirements.txt

RUN pip install -r requirements.txt

COPY . .

CMD ["uvicorn", "app.api.main:app", "--host", "0.0.0.0", "--port", "8000"]

