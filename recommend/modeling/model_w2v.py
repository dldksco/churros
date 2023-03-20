# 아무래도 벡터값 갱신의 경우, 전체를 갱신하고
# 하나의 유저에 대한 추천의 모델의 경우, 는 아직 작업 중
import os
from dotenv import load_dotenv
from pymongo import MongoClient

from gensim.models import Word2Vec
from sklearn.metrics.pairwise import cosine_similarity
import pandas as pd

load_dotenv()

# mongoDB 설정
mongo_host = os.environ.get('MongoHost')
mongo_port = int(os.environ.get('MongoPort'))
mongo_user = os.environ.get('MongoUser')
mongo_passwd = os.environ.get('MongoPasswd')
mongo_db_name = os.environ.get('MongoDbName')
mongo_admin_db = os.environ.get('MongoAdminDb')
mongo_client = MongoClient(host=mongo_host, port=mongo_port, username=mongo_user, password=mongo_passwd, authSource=mongo_admin_db)

db = mongo_client[mongo_db_name]
collection = db['newsCol']
index_collection = db['indexCounter']

# tokens에 token화 시킨 데이터 불러오기
tokens = ["smaple","data"]
# sg = 0 이면 cbow, 1이면 skip-gram, window 는 좌우로 살펴볼 단어의 개수(hyperparameters)
# word2vec 자체를 구현해 보는 것도 하나의 시도일수도
# word2vec model training
df = pd.DataFrame([])
def training(tokens):
    model = Word2Vec(sentences=tokens, vector_size = 100, window = 8, min_count = 3, workers = 4, sg = 0) 
    model.save('/tmp/my_model.word2vec') # 또는 pickle파일로

    document_embedded = get_document_vectors(df['token'])

def get_document_vectors(document_list):
    model = Word2Vec.load('/tmp/my_model.word2vec')
    document_embedding_list = []

    # 각 문서에 대해서
    for line in document_list:
        doc2vec = None
        count = 0
        for word in line:
            if word in model.wv.key_to_index:
                count += 1
                # 해당 문서에 있는 모든 단어들의 벡터값을 더한다.
                if doc2vec is None:
                    doc2vec = model.wv[word]
                else:
                    doc2vec = doc2vec + model.wv[word]

        if doc2vec is not None:
            # 단어 벡터를 모두 더한 벡터의 값을 문서 길이로 나눠준다.
            doc2vec = doc2vec / count
            document_embedding_list.append(doc2vec)

    # 각 문서에 대한 문서 벡터 리스트를 리턴
    return document_embedding_list
document_embedded = get_document_vectors(df['token'])
cosine_similarities = cosine_similarity(document_embedded, document_embedded)

# recommendation
def recommendation(idx):
    # 기사 vector df 불러오기
    books = df[['_idx','title', 'full_text']]

    # 입력된 인덱스와 내용 vector 값이 유사한 6개 추출
    sim_scores = cosine_similarities[idx]
    sim_scores = sim_scores.argsort()[::-1][0:6]

    # 가장 유사한 6개의 기사 인덱스
    book_indices = sim_scores.tolist()
    # 전체 데이터프레임에서 해당 인덱스의 행만 추출. 6개의 행을 가진다.
    recommend = books.iloc[book_indices].reset_index(drop=True)

    return recommend