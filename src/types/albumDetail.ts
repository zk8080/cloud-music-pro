import { Album, Song } from "./home";

export interface AlbumDetailRes {
  resourceState?: boolean;
  songs?: Song[];
  code?: number;
  album?: Album;
}
