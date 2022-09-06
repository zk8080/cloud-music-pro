import { BannerRes, HotTagRes, PersonalizedNewSongRes, PersonalizedRes, PlaylistRes } from "./../types/home";
import { http } from "./request";

// 获取PC轮播图
export const getBanner = async () => {
  return await http.get<BannerRes>("/banner", {
    params: { type: 0 }
  });
};

// 获取推荐歌单(未登录)
export const getPersonalized = async (params: { limit?: number }) => {
  return await http.get<PersonalizedRes>("/personalized", {
    params
  });
};

// 获取推荐新歌单
export const getPersonalizedNewSong = async (params: { limit?: number }) => {
  return await http.get<PersonalizedNewSongRes>("/personalized/newsong", {
    params
  });
};

// 热门歌单分类
export const getHotTag = async () => {
  return await http.get<HotTagRes>("/playlist/hot");
};

// 获取精品歌单列表
export const getPlaylistByTag = async (params: { limit?: number; cat?: string }) => {
  return await http.get<PlaylistRes>("/top/playlist/highquality", { params });
};
