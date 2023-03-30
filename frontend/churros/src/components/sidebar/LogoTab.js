import SidebarItem from "./SidebarItem";
import { SIDEBAR_ITEM_SIZE } from "../../constants/sidebar-constants";

const LogoTab = () => {
  return (
    <SidebarItem className={`${SIDEBAR_ITEM_SIZE.lg} bg-stone-200`}>
        <img
          src="/favicon.ico"
          alt="logo"
          className="object-scale-down h-12 w-12 m-3"
        />
        <h1 className="align-middle font-cooper p-2 text-2xl">CHURROS</h1>
    </SidebarItem>
  );
};

export default LogoTab;
