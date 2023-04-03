import { useState, useEffect } from "react";
// import test from "../axios-instance/test";
// import ArticleList from "../components/article/ArticleList";
import A1Carousel from "../components/article/A1Carousel";
import {api, test} from "../axios-instance/api";
import Article from "../components/article/Article";

const Main = () => {
  const [loading, setLoading] = useState(false);

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
        {loading && <h1>로딩 중...</h1>}
        {!loading && <A1Carousel slides={testArticles} />}
      </div>
      <div className="grid grid-cols-4 gap-4 w-full mb-4">
        <div className="col-span-2">
          <Article shape="2" articleIdx="2"/>
        </div>
        <div className="col-span-1"> 
          <Article shape="3" articleIdx="3" />
        </div>
      </div>
      <hr className="bg-black opacity-20 h-1" />
      <div className="block w-full h-[14rem]">Article Row</div>
      <hr className="bg-black opacity-20 h-1" />

      <div className="block w-full h-[14rem]">Article Row</div>
      <hr className="bg-black opacity-20 h-1" />

      <div className="block w-full h-[14rem]">Article Row</div>
      <hr className="bg-black opacity-20 h-1" />

      <div className="block w-full h-[14rem]">Article Row</div>
      <hr className="bg-black opacity-20 h-1" />

      <div className="block w-full h-[14rem]">Article Row</div>
      <hr className="bg-black opacity-20 h-1" />
    </div>
  );
};

export default Main;
