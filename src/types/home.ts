// 轮播图返回值
export interface BannerRes {
  banners: BannerItem[];
}

export interface BannerItem {
  imageUrl?: string;
  targetId?: number;
  adid?: null;
  targetType?: number;
  titleColor?: string;
  typeTitle?: string;
  url?: null | string;
  exclusive?: boolean;
  monitorImpress?: null;
  monitorClick?: null;
  monitorType?: null;
  monitorImpressList?: null;
  monitorClickList?: null;
  monitorBlackList?: null;
  extMonitor?: null;
  extMonitorInfo?: null;
  adSource?: null;
  adLocation?: null;
  adDispatchJson?: null;
  encodeId?: string;
  program?: null;
  event?: null;
  video?: null;
  song?: null;
  scm?: string;
}

// 热门推荐返回值
export interface PersonalizedRes {
  hasTaste?: boolean;
  code?: number;
  category?: number;
  result?: PersonalizedItem[];
}

export interface PersonalizedItem {
  id?: number;
  type?: number;
  name?: string;
  copywriter?: string;
  picUrl?: string;
  canDislike?: boolean;
  trackNumberUpdateTime?: number;
  playCount?: number;
  trackCount?: number;
  highQuality?: boolean;
  alg?: Alg;
}

export enum Alg {
  AlgHighQuality = "alg_high_quality"
}
