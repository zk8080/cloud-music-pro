import { Al, Ar, H, Privilege } from "./home";

export type ModeType = 0 | 1 | 2;

export interface SongDetailRes {
  resourceState?: boolean;
  songs?: SongItem[];
  code?: number;
}

export interface SongItem {
  rtUrls?: any[];
  ar?: Ar[];
  al?: Al;
  st?: number;
  noCopyrightRcmd?: null;
  songJumpInfo?: null;
  cp?: number;
  crbt?: null;
  cf?: string;
  dt?: number;
  rtUrl?: null;
  ftype?: number;
  rtype?: number;
  rurl?: null;
  pst?: number;
  alia?: string[];
  mst?: number;
  pop?: number;
  rt?: string;
  no?: number;
  fee?: number;
  djId?: number;
  mv?: number;
  t?: number;
  v?: number;
  h?: H;
  l?: H;
  sq?: H;
  hr?: null;
  cd?: string;
  a?: null;
  m?: H;
  name?: string;
  id?: number;
  privilege?: Privilege;
  tns?: string[];
}

export interface SongUrlRes {
  data?: Datum[];
  code?: number;
}

export interface Datum {
  id?: number;
  url?: string;
  br?: number;
  size?: number;
  md5?: string;
  code?: number;
  expi?: number;
  type?: string;
  gain?: number;
  peak?: number;
  fee?: number;
  uf?: null;
  payed?: number;
  flag?: number;
  canExtend?: boolean;
  freeTrialInfo?: FreeTrialInfo;
  level?: string;
  encodeType?: string;
  freeTrialPrivilege?: FreeTrialPrivilege;
  freeTimeTrialPrivilege?: FreeTimeTrialPrivilege;
  urlSource?: number;
  rightSource?: number;
  podcastCtrp?: null;
  effectTypes?: null;
  time?: number;
}

export interface FreeTimeTrialPrivilege {
  resConsumable?: boolean;
  userConsumable?: boolean;
  type?: number;
  remainTime?: number;
}

export interface FreeTrialInfo {
  start?: number;
  end?: number;
}

export interface FreeTrialPrivilege {
  resConsumable?: boolean;
  userConsumable?: boolean;
  listenType?: null;
  cannotListenReason?: null;
}
