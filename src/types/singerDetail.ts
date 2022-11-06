import { Song } from "./home";

export interface SingerDetailRes {
  artist?: Artist;
  hotSongs?: Song[];
  more?: boolean;
  code?: number;
}

export interface Artist {
  img1v1Id?: number;
  topicPerson?: number;
  alias?: string[];
  picId?: number;
  musicSize?: number;
  albumSize?: number;
  briefDesc?: string;
  picUrl?: string;
  img1v1Url?: string;
  followed?: boolean;
  trans?: string;
  name?: string;
  id?: number;
  publishTime?: number;
  picId_str?: string;
  img1v1Id_str?: string;
  mvSize?: number;
}

export interface SingerAlbumRes {
  artist?: Artist;
  hotAlbums?: HotAlbum[];
  more?: boolean;
  code?: number;
}

export interface HotAlbum {
  songs?: any[];
  paid?: boolean;
  onSale?: boolean;
  mark?: number;
  awardTags?: null;
  blurPicUrl?: string;
  alias?: string[];
  artists?: Artist[];
  copyrightId?: number;
  picId?: number;
  artist?: Artist;
  briefDesc?: string;
  publishTime?: number;
  company?: string;
  picUrl?: string;
  commentThreadId?: string;
  companyId?: number;
  pic?: number;
  description?: string;
  tags?: string;
  status?: number;
  subType?: string;
  name?: string;
  id?: number;
  type?: string;
  size?: number;
  picId_str?: string;
  transNames?: string[];
  isSub?: boolean;
}
