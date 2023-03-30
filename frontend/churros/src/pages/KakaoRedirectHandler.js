import { Navigate } from "react-router-dom";
import { accessTokenState, refreshTokenState } from "../store/auth";
import { userInfoState } from "../store/user";
import { useRecoilValue, useSetRecoilState } from "recoil";
import {api} from "../axios-instance/api";

const KakaoRedirectHandler = () => {
  const params = new URLSearchParams(window.location.search);
  const setAccessToken = useSetRecoilState(accessTokenState); // 액세스 토큰 세터를 Recoil로 부터 얻어온다
  const setRefreshToken = useSetRecoilState(refreshTokenState); // 리프레시 토큰 세터를 Recoil로 부터 얻어온다
  const setUserInfo = useSetRecoilState(userInfoState); // 유저 정보 세터를 Recoil로 부터 얻어온다
  const requestUserInfo = async (accessToken) => {
    try {
      const response = await api.get("/user");
      const { userInfo } = response.data;
      setUserInfo(userInfo);
    } catch (error) {
      console.log(error);
    }
  };

  setAccessToken(params.get("access-token"));
  setRefreshToken(params.get("refresh-token"));
  requestUserInfo(useRecoilValue(accessTokenState));

  return <Navigate to={"/"} />;
};

export default KakaoRedirectHandler;
