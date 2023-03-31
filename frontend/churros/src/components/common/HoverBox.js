import React, { useState } from "react";
import { FaHeart } from "react-icons/fa";
import { IoFolderSharp } from "react-icons/io5";

const HoverBox = ({}) => {
  const [like, setLike] = useState(false);

  const handleHoverBoxClick = (event) => {
    event.preventDefault();
    event.stopPropagation();
  };

  const handleLike = (event) => {
    event.preventDefault();
    event.stopPropagation();

    setLike((prevState) => !prevState);
  };

  const handleScrap = (event) => {
    event.preventDefault();
    event.stopPropagation();

    console.log("스크랩 모달 띄우기");
  };

  return (
    <div className="absolute right-0 bottom-0 w-28 h-14 z-10 flex flex-row justify-center items-center bg-white rounded-lg drop-shadow-md m-2" onClick={handleHoverBoxClick}>
      <FaHeart
        className={`m-2 p-1 ${
          like
            ? "text-red-500"
            : "text-gray-500 hover:text-red-500 transition-colors duration-300 cursor-pointer"
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
