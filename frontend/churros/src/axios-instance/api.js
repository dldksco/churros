import axios from "axios";
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
  
  const initialized = {
    accessToken: null,
    refreshToken: null,
    userInfo: {},
    showScrapFolderListState: false,
    scrapFolderList: []
  }

  localStorage.setItem("recoil-persist", JSON.stringify(initialized));

  window.location.href = "httsp://churros.site/landing";
};

api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.log(error);

    if (
      error.response &&
      (error.response.status === 401 || error.response.status === 403)
    ) {
      logout();
    }
    return Promise.reject(error);
  }
);
