import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import { accessTokenState, refreshTokenState } from "../store/auth";
import { userInfoState } from "../store/user";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { api } from "../axios-instance/api";
import { Fragment } from "react";

const KakaoRedirectHandler = () => {
  const params = new URLSearchParams(window.location.search);
  const setAccessToken = useSetRecoilState(accessTokenState); // 액세스 토큰 세터를 Recoil로 부터 얻어온다
  const setRefreshToken = useSetRecoilState(refreshTokenState); // 리프레시 토큰 세터를 Recoil로 부터 얻어온다
  const setUserInfo = useSetRecoilState(userInfoState); // 유저 정보 세터를 Recoil로 부터 얻어온다

  const [isLoading, setLoading] = useState(true);
  const requestUserInfo = async (accessToken) => {
    try {
      const response = await api.get("/user");
      const { userInfo } = response.data;
      console.log(userInfo);
      setUserInfo(userInfo);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  setAccessToken(params.get("access-token"));
  setRefreshToken(params.get("refresh-token"));
  requestUserInfo(useRecoilValue(accessTokenState));

  return <Fragment>{isLoading ? <div /> : <Navigate to={"/"} />}</Fragment>;
};

export default KakaoRedirectHandler;
