const SidebarItem = ({className, children}) => {
  return (
    <div
      className={`flex flex-row justify-start items-center w-full ${className}`}
    >
      {children}
    </div>
  );
};

export default SidebarItem;
