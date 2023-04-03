import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

export const accessTokenState = atom({
  key: "accessTokenState",
  default: null,
  effects: [persistAtom({ key: "accessToken", storage: localStorage })],
});

export const refreshTokenState = atom({
  key: "refreshTokenState",
  default: null,
  effects: [persistAtom({ key: "refreshToken", storage: localStorage })],
});
