import React from "react";
import { useState, useEffect, useRef, useCallback } from "react";
import { useLocation } from "react-router-dom";
import Article from "../components/article/Article";
import { api } from "../axios-instance/api";
import useFetch from "../components/useFetch";

const SearchPage = () => {
  const location = useLocation();
  const searchData = location.state;
  const [pageNum, setPageNum] = useState(0);
  const { loading, error, searchList } = useFetch(searchData, pageNum);
  const loader = useRef(null);
  // 시작과 함께 axios 통신으로 리스트 받아옴

  const handleObserver = useCallback((entries) => {
    const target = entries[0];
    if (target.isIntersecting) {
      setPageNum((prev) => prev + 1);
    }
  }, []);

  useEffect(() => {
    const option = {
      root: null,
      rootMargin: "20px",
      threshold: 0
    };
    const observer = new IntersectionObserver(handleObserver, option);
    if (loader.current) observer.observe(loader.current);
  }, [handleObserver]);
  return (
    <div>
      <div className="text-2xl flex item-center">
        <p className="font-bold mx-4">{searchData}</p> 에 대한 검색 결과 입니다
      </div>
      <div className="grid grid-cols-2 gap-4 p-5">
        {/* 검색결과 */}
        {searchList &&
          searchList.map((article, idx) => (
            <div key={idx} className="col-span-1 relative">
              <Article shape="2" articleIdx={article.idx} />
            </div>
          ))}
      </div>
      {loading && <p>Loading...</p>}
      <div ref={loader} />
    </div>
  );
};

export default SearchPage;
