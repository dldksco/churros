import { NavLink } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import { selectedSidebarItemIdState } from "../../store/sidebar";

const SelectableSidebarItem = ({ navigateTo, itemId, className, children, onClick }) => {
  const [selectedSidebarItemId, setSelectedSidebarItemId] = useRecoilState(
    selectedSidebarItemIdState
  );

  const handleItemClick = () => {
    setSelectedSidebarItemId((prevItemId) => {
      if (prevItemId != itemId && onClick) {
        onClick();
      }
      return itemId;
    });
  };

  return (
    <NavLink
      to={navigateTo}
      className = {({isActive}) => `flex flex-row justify-start items-center w-full ${className} ${isActive ? "bg-stone-300" : ""}`}
    >
      {children}
    </NavLink>
  );
};

export default SelectableSidebarItem;
