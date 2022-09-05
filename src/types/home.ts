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

// 新碟上架返回值
export interface PersonalizedNewSongRes {
  code?: number;
  category?: number;
  result?: PersonalizedNewSongItem[];
}

export interface PersonalizedNewSongItem {
  id?: number;
  type?: number;
  name?: string;
  copywriter?: null;
  picUrl?: string;
  canDislike?: boolean;
  trackNumberUpdateTime?: null;
  song?: Song;
  alg?: Alg;
}

export enum Alg {
  HotServer = "hot_server"
}

export interface Song {
  name?: string;
  id?: number;
  position?: number;
  alias?: string[];
  status?: number;
  fee?: number;
  copyrightId?: number;
  disc?: Disc;
  no?: number;
  artists?: Artist[];
  album?: Album;
  starred?: boolean;
  popularity?: number;
  score?: number;
  starredNum?: number;
  duration?: number;
  playedNum?: number;
  dayPlays?: number;
  hearTime?: number;
  sqMusic?: Music | null;
  hrMusic?: Music | null;
  ringtone?: string;
  crbt?: null;
  audition?: null;
  copyFrom?: string;
  commentThreadId?: string;
  rtUrl?: null;
  ftype?: number;
  rtUrls?: any[];
  copyright?: number;
  transName?: null;
  sign?: null;
  mark?: number;
  originCoverType?: number;
  originSongSimpleData?: null;
  single?: number;
  noCopyrightRcmd?: null;
  mp3Url?: null;
  rtype?: number;
  rurl?: null;
  mvid?: number;
  bMusic?: Music;
  hMusic?: Music;
  mMusic?: Music;
  lMusic?: Music;
  exclusive?: boolean;
  privilege?: Privilege;
}

export interface Album {
  name?: string;
  id?: number;
  type?: Type;
  size?: number;
  picId?: number;
  blurPicUrl?: string;
  companyId?: number;
  pic?: number;
  picUrl?: string;
  publishTime?: number;
  description?: string;
  tags?: string;
  company?: string;
  briefDesc?: string;
  artist?: Artist;
  songs?: any[];
  alias?: string[];
  status?: number;
  copyrightId?: number;
  commentThreadId?: string;
  artists?: Artist[];
  subType?: SubType;
  transName?: null;
  onSale?: boolean;
  mark?: number;
  gapless?: number;
  picId_str?: string;
}

export interface Artist {
  name?: string;
  id?: number;
  picId?: number;
  img1v1Id?: number;
  briefDesc?: string;
  picUrl?: string;
  img1v1Url?: string;
  albumSize?: number;
  alias?: any[];
  trans?: string;
  musicSize?: number;
  topicPerson?: number;
}

export enum SubType {
  Demo = "DEMO",
  录音室版 = "录音室版"
}

export enum Type {
  Single = "Single",
  专辑 = "专辑"
}

export interface Music {
  name?: null;
  id?: number;
  size?: number;
  extension?: Extension;
  sr?: number;
  dfsId?: number;
  bitrate?: number;
  playTime?: number;
  volumeDelta?: number;
}

export enum Extension {
  FLAC = "flac",
  Mp3 = "mp3"
}

export enum Disc {
  The01 = "01",
  The1致天堂的信LettersToHeaven = "1 致天堂的信 Letters to Heaven"
}

export interface Privilege {
  id?: number;
  fee?: number;
  payed?: number;
  st?: number;
  pl?: number;
  dl?: number;
  sp?: number;
  cp?: number;
  subp?: number;
  cs?: boolean;
  maxbr?: number;
  fl?: number;
  toast?: boolean;
  flag?: number;
  preSell?: boolean;
  playMaxbr?: number;
  downloadMaxbr?: number;
  maxBrLevel?: MaxBrLevel;
  playMaxBrLevel?: MaxBrLevel;
  downloadMaxBrLevel?: MaxBrLevel;
  plLevel?: LLevel;
  dlLevel?: DLLevel;
  flLevel?: LLevel;
  rscl?: null;
  freeTrialPrivilege?: FreeTrialPrivilege;
  chargeInfoList?: ChargeInfoList[];
}

export interface ChargeInfoList {
  rate?: number;
  chargeUrl?: null;
  chargeMessage?: null;
  chargeType?: number;
}

export enum DLLevel {
  None = "none"
}

export enum MaxBrLevel {
  Exhigh = "exhigh",
  Hires = "hires",
  Lossless = "lossless"
}

export enum LLevel {
  Standard = "standard"
}

export interface FreeTrialPrivilege {
  resConsumable?: boolean;
  userConsumable?: boolean;
  listenType?: null;
}
