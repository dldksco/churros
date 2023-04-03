import React from "react";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Article from "../components/article/Article";
import { api } from "../axios-instance/api";
import LoadingPage from "./Loading";

const ScrapsPage = () => {
  const { scrapBoxIdx } = useParams();
  const [articleList, setArticleList] = useState([]);
  const scrapListGet = async () => {
    try {
      const response = await api.get(`/scrap/${scrapBoxIdx}`);
      const { result, articles } = response.data;
      setArticleList(articles);
      console.log(`scrap list set ${articleList}: ${result}`);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    // 시작과 함께 axios 통신으로 리스트 받아옴
    scrapListGet();
  }, []);
  return (
    <div className="grid grid-cols-2 gap-4 p-5">
      {/* 첫 번째 기사 */}
      <div className="col-span-full place-content-center">
        {articleList && <Article shape="1" articleIdx={articleList[0]} />}
      </div>

      {/* 나머지 기사들 */}
      {articleList &&
        articleList.slice(1).map((article, idx) => (
          <div key={idx} className="col-span-1">
            <Article shape="2" articleIdx={article} />
          </div>
        ))}
      {!articleList && <LoadingPage />}
    </div>
  );
};

export default ScrapsPage;
