import React, { Fragment } from "react";
import Sidebar from "../components/sidebar/Sidebar";

const MainPage = () => {
  return (
    <div className="w-screen h-screen flex flex-row justify-start bg-stone-50">
      <Sidebar/>
      <div className="flex flex-col justify-start w-full h-full">
        <div className="flex flex-row justify-between items-center h-14">
          <h1>This is</h1>
          <h1>Navbar</h1>
        </div>
        <div className="flex flex-col justify-start w-full h-full">
          <h1>This</h1>
          <h1>is</h1>
          <h1>a main section</h1>
        </div>
      </div>
    </div>
  );
};

export default MainPage;
