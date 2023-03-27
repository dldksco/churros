// import { useState, useEffect } from "react";
// import test from "../axios-instance/test";
// import ArticleList from "../components/article/ArticleList";
import A1 from "../components/article/A1"

const Main = () => {
  return (
    <div className="flex-1 flex-col justify-start w-full h-full p-2 overflow-y-auto">
      <div className="block w-full h-[28rem]">
        <A1/>
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
