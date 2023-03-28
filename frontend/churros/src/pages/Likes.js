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
    ]);
  }, []);
  return (
    <div>
      {articleList.map((article, idx) => {
        return <LikeArticle key={idx} article={article} />;
      })}
    </div>
  );
};

export default LikesPage;
