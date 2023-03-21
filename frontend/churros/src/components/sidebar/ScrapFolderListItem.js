import SidebarItem from "./SidebarItem";
import { SIDEBAR_ITEM_SIZE } from "./constants";
import { IoEllipsisHorizontalSharp } from "react-icons/io5";
import { FaMinus } from "react-icons/fa";

const ScrapFolderListItem = ({ title, folderIdx }) => {
  const loadScrapFolderPage = () => {
    console.log(`request items of pScrapFolder(${folderIdx})`);
  };

  const showActionMenuModal = () => {
    console.log(`show action menu modal of ScrapFolder(${folderIdx})`);
  };

  return (
    <SidebarItem className={`${SIDEBAR_ITEM_SIZE.sm}`}>
      <div className="w-full h-full flex flex-row justify-between items-center">
        <div
          className={`flex flex-row justify-start items-center w-full h-full hover:bg-stone-200`}
          onClick={loadScrapFolderPage}
        >
          <div className="block w-7" />
          <div className="flex flex-row justify-start items-center">
            <FaMinus
              className="p-2 hover:bg-stone-200"
              size={25}
              style={{ color: "837F79" }}
            />
            <p className="text-sm text-center mx-2">{title}</p>
          </div>
        </div>
        <IoEllipsisHorizontalSharp
          className="w-10 h-full p-2 hover:bg-stone-200"
          style={{ color: "837F79" }}
          onClick={showActionMenuModal}
        />
      </div>
    </SidebarItem>
  );
};

export default ScrapFolderListItem;
