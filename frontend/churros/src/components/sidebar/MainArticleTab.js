import SidebarItem from "./SidebarItem";
import { SIDEBAR_ITEM_SIZE } from "./constants";
import { IoBookOutline } from "react-icons/io5";

const MainArticleTab = (props) => {
  return (
    <SidebarItem
      className={`${SIDEBAR_ITEM_SIZE.sm} bg-transparent hover:bg-stone-200`}
    >
      <div className="block w-7" />
      <IoBookOutline className="p-2" size={35} style={{ color: "837F79" }} />
      <p className="text-sm text-center">추천 기사</p>
    </SidebarItem>
  );
};

export default MainArticleTab;
