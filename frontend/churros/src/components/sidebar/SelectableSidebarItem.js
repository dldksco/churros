import { useRecoilState, useRecoilValue } from "recoil";
import { selectedSidebarItemIdState } from "../../store/sidebar";

const SelectableSidebarItem = ({ itemId, className, children, onClick }) => {
  const [selectedSidebarItemId, setSelectedSidebarItemId] = useRecoilState(
    selectedSidebarItemIdState
  );

  const handleItemClick = () => {
    setSelectedSidebarItemId((prevItemId) => {
      if ((prevItemId != itemId) && onClick) {
        onClick();
      }
      return itemId;
    });
  };

  return (
    <div
      className={`flex flex-row justify-start items-center w-full ${className} ${
        selectedSidebarItemId === itemId && "bg-stone-300"
      }`}
      onClick={handleItemClick}
    >
      {children}
    </div>
  );
};

export default SelectableSidebarItem;
