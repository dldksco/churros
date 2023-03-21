import SidebarItem from "./SidebarItem";
import { SIDEBAR_ITEM_SIZE } from "./constants";
import { FaHeart } from "react-icons/fa/index.esm";

const LikedArticleTab = (props) => {
  return (
    <SidebarItem
      className={`${SIDEBAR_ITEM_SIZE.sm} bg-transparent hover:bg-stone-200`}
    >
      <div className="block w-7" />
      <FaHeart className="p-2" size={35} style={{ color: "red" }} />
      <p className="text-sm text-center">좋아요한 기사</p>
    </SidebarItem>
  );
};

export default LikedArticleTab;
