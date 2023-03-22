import React, { Fragment } from "react";
import { Outlet } from "react-router-dom";
import Section from "../components/section/Section";
import Sidebar from "../components/sidebar/Sidebar";
import Topbar from "../components/topbar/Topbar";

const MainPage = () => {
  return (
    <div className="w-screen h-screen flex flex-row justify-start bg-stone-50">
      <Sidebar />
      <div className="flex flex-col justify-start w-full h-full">
        <Topbar>
          <h1>This is</h1>
          <h1>Topbar</h1>
        </Topbar>
        <Section>
            <Outlet/>
        </Section>
      </div>
    </div>
  );
};

export default MainPage;
