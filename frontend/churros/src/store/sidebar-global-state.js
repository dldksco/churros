import { atom } from "recoil";

export const selectedSidebarItemIdState = atom({
  key: "selectedSidebarItemIdState",
  default: "",
});

export const showScrapFolderListState = atom({
  key: "showScrapFolderListState",
  default: false,
});
