import { atom } from "recoil";

export const accessTokenState = atom({
  key: "accessTokenState",
  default: "",
  effects: [
    ({ setSelf }) => {
      const storedUserInfo = localStorage.getItem("accessToken");
      if (storedUserInfo) {
        setSelf(storedUserInfo);
      }
    },
    ({ onSet }) => {
      onSet((newValue) => {
        localStorage.setItem("accessToken", newValue);
      });
    },
  ],
});

export const refreshTokenState = atom({
  key: "refreshTokenState",
  default: "",
  effects: [
    ({ setSelf }) => {
      const storedUserInfo = localStorage.getItem("refreshToken");
      if (storedUserInfo) {
        setSelf(storedUserInfo);
      }
    },
    ({ onSet }) => {
      onSet((newValue) => {
        localStorage.setItem("refreshToken", newValue);
      });
    },
  ],
});
