import os
import numpy as np
import pickle
from gensim import models, similarities, corpora
import logging
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')
class LDAmodel():
    def __init__(self):
        logging.info(f'LDAmodel init...')
        project_folder = os.getcwd()
        logging.debug(f"project_folder : {project_folder}")
        self.lda_model = models.LdaModel.load(project_folder+'/data/ldamodels.lda')
        self.index = similarities.MatrixSimilarity.load(project_folder+'/data/ldaindex.sim')
        with open(project_folder+'/data/corpus.pkl', "rb") as fi:
            self.corpus = pickle.load(fi)
        logging.info(f'LDAmodel init 완료!')

    def user_recommend(self,user_history:list,dislikes:list, N:int): # corpus, dictionary 필요
        logging.info(f"Start user recommendation process.")
        corpus_lda_model = self.lda_model[self.corpus]

        # 유저 기록의 주제 관련 평균 계산
        user_topics = np.zeros(20)
        for i in user_history:
            single_corpus = corpus_lda_model[i]
            for word in single_corpus:
                user_topics[word[0]] += word[1]
        user_average = user_topics / len(user_history)
        logging.info(f"User average topic values: {user_average}")

        # 유저 평균 기록값과 전체 기사 와의 유사도 계산
        sims = self.index[user_average]
        # 유사도 값 리스트
        sim_scores = list(enumerate(sims))

        # 유사도 기준으로 정렬
        sim_scores = sorted(sim_scores, key=lambda x: x[1], reverse=True)

        # 상위 N개의 기사 추천 N개 이상이 될 때까지 반복
        top_n_indices = []
        while len(top_n_indices) < N:
            top_n_indices.extend([i[0] for i in sim_scores[0:N+1] if i[0] not in set(user_history) and i[0] not in dislikes])
        
        logging.debug(f"Top {N} recommended article indices: {top_n_indices[:N]}")
        logging.info(f"User recommendation process completed.")
        return top_n_indices[:N]