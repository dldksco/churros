import { useEffect } from "react";
import { api, test } from "../../axios-instance/api";

const SampleArticle = ({ articleId }) => {
  const fetchData = async () => {
    try {
      const response = await test.get(`/news/${articleId}`);

      const { result, article } = response.data;
      console.log(result);
      console.log(article);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return <div>SampleArticle</div>;
};

export default SampleArticle;
