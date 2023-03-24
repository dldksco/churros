import os
import numpy as np

from gensim import models, similarities
import pickle
project_folder = os.getcwd()
def user_recommend(user_history:list): # corpus, dictionary 필요
    lda_model = models.LdaModel.load(project_folder+'/app/recommend_models/data/ldamodels.lda')
    index = similarities.MatrixSimilarity.load('app/recommend_models/data/ldaindex.sim')
    corpus = pickle.load(open('app/recommend_models/data/corpus.pkl','rb'))
    corpus_lda_model = lda_model[corpus]
    # 유저 기록의 주제 관련 평균 계산
    user_topics = np.zeros(40)
    for i in user_history:
        single_corpus = corpus_lda_model[i]
        for word in single_corpus:
            user_topics[word[0]] += word[1]
    user_average = user_topics / len(user_history)
    # 유저 평균 기록값과 전체 기사 와의 유사도 계산 ** 유사도 모델 따로 저장해두자
    sims = index[user_average]
    # 유사도 값 리스트
    sim_scores = list(enumerate(sims))

    # 유사도 기준으로 정렬
    sim_scores = sorted(sim_scores, key=lambda x: x[1], reverse=True)

    # 상위 N개의 기사 추천
    N = 5
    top_n_indices = [i[0] for i in sim_scores[0:N+1]]
    
    print(f"Top {N} recommended articles based on user history:")
    print(top_n_indices)
    return top_n_indices