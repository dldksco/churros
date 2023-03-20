import React, { useState } from "react";
import SidebarItem from "./SidebarItem";
import { FaUserCircle, FaHeart } from "react-icons/fa";
import {
  IoBookOutline,
  IoChevronForwardOutline,
} from "react-icons/io5";

import ScrapFolderSidebarItem from "./ScrapFolderSidebarItem";

const Sidebar = ({ className }) => {
  const SIDEBAR_ITEM_HEIGHT_LG = "h-14 mb-2";
  const SIDEBAR_ITEM_HEIGHT_SM = "h-8 mb-1";

  const logoItemClickHandler = () => {
    console.log("Link main-article clicked");
  };

  const userProfileItemClickHandler = () => {
    console.log("User profile item clicked");
  };

  const mainArticleItemClickHandler = () => {
    console.log("Link main-article clicked");
  };

  const likeArticleItemClickHandler = () => {
    console.log("Link liked-article clicked");
  };

  return (
    <div className={`flex flex-col justify-start ${className}`}>
      <SidebarItem
        key="1"
        className={`${SIDEBAR_ITEM_HEIGHT_LG} bg-stone-200`}
        onClick={logoItemClickHandler}
      ></SidebarItem>

      <SidebarItem
        key="2"
        className={`${SIDEBAR_ITEM_HEIGHT_LG} bg-transparent`}
        onClick={userProfileItemClickHandler}
      >
        <FaUserCircle
          className="p-2"
          size={50}
          style={{ color: "rgb(251 146 60)" }}
        />
        <p className="text-base font-bold text-center">Username</p>
      </SidebarItem>

      <SidebarItem
        key="3"
        className={`${SIDEBAR_ITEM_HEIGHT_SM} bg-transparent`}
        onClick={mainArticleItemClickHandler}
      >
        <IoChevronForwardOutline
          className="w-7 pl-2"
          size={30}
          style={{ color: "transparent" }}
        />
        <IoBookOutline className="p-2" size={35} style={{ color: "837F79" }} />
        <p className="text-sm text-center">추천 기사</p>
      </SidebarItem>

      <SidebarItem
        key="4"
        className={`${SIDEBAR_ITEM_HEIGHT_SM} bg-transparent`}
        onClick={likeArticleItemClickHandler}
      >
        <IoChevronForwardOutline
          className="w-7 pl-2"
          size={30}
          style={{ color: "transparent" }}
        />
        <FaHeart className="p-2" size={35} style={{ color: "red" }} />
        <p className="text-sm text-center">좋아요한 기사</p>
      </SidebarItem>

      <ScrapFolderSidebarItem key={5} className={`${SIDEBAR_ITEM_HEIGHT_SM} bg-transparent`}/>
    </div>
  );
};

export default Sidebar;
