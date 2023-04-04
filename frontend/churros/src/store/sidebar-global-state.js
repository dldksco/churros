import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

export const selectedSidebarItemIdState = atom({
  key: "selectedSidebarItemIdState",
  default: "",
});

export const showScrapFolderListState = atom({
  key: "showScrapFolderListState",
  default: false,
});

const {persistAtom} = recoilPersist();

export const scrapFolderListState = atom({
  key: "scrapFolderListState",
  default: [],
  effects: [persistAtom]
});
