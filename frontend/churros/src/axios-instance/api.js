import axios from "axios";
import { accessTokenState, refreshTokenState } from "../store/auth";
import { userInfoState } from "../store/user";
import { selectedSidebarItemIdState, showScrapFolderListState, scrapFolderListState } from "../store/sidebar-global-state";
import { useResetRecoilState } from "recoil";
//  axios instances
// to api server
export const api = axios.create({
  baseURL: "https://churros.site/api",
});

api.interceptors.request.use((config) => {
  const accessToken = JSON.parse(
    localStorage.getItem("recoil-persist")
  )?.accessToken;
  if (accessToken) config.headers.Authorization = `Bearer ${accessToken}`;
  else {
    console.log("accessToken not exists");
  }
  return config;
});

const logout = () => {

  const resetAccessToken = useResetRecoilState(accessTokenState);
  resetAccessToken();

  const resetRefreshToken = useResetRecoilState(refreshTokenState);
  resetRefreshToken();

  const resetUserInfo = useResetRecoilState(userInfoState);
  resetUserInfo();

  const resetSelectedSidebarItem = useResetRecoilState(selectedSidebarItemIdState);
  resetSelectedSidebarItem();

  const resetShowScrapFolderList = useResetRecoilState(showScrapFolderListState);
  resetShowScrapFolderList();

  const resetScrapFolderList = useResetRecoilState(scrapFolderListState);
  resetScrapFolderList();

  window.location.href = "httsp://churros.site/landing";
}

api.interceptors.response.use(
  (response) => { return response},
  (error) => {
    console.log(error);

    if(error.response && (error.response.status === 401 || error.response.status === 403)){
      logout();
    }
    return Promise.reject(error);
  }
);
