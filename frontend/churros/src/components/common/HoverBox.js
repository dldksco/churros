import React, { useState, useEffect } from "react";
import { FaHeart } from "react-icons/fa";
import { IoFolderSharp } from "react-icons/io5";
import ScrapDialogueModal from "../../modal/ScrapDialogueModal";
import { api } from "../../axios-instance/api";

const HoverBox = ({ articleIdx }) => {
  const [like, setLike] = useState(false);
  const [openScrapDialogue, setOpenScrapDialogue] = useState(false);

  const handleHoverBoxClick = (event) => {
    event.preventDefault();
    event.stopPropagation();

  };

  const handleLike = (event) => {
    likeOnclick();
    setLike((prevState) => !prevState);
  };

  const likeOnclick = async () => {
    const data = JSON.stringify()
    try {
      const response = await api.put(`/news/like`, {articleId: articleIdx});
      const { result } = response.data;
      console.log(`liked ${articleIdx}: ${result}`);
    } catch (error) {
      console.log(error);
    }
  };

  const handleScrap = (event) => {
    event.preventDefault();
    setOpenScrapDialogue(true);
    console.log("스크랩 모달 띄우기");
  };

  const likeSetting = async () => {
    try {
      const response = await api.get(`/news/like`);
      const { result, articles } = response.data;
      setLike(articles.indexOf(articleIdx) === -1 ? false : true);
      console.log(`like set ${result}`);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    likeSetting();
  }, []);
  
  return (
    <div className="absolute right-0 bottom-0 w-22 h-10 z-10 flex flex-row justify-center items-center bg-white rounded-lg drop-shadow-md m-2" onClick={handleHoverBoxClick}>
      {openScrapDialogue && <ScrapDialogueModal target={articleIdx} onClose={() => setOpenScrapDialogue(false)}/>}
      <FaHeart
        className={`m-2 p-1 ${
          like
            ? "text-red-500 cursor-pointer"
            : "text-gray-500 cursor-pointer"
        }`}
        size={30}
        onClick={handleLike}
      />
      <IoFolderSharp
        className="m-2 p-1 text-gray-500 hover:text-orange-300 transition-colors duration-300 cursor-pointer"
        size={30}
        onClick={handleScrap}
      />
    </div>
  );
};

export default HoverBox;
