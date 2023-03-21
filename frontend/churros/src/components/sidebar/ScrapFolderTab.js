import React, { useState } from "react";
import { Fragment } from "react";
import SidebarItem from "./SidebarItem";
import {
  IoChevronForwardOutline,
  IoFolderSharp,
  IoAddOutline,
} from "react-icons/io5";
import { SIDEBAR_ITEM_SIZE } from "./constants";
import ScrapFolderListItem from "./ScrapFolderListItem";

const ScrapFolderTab = ({key, scrapFolderListHandler}) => {

  const addNewScrapFolder = () => {
    console.log("add new scrap folder");
  };

  return (
      <SidebarItem className={`${SIDEBAR_ITEM_SIZE.sm}`}>
        <div className="w-full h-full flex flex-row justify-between items-center">
          <div
            className={`flex flex-row justify-start items-center w-full hover:bg-stone-200`}
            onClick={scrapFolderListHandler}
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
            className="w-10 h-full p-2 hover:bg-stone-200"
            style={{ color: "837F79" }}
            onClick={addNewScrapFolder}
          />
        </div>
      </SidebarItem>
  );
};

export default ScrapFolderTab;
