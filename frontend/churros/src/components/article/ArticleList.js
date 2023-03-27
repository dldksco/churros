import React, { useState, useEffect } from "react";
import test from "../../axios-instance/test";
import ArticleBlock from "./ArticleBlock";

const ArticleList = () => {
  //   const [articles, setArticles] = useState([]);
  //   const [loading, setLoading] = useState(true);

  //   const fetchData = async () => {
  //     try {
  //       setLoading(true);
  //       const response = await test.get("/news");
  //       console.log(response.data["articles"]);
  //       setArticles(response.data["articles"]);
  //     } catch (error) {
  //       console.log(error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   useEffect(() => {
  //     fetchData();
  //   }, []);

  const articles = [1, 2, 3];

  return (
    <div>
      {/* {loading && <h1>로딩 중</h1>}
      {!loading && (
        <div>
          {articles.map((articleId) => (
            <ArticleBlock articleId={articleId} />
          ))}
        </div>
      )} */}

      {articles.map((articleId) => (
        <ArticleBlock articleId={articleId} />
      ))}
    </div>
  );
};

export default ArticleList;
