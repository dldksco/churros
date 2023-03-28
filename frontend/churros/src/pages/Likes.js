import React from "react";
import { useState, useEffect } from "react";
import LikeArticle from "../components/article/LikeArticle";
import axios from "axios";
const LikesPage = () => {
  const [articleList, setArticleList] = useState([]);
  console.log(articleList);
  useEffect(() => {
    // 시작과 함께 axios 통신으로 리스트 받아옴
    setArticleList([
      { title: "First Article", text: "Text" },
      { title: "Second Article", text: "Text2" },
      { title: "Third Article", text: "Text3" },
      { title: "Fourth Article", text: "Text4" },
      { title: "Fifth Article", text: "Text5" },
      { title: "Second Article", text: "Text6" },
    ]);
  }, []);
  return (
    <div className="grid grid-cols-2 gap-4 p-5">
      {/* 첫 번째 기사 */}
      <div className="col-span-full place-content-center">
        <LikeArticle/>
      </div>

      {/* 나머지 기사들 */}
      {articleList.slice(1).map((article, idx) => (
        <div key={idx} className="col-span-1">
          <LikeArticle />
        </div>
      ))}
    </div>
  );
};

export default LikesPage;
