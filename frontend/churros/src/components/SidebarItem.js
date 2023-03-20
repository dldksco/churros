const SidebarItem = ({ onClick, className, children }) => {
  return (
    <div
      className={`flex flex-row justify-start items-center w-full ${className}`}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export default SidebarItem;
