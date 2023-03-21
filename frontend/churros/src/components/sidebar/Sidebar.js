import React, { useState } from "react";
import { SIDEBAR_TAB_KEYS as keys } from "./constants";
import { atom, useRecoilValue } from "recoil";

import LogoTab from "./LogoTab";
import UserProfileTab from "./UserProfileTab";
import MainArticleTab from "./MainArticleTab";
import LikedArticleTab from "./LikedArticleTab";
import ScrapFolderTab from "./ScrapFolderTab";
import ScrapFolderListItem from "./ScrapFolderListItem";
import { showScrapFolderListState } from "../../store/sidebar";

const Sidebar = () => {
  const showScrapFolderList = useRecoilValue(showScrapFolderListState);

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

  return (
    <div
      className={`fixed justify-start w-64 h-full overflow-y-auto bg-stone-100`}
    >
      <LogoTab key={keys.logoTab} />

      <UserProfileTab key={keys.userProfileTab} />

      <MainArticleTab key={keys.mainArticleTab} itemId={keys.mainArticleTab} />

      <LikedArticleTab
        key={keys.likedArticleTab}
        itemId={keys.likedArticleTab}
      />

      <ScrapFolderTab key={keys.scrapFolderTab} />

      {showScrapFolderList &&
        scrapFolderList.map((item) => (
          <ScrapFolderListItem
            key={item.folderIdx}
            itemId={item.folderIdx}
            title={item.title}
            folderIdx={item.folderIdx}
          />
        ))}
    </div>
  );
};

export default Sidebar;
