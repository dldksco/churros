import React from "react";
import { ReactDOM } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useRecoilValue } from "recoil";
import Section from "../components/section/Section";
import Sidebar from "../components/sidebar/Sidebar";
import Topbar from "../components/topbar/Topbar";
import SurveyModal from "../modal/SurveyModal";
import { accessTokenState } from "../store/auth";
import { userInfoState } from "../store/user";

const Home = () => {
  const accessToken = useRecoilValue(accessTokenState);
  console.log(accessToken);
  const isAuthenticated = accessToken > 0;

  const userInfo = useRecoilValue(userInfoState);
  // Todo: access token validation
  // if (!isAuthenticated) return <Navigate to="/landing" />;

  return (
    <div className="w-screen h-screen flex flex-row justify-start bg-stone-50">
      {/* {!userInfo?.isUserInterestsInitialized && <SurveyModal />} */}
      <Sidebar />
      <div className="flex flex-1 flex-col justify-start w-full h-full overflow-auto">
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

export default Home;
