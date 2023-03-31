import React from "react";
import { IoLogOutOutline } from "react-icons/io5";

const LogoutButton = () => {
  const handleLogout = (event) => {
    event.preventDefault();
    console.log("handling logout");
  };

  return (
    <div className={"flex flex-row justify-start items-center w-full h-10"} onClick={handleLogout}>
      <IoLogOutOutline size={35} className="p-2" />
      <p className="text-sm text-center">로그아웃</p>
    </div>
  );
};

export default LogoutButton;
