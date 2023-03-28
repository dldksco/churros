import os
import pandas as pd
from dotenv import load_dotenv
from pymongo import MongoClient
import pickle
from gensim import corpora, models, similarities


load_dotenv()

# mongoDB 설정
mongo_host = os.environ.get('MongoHost')
mongo_port = int(os.environ.get('MongoPort'))
mongo_user = os.environ.get('MongoUser')
mongo_passwd = os.environ.get('MongoPasswd')
mongo_db_name = os.environ.get('MongoDbName')
mongo_admin_db = os.environ.get('MongoAdminDb')
mongo_client = MongoClient(
    host=mongo_host, port=mongo_port, username=mongo_user, password=mongo_passwd)

db = mongo_client[mongo_db_name]
newscollection = db['newsCol']
tokencollection = db['newsToken']


# 절대경로
project_folder = os.getcwd()


# token dataframe 조회
def token_dataframe():
    data = list(tokencollection.find())
    df = pd.DataFrame(data)
    return df

# doc2bow 실시 (dictionary, doc2bow저장)


def doc2bow(df):
    logging.info('Ending dataframe')

    dictionary = corpora.Dictionary(df.token)
    dictionary.save(
        '~/recommend/dictionary.pkl')
    corpus = [dictionary.doc2bow(text) for text in df.token]
    with open('~/recommend/corpus.pkl', 'wb') as f:
        pickle.dump(corpus, f)
    return dictionary, corpus

def model_train(dictionary, corpus):
    logging.info('Ending doc2bow')
    NUM_TOPICS = 20
    ldamodel = models.ldamodel.LdaModel(corpus, num_topics = NUM_TOPICS, id2word=dictionary, passes=10)
    ldamodel.save('~/recommend/ldamodels.lda')

import logging
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')

def main():
    logging.info('Starting my_function')
    df = token_dataframe()
    dictionary, corpus = doc2bow(df)
    model_train(dictionary, corpus)
    logging.info('Ending my_function')


if __name__ == '__main__':
    main()
