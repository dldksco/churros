import React from "react";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Article from "../components/article/Article";
import axios from "axios";
const LikesPage = () => {
  const location = useLocation();
  const searchData = location.state;
  console.log(searchData);
  const [searchList, setSearchList] = useState([]);

  useEffect(() => {
    // 시작과 함께 axios 통신으로 리스트 받아옴
    setSearchList([
      { title: "First Article", text: "Text" },
      { title: "Second Article", text: "Text2" },
      { title: "Third Article", text: "Text3" },
      { title: "Fourth Article", text: "Text4" },
      { title: "Fifth Article", text: "Text5" },
      { title: "Second Article", text: "Text6" },
    ]);
  }, []);
  return (
    <div>
      <div className="text-2xl flex item-center">
        <p className="font-bold mx-4">{searchData}</p> 에 대한 검색 결과 입니다
      </div>
      <div className="grid grid-cols-2 gap-4 p-5">
        {/* 검색결과 */}
        {searchList.slice(1).map((article, idx) => (
          <div key={idx} className="col-span-1 relative">
            <Article />
          </div>
        ))}
      </div>
    </div>
  );
};

export default LikesPage;
