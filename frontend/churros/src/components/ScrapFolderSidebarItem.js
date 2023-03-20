import React, { useState } from "react";
import { Fragment } from "react";
import SidebarItem from "./SidebarItem";
import {
  IoChevronForwardOutline,
  IoFolderSharp,
  IoAddOutline,
} from "react-icons/io5";

const ScrapFolderSidebarItem = ({ className }) => {
  const [showScrapFolderList, setShowScrapFolderList] = useState(false);

  // redux로 상태를 관리할 필요가 있다
  const scrapFolderList = [
    {
      title: "folder1",
      folderIdx: 1,
    },
    {
      title: "folder2",
      folderIdx: 2,
    },
    {
      title: "folder3",
      folderIdx: 3,
    },
    {
      title: "folder4",
      folderIdx: 4,
    },
  ];

  const toggleScrapFolderList = () => {
    console.log("toggle scrap folder list");
    setShowScrapFolderList((prevState) => !prevState);
  };

  const addNewScrapFolder = () => {
    console.log("add new scrap folder");
  };

  return (
    <Fragment>
      <SidebarItem className={className}>
        <div className="w-full h-full flex flex-row justify-between items-center">
          <div
            className="flex flex-row justify-start items-center w-full hover:bg-stone-200"
            onClick={toggleScrapFolderList}
          >
            <IoChevronForwardOutline
              className="w-7 pl-2"
              size={30}
              style={{ color: "837F79" }}
            />
            <div className="flex flex-row justify-start items-center">
              <IoFolderSharp
                className="p-2 hover:bg-stone-200"
                size={35}
                style={{ color: "FFB240" }}
              />
              <p className="text-sm text-center">스크랩 폴더</p>
            </div>
          </div>
          <IoAddOutline
            className="p-2 hover:bg-stone-200"
            size={40}
            style={{ color: "837F79" }}
            onClick={addNewScrapFolder}
          />
        </div>
      </SidebarItem>
      {showScrapFolderList && (
        <div>
          <h1>folder1</h1>
          <h1>folder2</h1>
        </div>
      )}
    </Fragment>
  );
};

export default ScrapFolderSidebarItem;
