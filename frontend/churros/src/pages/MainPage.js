import React, { Fragment } from "react";
import { ReactDOM } from "react";
import { IconContext } from "react-icons";
import { FaHeart } from "react-icons/fa";
import Sidebar from "../components/Sidebar";

const MainPage = () => {
  return (
    <div className="w-screen h-screen flex flex-row justify-start bg-stone-50">
      <Sidebar className={"w-64 h-full bg-stone-100"} />
      <div className="flex flex-col justify-start w-full h-full">
        Section
        <FaHeart style={{color: "red"}} />
      </div>
    </div>
  );
};

export default MainPage;
