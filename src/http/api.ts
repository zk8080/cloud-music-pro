import { CategoryListRes } from "./../types/category";
import {
  BannerRes,
  HotTagRes,
  PersonalizedNewSongRes,
  PersonalizedRes,
  PlaylistDetailRes,
  PlaylistRes,
  ToplistRes
} from "./../types/home";
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

// 获取所有榜单列表
export const getToplist = async () => {
  return await http.get<ToplistRes>("/toplist");
};

// 获取歌单详情
export const getPlaylistTrackList = async (params: { id: number; limit?: number }) => {
  return await http.get<PlaylistDetailRes>("/playlist/track/all", { params });
};

// 获取歌单分类
export const getCategoryList = async () => {
  return await http.get<CategoryListRes>("/playlist/catlist");
};
