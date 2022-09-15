export interface CategoryListRes {
  code?: number;
  all?: CategoryItem;
  sub?: CategoryItem[];
  categories?: { [key: string]: string };
}

export interface CategoryMapList {
  code?: string;
  name?: string;
  list?: CategoryItem[];
}

export interface CategoryItem {
  name?: string;
  resourceCount?: number;
  imgId?: number;
  imgUrl?: null;
  type?: number;
  category?: number;
  resourceType?: number;
  hot?: boolean;
  activity?: boolean;
}
