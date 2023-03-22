import { useRecoilState } from "recoil";
import {selectedSidebarItemIdState} from "../../store/sidebar"

const SelectableSidebarItem = ({ itemId, className, children, onClick }) => {
  
  const [selectedSidebarItemId, setSelectedSidebarItemId] = useRecoilState(
    selectedSidebarItemIdState
  );

  const handleItemClick = () => {
    setSelectedSidebarItemId(itemId);
    if(!onClick) return;
    onClick();
  };

  return (
    <div
      className={`flex flex-row justify-start items-center w-full ${className} ${
        selectedSidebarItemId === itemId && "bg-stone-300"}`}
      onClick={handleItemClick}
    >
      {children}
    </div>
  );
};

export default SelectableSidebarItem;
