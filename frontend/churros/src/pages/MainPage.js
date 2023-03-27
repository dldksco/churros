import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import Section from "../components/section/Section";
import Sidebar from "../components/sidebar/Sidebar";
import Topbar from "../components/topbar/Topbar";

const MainPage = () => {
  // Naver Login 인증처리가 완료되면 LocalStorage에 isLoggedIn, accessToken 아이템이 추가될 것이다
  const isAuthenticated = false;

  if (!isAuthenticated) return <Navigate to="/landing" />;

  return (
    <div className="w-screen h-screen flex flex-row justify-start bg-stone-50">
      <Sidebar />
      <div className="flex flex-col justify-start w-full h-full">
        <Topbar>
          <h1>This is</h1>
          <h1>Topbar</h1>
        </Topbar>
        <Section>
          <Outlet />
        </Section>
      </div>
    </div>
  );
};

export default MainPage;
