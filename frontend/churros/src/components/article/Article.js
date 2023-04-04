import React from "react";
import { useState, useEffect } from "react";
import HoverBox from "../common/HoverBox";
import CloseButton from "../common/CloseButton";
import { api } from "../../axios-instance/api";
const Article = ({ shape, articleIdx }) => {
  let sizename = "max-w w-90 lg:flex place-content-center rounded-tl-xl rounded-bl-xl";
  console.log(articleIdx);
  if (shape === "1") {
    sizename += " h-60";
  } else {
    sizename += " h-full";
  }
  let picturename = "";
  if (shape === "3") {
    picturename =
      "2xl:h-auto 2xl:w-48 flex-none bg-cover rounded-t  text-center overflow-hidden rounded-tl-xl rounded-bl-xl";
  } else
    picturename =
      "lg:h-auto lg:w-48 flex-none bg-cover rounded-t  text-center overflow-hidden rounded-tl-xl rounded-bl-xl";

  // article content
  const [content, setContent] = useState({});
  const fetchData = async () => {
    try {
      const response = await api.get(`/news/${articleIdx}`);
      const { result, article } = response.data;
      console.log(`loading sample article ${articleIdx}: ${result}`);
      setContent({ ...article });
    } catch (error) {
      console.log(error);
    }
  };
  console.log(content);
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className={sizename}>
      <div
        className={picturename}
        style={{
          backgroundImage: `url(${content.imgUrl})`,
        }}
        title="기사 사진"
      ></div>
      <div className="w-4/6 border-r border-b border-l border-grey-light lg:border-l-0 lg:border-t lg:border-grey-light bg-white p-4 flex flex-col justify-between leading-normal relative rounded-br-xl rounded-tr-xl">
        <div className="mb-8">
          <CloseButton articleIdx={articleIdx} />
          <div className="text-black font-bold text-xl mb-2">
            {content.title}
          </div>
          <p className={`text-grey-darker text-base line-clamp ${shape === 3 ? "line-clamp-3" : "line-clamp-5"}`}>
            {content.description}
          </p>
          <HoverBox articleIdx={articleIdx} />
        </div>
      </div>
    </div>
  );
};

export default Article;
