import SelectableSidebarItem from "./SelectableSidebarItem";
import { SIDEBAR_ITEM_SIZE } from "./constants";
import { FaHeart } from "react-icons/fa/index.esm";

const LikedArticleTab = ({ itemId }) => {
  const handleLikedArticleTabClicked = () => {
    console.log("liked article tab clicked");
  };

  return (
    <SelectableSidebarItem
      itemId={itemId}
      className={`${SIDEBAR_ITEM_SIZE.sm} bg-transparent hover:bg-stone-300`}
      onClick={handleLikedArticleTabClicked}
    >
      <div className="block w-7" />
      <FaHeart className="p-2" size={35} style={{ color: "red" }} />
      <p className="text-sm text-center">좋아요한 기사</p>
    </SelectableSidebarItem>
  );
};

export default LikedArticleTab;
