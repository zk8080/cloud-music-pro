export interface LoginStatusRes {
  code?: number;
  account?: Account;
  profile?: Profile;
}

export interface LoginRes {
  loginType?: number;
  code?: number;
  account?: Account;
  token?: string;
  profile?: Profile;
  bindings?: Binding[];
  cookie?: string;
}

export interface Binding {
  userId?: number;
  url?: string;
  expired?: boolean;
  bindingTime?: number;
  refreshTime?: number;
  tokenJsonStr?: string;
  expiresIn?: number;
  id?: number;
  type?: number;
}

export interface Account {
  id?: number;
  userName?: string;
  type?: number;
  status?: number;
  whitelistAuthority?: number;
  createTime?: number;
  tokenVersion?: number;
  ban?: number;
  baoyueVersion?: number;
  donateVersion?: number;
  vipType?: number;
  anonimousUser?: boolean;
  paidFee?: boolean;
}

export interface Profile {
  userId?: number;
  userType?: number;
  nickname?: string;
  avatarImgId?: number;
  avatarUrl?: string;
  backgroundImgId?: number;
  backgroundUrl?: string;
  signature?: null;
  createTime?: number;
  userName?: string;
  accountType?: number;
  shortUserName?: string;
  birthday?: number;
  authority?: number;
  gender?: number;
  accountStatus?: number;
  province?: number;
  city?: number;
  authStatus?: number;
  description?: null;
  detailDescription?: null;
  defaultAvatar?: boolean;
  expertTags?: null;
  experts?: null;
  djStatus?: number;
  locationStatus?: number;
  vipType?: number;
  followed?: boolean;
  mutual?: boolean;
  authenticated?: boolean;
  lastLoginTime?: number;
  lastLoginIP?: string;
  remarkName?: null;
  viptypeVersion?: number;
  authenticationTypes?: number;
  avatarDetail?: null;
  anchor?: boolean;
}
