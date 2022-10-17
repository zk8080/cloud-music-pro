import { Artist } from "./home";

export interface SearchInfoType {
  initial?: string;
  type?: string;
  area?: string;
}

export interface SingerlistRes {
  artists?: Artist[];
  code?: number;
  more?: boolean;
}
