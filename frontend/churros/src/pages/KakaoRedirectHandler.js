import { Navigate } from "react-router-dom";
import { accessTokenState, refreshTokenState } from "../store/auth";
import { useSetRecoilState } from "recoil";

const KakaoRedirectHandler = () => {
  const params = URLSearchParams(window.location.href);

  const setAccessToken = useSetRecoilState(accessTokenState);
  setAccessToken(params.get("access-token"));

  const setRefreshToken = useSetRecoilState(refreshTokenState);
  setRefreshToken(params.get("refresh-token"));

  return <Navigate to={"/"} />;
};

export default KakaoRedirectHandler;
