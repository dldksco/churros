import { useState, useEffect } from "react";
import A1Carousel from "../components/article/A1Carousel";
import { api } from "../axios-instance/api";
import Article from "../components/article/Article";
import { useRecoilValue } from "recoil";
import { userInfoState } from "../store/user";

const Main = () => {
  const userInfo = useRecoilValue(userInfoState);
  const [mainArticles, setMainArticles] = useState([]);
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
      console.log(result);
      console.log(articles);

      setMainArticles(articles);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (userInfo?.activate) {
      fetchMainPageArticles();
    }
  }, [userInfo]);

  useEffect(() => {
    if (mainArticles.length > 0) {
      const startIdx = 0;
      setCarouselArticles(mainArticles.slice(startIdx, subArraySizes[0]));

      startIdx += subArraySizes[0];
      setFirstRowArticles(mainArticles.slice(startIdx, subArraySizes[1]));

      startIdx += subArraySizes[1];
      setSeocndRowArticles(mainArticles.slice(startIdx, subArraySizes[2]));

      startIdx += subArraySizes[2];
      setThirdRowArticles(mainArticles.slice(startIdx, subArraySizes[3]));
    }
  }, [mainArticles]);

  const testArticles = [
    {
      idx: 1,
      url: "https://n.news.naver.com/mnews/article/014/0004987518?sid=105",
      imgUrl:
        "https://imgnews.pstatic.net/image/014/2023/03/27/0004987518_001_20230327185510521.jpg?type=w647",
      title: '[1] "삼성·SK가 인정한 SCM, 클라우드로 확장"',
      description:
        "진짜 우리가 하고 싶은 일을 재밌게 해보자는 마음으로 시작한 지 23년, 지금도 변함없는 것은 성장의 결실을 직원들과 함께 나누는 것이다.",
    },
    {
      idx: 2,
      url: "https://n.news.naver.com/mnews/article/014/0004987518?sid=105",
      imgUrl:
        "https://imgnews.pstatic.net/image/014/2023/03/27/0004987518_001_20230327185510521.jpg?type=w647",
      title: '[2] "삼성·SK가 인정한 SCM, 클라우드로 확장"',
      description:
        "진짜 우리가 하고 싶은 일을 재밌게 해보자는 마음으로 시작한 지 23년, 지금도 변함없는 것은 성장의 결실을 직원들과 함께 나누는 것이다.",
    },
    {
      idx: 3,
      url: "https://n.news.naver.com/mnews/article/014/0004987518?sid=105",
      imgUrl:
        "https://imgnews.pstatic.net/image/014/2023/03/27/0004987518_001_20230327185510521.jpg?type=w647",
      title: '[3] "삼성·SK가 인정한 SCM, 클라우드로 확장"',
      description:
        "진짜 우리가 하고 싶은 일을 재밌게 해보자는 마음으로 시작한 지 23년, 지금도 변함없는 것은 성장의 결실을 직원들과 함께 나누는 것이다.",
    },
  ];
  // article idx 추가 필요
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
