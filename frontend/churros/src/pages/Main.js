import { useState, useEffect } from "react";
// import test from "../axios-instance/test";
// import ArticleList from "../components/article/ArticleList";
import A1 from "../components/article/A1";
import test from "../axios-instance/test";

const Main = () => {
  const [loading, setLoading] = useState(true);
  const [article, setArticle] = useState({});

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await test.get("/news/1");
      setArticle(response.data["article"]);
      setLoading(false);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="flex-1 flex-col justify-start w-full h-full p-2 overflow-y-auto">
      <div className="block w-full h-[28rem]">
        {loading && <h1>로딩 중...</h1>}
        {!loading && <A1 articleId={article["idx"]} url={article["url"]} src={article["imgUrl"]} title={article["title"]} description={article["description"]}/>}
      </div>
      <div className="block w-full h-[14rem]">Article Row</div>
      <div className="block w-full h-[14rem]">Article Row</div>
      <div className="block w-full h-[14rem]">Article Row</div>
      <div className="block w-full h-[14rem]">Article Row</div>
      <div className="block w-full h-[14rem]">Article Row</div>
      <div className="block w-full h-[14rem]">Article Row</div>
    </div>
  );
};

export default Main;
