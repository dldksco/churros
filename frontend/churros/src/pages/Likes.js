import React from "react";
import { useState, useEffect } from "react";
import Article from "../components/article/Article";
const LikesPage = () => {
  const [articleList, setArticleList] = useState([]);
  console.log(articleList);
  useEffect(() => {
    // 시작과 함께 axios 통신으로 리스트 받아옴
    setArticleList([145, 1454, 5432, 999]);
  }, []);
  return (
    <div className="grid grid-cols-2 gap-4 p-5">
      {/* 첫 번째 기사 */}
      <div className="col-span-full place-content-center">
        <Article shape="1" articleIdx={articleList[0]} />
      </div>

      {/* 나머지 기사들 */}
      {articleList.slice(1).map((article, idx) => (
        <div key={idx} className="col-span-1">
          <Article shape="2" articleIdx={article} />
        </div>
      ))}
    </div>
  );
};

export default LikesPage;
