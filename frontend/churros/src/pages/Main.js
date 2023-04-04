import { useState, useEffect } from "react";
import A1Carousel from "../components/article/A1Carousel";
import { api } from "../axios-instance/api";
import Article from "../components/article/Article";
import { useRecoilValue } from "recoil";
import { userInfoState } from "../store/user";

const Main = () => {
  const userInfo = useRecoilValue(userInfoState);
  const subArraySizes = [4, 2, 2, 4];
  const [carouselArticles, setCarouselArticles] = useState([]);
  const [firstRowArticles, setFirstRowArticles] = useState([]);
  const [secondRowArticles, setSecondRowArticles] = useState([]);
  const [thirdRowArticles, setThirdRowArticles] = useState([]);

  // userInfo가 초기화 되고 userInfo.activate가 true가 될 때 데이터를 fetch 해야한다
  const fetchMainPageArticles = async () => {
    try {
      const res = await api.get("/news");
      console.log(res.data);

      const { result, articles } = res.data;
      console.log("main", result);
      console.log("main", articles);

      let startIdx = 0;
      setCarouselArticles(
        articles.slice(startIdx, startIdx + subArraySizes[0])
      );

      startIdx += subArraySizes[0];
      setFirstRowArticles(
        articles.slice(startIdx, startIdx + subArraySizes[1])
      );

      startIdx += subArraySizes[1];
      setSecondRowArticles(
        articles.slice(startIdx, startIdx + subArraySizes[2])
      );

      startIdx += subArraySizes[2];
      setThirdRowArticles(
        articles.slice(startIdx, startIdx + subArraySizes[3])
      );
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (userInfo?.activate) {
      fetchMainPageArticles();
    }
  }, [userInfo]);

  return (
    <div className="flex-1 flex-col justify-start w-full h-full p-2 overflow-y-auto">
      <div className="block w-full h-[34rem] mb-4 shadow-lg">
        <A1Carousel slides={carouselArticles} />
      </div>
      <div className="grid grid-cols-4 gap-4 w-full h-[14rem] mb-4">
        <div className="col-span-2">
          {firstRowArticles?.map((articleIdx, idx) => (
            <Article key={idx} shape="2" articleIdx={articleIdx} />
          ))}
        </div>
      </div>
      <hr className="bg-black opacity-20 h-1" />
      <div className="grid grid-cols-4 gap-4 w-full h-[14rem] mb-4">
        <div className="col-span-2">
          {secondRowArticles?.map((articleIdx, idx) => (
            <Article key={idx} shape="2" articleIdx={articleIdx} />
          ))}
        </div>
      </div>
      <hr className="bg-black opacity-20 h-1" />
      <div className="grid grid-cols-4 gap-4 w-full h-[14rem] mb-4">
        <div className="col-span-1">
          {thirdRowArticles?.map((articleIdx, idx) => (
            <Article key={idx} shape="3" articleIdx={articleIdx} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Main;
