import { Profile } from "@/types/layout";
import { atom } from "recoil";

// 登录弹窗
export const loginVisibleState = atom({
  key: "login_modal_visible",
  default: false
});

// 登录信息
export const loginInfoState = atom<Profile>({
  key: "login_info",
  default: {}
});
