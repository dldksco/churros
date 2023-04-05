import React from "react";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Article from "../components/article/Article";
import { api } from "../axios-instance/api";
import { Fragment } from "react";
import EmptyPage from "../components/common/EmptyPage";

const ScrapsPage = () => {
  const { idx } = useParams();
  const [articleList, setArticleList] = useState([]);
  const scrapListGet = async () => {
    try {
      const response = await api.get(`/scrap/${idx}`);
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
    <Fragment>
      {articleList.length === 0 ? (
        <div className="flex flex-col w-full h-full justify-center items-center">
          <EmptyPage
            message={"스크랩한 기사가 없습니다"}
            className={"w-full h-full"}
          />
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4 p-5">
          <div className="col-span-full place-content-center">
            <Article shape="1" articleIdx={articleList[0]} />
          </div>
          {articleList &&
            articleList.length > 0 &&
            articleList.slice(1).map((article, idx) => (
              <div key={idx} className="col-span-1">
                <Article shape="2" articleIdx={article} />
              </div>
            ))}
        </div>
      )}
    </Fragment>
  );
};

export default ScrapsPage;
