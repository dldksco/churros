import SidebarNavLink from "./SidebarNavLink";
import { SIDEBAR_ITEM_SIZE } from "./sidebar-constants";
import { FaHeart } from "react-icons/fa";

const LikedArticleTab = () => {
  const navigateTo = "/news/likes";

  return (
    <SidebarNavLink
      navigateTo={navigateTo}
      className={`${SIDEBAR_ITEM_SIZE.sm} hover:bg-stone-300`}
    >
      <div className="block w-7" />
      <FaHeart className="p-2" size={35} style={{ color: "red" }} />
      <p className="text-sm text-center">좋아요한 기사</p>
    </SidebarNavLink>
  );
};

export default LikedArticleTab;
