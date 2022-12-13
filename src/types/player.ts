import { Al, Ar, H, Privilege } from "./home";

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
