import React, { useState } from "react";

import LogoTab from "./LogoTab";
import UserProfileTab from "./UserProfileTab";
import MainArticleTab from "./MainArticleTab";
import LikedArticleTab from "./LikedArticleTab";
import ScrapFolderTab from "./ScrapFolderTab";
import ScrapFolderListItem from "./ScrapFolderListItem";

const Sidebar = () => {
  const [selectedItemId, setSelectedItemId] = useState();
  const [showScrapFolderList, setShowScrapFolderList] = useState(false);
  const scrapFolderList = [
    {
      title: "IT",
      folderIdx: 1,
    },
    {
      title: "정치",
      folderIdx: 2,
    },
    {
      title: "경제",
      folderIdx: 3,
    },
    {
      title: "취업",
      folderIdx: 4,
    },
    {
      title: "취업",
      folderIdx: 5,
    },
    {
      title: "취업",
      folderIdx: 6,
    },
    {
      title: "취업",
      folderIdx: 7,
    },
    {
      title: "취업",
      folderIdx: 8,
    },
    {
      title: "취업",
      folderIdx: 9,
    },
    {
      title: "취업",
      folderIdx: 10,
    },
    {
      title: "취업",
      folderIdx: 11,
    },
    {
      title: "취업",
      folderIdx: 12,
    },
    {
      title: "취업",
      folderIdx: 13,
    },
    {
      title: "취업",
      folderIdx: 14,
    },
    {
      title: "취업",
      folderIdx: 15,
    },
    {
      title: "취업",
      folderIdx: 16,
    },
    {
      title: "취업",
      folderIdx: 17,
    },
  ];

  const toggleScrapFolderList = () => {
    setShowScrapFolderList(prev => !prev);
  }

  const handleItemClick = (id) => {
    setSelectedItemId(id);
  };

  return (
    <div
      className={`fixed justify-start w-64 h-full overflow-y-auto bg-stone-100`}
    >
      <LogoTab key={"a"} />
      <UserProfileTab key={"b"} />
      <MainArticleTab key={"c"} isSelected={selectedItemId === "c"} onItemClick={handleItemClick}/>
      <LikedArticleTab key={"d"} isSelected={selectedItemId === "d"} onItemClick={handleItemClick}/>
      <ScrapFolderTab key={"e"} scrapFolderListHandler={toggleScrapFolderList}/>
      {showScrapFolderList &&
        scrapFolderList.map((item) => (
          <ScrapFolderListItem
            key={item.folderIdx}
            isSelected={selectedItemId === item.folderIdx}
            onItemClick={handleItemClick}
            title={item.title}
            folderIdx={item.folderIdx}
          />
        ))}
    </div>
  );
};

export default Sidebar;
