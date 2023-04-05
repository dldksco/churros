import React from "react";
import { IoLogOutOutline } from "react-icons/io5";
import { api } from "../../axios-instance/api";
import { useNavigate } from "react-router-dom";

const LogoutButton = () => {
  const navigate = useNavigate();
  const fetchData = async () => {
    try {
      const response = await api.post(`/user/logout`,
      );
      const { result } = response.data;
      console.log(`logout result : ${result}`);
      navigate("/landing")
    } catch (error) {
      console.log(error);
    }
  };
  const handleLogout = (event) => {
    event.preventDefault();
    fetchData();
  };

  return (
    <div className={"flex flex-row justify-start items-center w-full h-10"} onClick={handleLogout}>
      <IoLogOutOutline size={35} className="p-2" />
      <p className="text-sm text-center">로그아웃</p>
    </div>
  );
};

export default LogoutButton;
