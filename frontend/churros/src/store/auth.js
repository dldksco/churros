import { atom } from "recoil";

export const accessTokenState = atom({
  key: "accessTokenState",
  default: null,
  effects: [
    ({ setSelf }) => {
      const storedAccessToken = localStorage.getItem("accessToken");
      if (storedAccessToken) {
        setSelf(storedAccessToken);
      }
    },
    ({ onSet }) => {
      onSet((newValue) => {
        localStorage.setItem("accessToken", newValue);
      });
    },
    ({ resetSelf }) => {
      resetSelf(() => {
        localStorage.removeItem("accessToken");
      });
    },
  ],
});

export const refreshTokenState = atom({
  key: "refreshTokenState",
  default: null,
  effects: [
    ({ setSelf }) => {
      const storedRefreshToken = localStorage.getItem("refreshToken");
      if (storedRefreshToken) {
        setSelf(storedRefreshToken);
      }
    },
    ({ onSet }) => {
      onSet((newValue) => {
        localStorage.setItem("refreshToken", newValue);
      });
    },
    ({ resetSelf }) => {
      resetSelf(() => {
        localStorage.removeItem("refreshToken");
      });
    },
  ],
});
