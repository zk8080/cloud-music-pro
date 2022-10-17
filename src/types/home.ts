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
  ar?: Artist[];
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
  albumSize?: number;
  alias?: string[];
  briefDesc?: string;
  fansCount?: number;
  followed?: boolean;
  id?: number;
  img1v1Id?: number;
  img1v1Id_str?: string;
  img1v1Url?: string;
  musicSize?: number;
  name?: string;
  picId?: number;
  picId_str?: string;
  picUrl?: string;
  topicPerson?: number;
  trans?: string;
  accountId?: number;
  transNames?: string[];
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

export interface FreeTrialPrivilege {
  resConsumable?: boolean;
  userConsumable?: boolean;
  listenType?: null;
}

export interface HotTagRes {
  tags?: Tag[];
  code?: number;
}

export interface Tag {
  playlistTag?: PlaylistTag;
  activity?: boolean;
  createTime?: number;
  usedCount?: number;
  hot?: boolean;
  position?: number;
  category?: number;
  name?: string;
  id?: number;
  type?: number;
}

export interface PlaylistTag {
  id?: number;
  name?: string;
  category?: number;
  usedCount?: number;
  type?: number;
  position?: number;
  createTime?: number;
  highQuality?: number;
  highQualityPos?: number;
  officialPos?: number;
}

export interface PlaylistRes {
  playlists?: Playlist[];
  code?: number;
  more?: boolean;
  lasttime?: number;
  total?: number;
  cat?: string;
}

export interface Playlist {
  name?: string;
  id?: number;
  trackNumberUpdateTime?: number;
  status?: number;
  userId?: number;
  createTime?: number;
  updateTime?: number;
  subscribedCount?: number;
  trackCount?: number;
  cloudTrackCount?: number;
  coverImgUrl?: string;
  coverImgId?: number;
  description?: string;
  tags?: string[];
  playCount?: number;
  trackUpdateTime?: number;
  specialType?: number;
  totalDuration?: number;
  creator?: Creator;
  tracks?: Track[];
  subscribers?: Creator[];
  subscribed?: null;
  commentThreadId?: string;
  newImported?: boolean;
  adType?: number;
  highQuality?: boolean;
  privacy?: number;
  ordered?: boolean;
  anonimous?: boolean;
  coverStatus?: number;
  recommendInfo?: null;
  shareCount?: number;
  coverImgId_str?: string;
  commentCount?: number;
  copywriter?: string;
  tag?: string;
  trackIds?: TrackID[];
}

export interface Creator {
  defaultAvatar?: boolean;
  province?: number;
  authStatus?: number;
  followed?: boolean;
  avatarUrl?: string;
  accountStatus?: number;
  gender?: number;
  city?: number;
  birthday?: number;
  userId?: number;
  userType?: number;
  nickname?: string;
  signature?: string;
  description?: string;
  detailDescription?: string;
  avatarImgId?: number;
  backgroundImgId?: number;
  backgroundUrl?: string;
  authority?: number;
  mutual?: boolean;
  expertTags?: string[] | null;
  experts?: null;
  djStatus?: number;
  vipType?: number;
  remarkName?: null;
  authenticationTypes?: number;
  avatarDetail?: AvatarDetail | null;
  backgroundImgIdStr?: string;
  avatarImgIdStr?: string;
  anchor?: boolean;
  avatarImgId_str?: string;
}

export interface AvatarDetail {
  userType?: number;
  identityLevel?: number;
  identityIconUrl?: string;
}

export interface ToplistRes {
  code?: number;
  list?: List[];
  artistToplist?: ArtistToplist;
}

export interface ArtistToplist {
  coverUrl?: string;
  name?: string;
  upateFrequency?: string;
  position?: number;
  updateFrequency?: string;
}

export interface List {
  subscribers?: any[];
  subscribed?: null;
  creator?: null;
  artists?: null;
  tracks?: Track[];
  updateFrequency?: string;
  backgroundCoverId?: number;
  backgroundCoverUrl?: null;
  titleImage?: number;
  titleImageUrl?: null;
  englishTitle?: null;
  opRecommend?: boolean;
  recommendInfo?: null;
  userId?: number;
  adType?: number;
  trackNumberUpdateTime?: number;
  highQuality?: boolean;
  createTime?: number;
  specialType?: number;
  newImported?: boolean;
  updateTime?: number;
  trackCount?: number;
  anonimous?: boolean;
  commentThreadId?: string;
  coverImgId?: number;
  coverImgUrl?: string;
  totalDuration?: number;
  trackUpdateTime?: number;
  privacy?: number;
  playCount?: number;
  subscribedCount?: number;
  cloudTrackCount?: number;
  ordered?: boolean;
  tags?: string[];
  description?: null | string;
  status?: number;
  name?: string;
  id?: number;
  coverImgId_str?: string;
  ToplistType?: string;
}

export interface TrackID {
  id?: number;
  v?: number;
  t?: number;
  at?: number;
  alg?: null;
  uid?: number;
  rcmdReason?: string;
  sc?: null;
  lr?: number;
  ratio?: number;
}

export interface Track {
  name?: string;
  id?: number;
  pst?: number;
  t?: number;
  ar?: Ar[];
  alia?: string[];
  pop?: number;
  st?: number;
  rt?: Rt | null;
  fee?: number;
  v?: number;
  crbt?: null;
  cf?: string;
  al?: Al;
  dt?: number;
  h?: H;
  m?: H;
  l?: H;
  sq?: H | null;
  hr?: H | null;
  a?: null;
  cd?: string;
  no?: number;
  rtUrl?: null;
  ftype?: number;
  rtUrls?: any[];
  djId?: number;
  copyright?: number;
  s_id?: number;
  mark?: number;
  originCoverType?: number;
  originSongSimpleData?: OriginSongSimpleData | null;
  tagPicList?: null;
  resourceState?: boolean;
  version?: number;
  songJumpInfo?: null;
  entertainmentTags?: null;
  single?: number;
  noCopyrightRcmd?: null;
  rtype?: number;
  rurl?: null;
  mst?: number;
  cp?: number;
  mv?: number;
  publishTime?: number;
  tns?: string[];
}

export interface Al {
  id?: number;
  name?: string;
  picUrl?: string;
  tns?: string[];
  pic_str?: string;
  pic?: number;
}

export interface Ar {
  id?: number;
  name?: string;
  tns?: any[];
  alias?: any[];
}

export interface H {
  br?: number;
  fid?: number;
  size?: number;
  vd?: number;
  sr?: number;
}

export interface OriginSongSimpleData {
  songId?: number;
  name?: string;
  artists?: AlbumMeta[];
  albumMeta?: AlbumMeta;
}

export interface AlbumMeta {
  id?: number;
  name?: string;
}

export enum Rt {
  Empty = "",
  The600902000007952625 = "600902000007952625",
  The600902000008882893 = "600902000008882893",
  The600902000008893619 = "600902000008893619",
  The600902000009535428 = "600902000009535428",
  The600907000001520578 = "600907000001520578"
}

export enum DLLevel {
  Hires = "hires",
  Lossless = "lossless",
  None = "none"
}

export enum MaxBrLevel {
  Exhigh = "exhigh",
  Hires = "hires",
  Lossless = "lossless"
}

export enum LLevel {
  Exhigh = "exhigh",
  None = "none",
  Standard = "standard"
}

export interface PlaylistDetailRes {
  songs?: Song[];
  privileges?: Privilege[];
  code?: number;
}
