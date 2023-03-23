import SidebarItem from "./SidebarItem";
import { SIDEBAR_ITEM_SIZE } from "./sidebar-constants";
import { FaUserCircle } from "react-icons/fa";

const UserProfileTab = () => {
  return (
    <SidebarItem
      className={`${SIDEBAR_ITEM_SIZE.lg} bg-transparent hover:bg-stone-200`}
    >
      <FaUserCircle
        className="p-2"
        size={50}
        style={{ color: "rgb(251 146 60)" }}
      />
      <p className="text-base font-bold text-center">Username</p>
    </SidebarItem>
  );
};

export default UserProfileTab;
