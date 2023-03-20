import React, { Fragment } from "react";
import { ReactDOM } from "react";
import { IconContext } from "react-icons";
import { FaHeart } from "react-icons/fa";
import Sidebar from "../components/Sidebar";

const MainPage = () => {
  return (
    <div className="w-screen h-screen flex flex-row justify-start bg-stone-50">
      <Sidebar className={"w-72 h-full bg-stone-100"} />
    </div>
  );
};

export default MainPage;
