import { RelatedMVRes } from "./../types/singerDetail";
import { LoginRes, LoginStatusRes } from "@/types/layout";
import { SingerlistRes } from "@/types/singer";
import { SingerAlbumRes, SingerDescRes, SingerDetailRes } from "@/types/singerDetail";
import { SongListDetailRes } from "@/types/songList";
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
import { AlbumDetailRes } from "@/types/albumDetail";

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
export const getHighqualityPlaylistByTag = async (params: { limit?: number; cat?: string }) => {
  return await http.get<PlaylistRes>("/top/playlist/highquality", { params });
};

// 获取所有榜单列表
export const getToplist = async () => {
  return await http.get<ToplistRes>("/toplist");
};

// 获取歌单详情歌曲列表
export const getPlaylistTrackList = async (params: { id: number; limit?: number }) => {
  return await http.get<PlaylistDetailRes>("/playlist/track/all", { params });
};

// 获取歌单分类
export const getCategoryList = async () => {
  return await http.get<CategoryListRes>("/playlist/catlist");
};

// 根据分类获取歌单列表
export const getPlaylistByTag = async (params: { limit?: number; cat?: string; offset?: number; order?: string }) => {
  return await http.get<PlaylistRes>("/top/playlist", { params });
};

// 根据分类获取歌手列表
export const getSingerlistByTag = async (params: {
  limit?: number;
  offset?: number;
  type?: string;
  area?: string;
  initial?: string;
}) => {
  return await http.get<SingerlistRes>("/artist/list", { params });
};

// 发送验证码
export const sentCaptcha = async (data: { phone: string }) => {
  return await http.post("/captcha/sent", data);
};

// 验证码登录
export const login = async (data: Record<string, string>) => {
  return await http.post<LoginRes>("/login/cellphone", data);
};

// 退出登录
export const logout = async () => {
  return await http.post(`/logout?timestamp=${+new Date()}`);
};

// 获取登录状态
export const getLoginStatus = async () => {
  return await http.get<LoginStatusRes>("/login/status");
};

// 获取登录信息
export const getLoginInfo = async () => {
  return await http.get<LoginStatusRes>(`/user/account?timestamp=${+new Date()}`);
};

// 获取歌单详情
export const getSongListDetail = async (params: { id?: string }) => {
  return await http.get<SongListDetailRes>("/playlist/detail", { params });
};

// 获取歌手详情
export const getSingerDetail = async (params: { id?: string }) => {
  return await http.get<SingerDetailRes>("/artists", { params });
};

// 获取歌手专辑
export const getSingerAlbumDetail = async (params: { id?: string; limit?: number; offset?: number }) => {
  return await http.get<SingerAlbumRes>("/artist/album", { params });
};

// 获取歌手描述
export const getSingerDesc = async (params: { id?: string }) => {
  return await http.get<SingerDescRes>("/artist/desc", { params });
};

// 获取歌手MV
export const getSingerMV = async (params: { id?: string; limit?: number; offset?: number }) => {
  return await http.get<RelatedMVRes>("/artist/mv", { params });
};

// 获取专辑详情
export const getAlbumDetail = async (params: { id?: string }) => {
  return await http.get<AlbumDetailRes>("/album", { params });
};
