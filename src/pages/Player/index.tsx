import SongListTable from "@/components/SongListTable";
import { Song } from "@/types/home";
import {
  IconHeartStroked,
  IconPause,
  IconPlay,
  IconRestart,
  IconShareStroked,
  IconSync,
  IconVolume2
} from "@douyinfe/semi-icons";
import { Image, Slider } from "@douyinfe/semi-ui";
import { useToggle } from "ahooks";
import { useEffect, useMemo, useRef, useState } from "react";
import { formatPlayTime } from "@/utils";

const songList = [
  {
    name: "青石巷",
    id: 422429425,
    pst: 0,
    t: 0,
    ar: [
      {
        id: 12083030,
        name: "魏琮霏",
        tns: [],
        alias: []
      }
    ],
    alia: [],
    pop: 100,
    st: 0,
    rt: "",
    fee: 8,
    v: 18,
    crbt: null,
    cf: "",
    al: {
      id: 34794220,
      name: "Wei",
      picUrl: "https://p1.music.126.net/uNpSTrse-CivyZ2NUyhJUQ==/17892352718986703.jpg",
      tns: [],
      pic_str: "17892352718986703",
      pic: 17892352718986704
    },
    dt: 227252,
    h: {
      br: 320000,
      fid: 0,
      size: 9100060,
      vd: 14058,
      sr: 44100
    },
    m: {
      br: 192000,
      fid: 0,
      size: 5460053,
      vd: 14058,
      sr: 44100
    },
    l: {
      br: 128000,
      fid: 0,
      size: 3640050,
      vd: 14058,
      sr: 44100
    },
    sq: null,
    hr: null,
    a: null,
    cd: "1",
    no: 1,
    rtUrl: null,
    ftype: 0,
    rtUrls: [],
    djId: 0,
    copyright: 0,
    s_id: 0,
    mark: 131072,
    originCoverType: 1,
    originSongSimpleData: null,
    tagPicList: null,
    resourceState: true,
    version: 18,
    songJumpInfo: null,
    entertainmentTags: null,
    awardTags: null,
    single: 0,
    noCopyrightRcmd: null,
    mst: 9,
    cp: 0,
    rtype: 0,
    rurl: null,
    mv: 0,
    publishTime: 1469356715063
  },
  {
    name: "Windy Hill",
    id: 427606780,
    pst: 0,
    t: 0,
    ar: [
      {
        id: 12094419,
        name: "羽肿",
        tns: [],
        alias: []
      }
    ],
    alia: [],
    pop: 100,
    st: 0,
    rt: "",
    fee: 8,
    v: 159,
    crbt: null,
    cf: "",
    al: {
      id: 34856396,
      name: "Windy Hill",
      picUrl: "https://p1.music.126.net/dAJR6IWlKitcNVlfQwtgfA==/18241997416865263.jpg",
      tns: [],
      pic_str: "18241997416865263",
      pic: 18241997416865264
    },
    dt: 308918,
    h: {
      br: 320000,
      fid: 0,
      size: 12359097,
      vd: -15739,
      sr: 44100
    },
    m: {
      br: 192000,
      fid: 0,
      size: 7415475,
      vd: -15739,
      sr: 44100
    },
    l: {
      br: 128000,
      fid: 0,
      size: 4943665,
      vd: -15739,
      sr: 44100
    },
    sq: {
      br: 738563,
      fid: 0,
      size: 28519527,
      vd: -15739,
      sr: 44100
    },
    hr: null,
    a: null,
    cd: "1",
    no: 1,
    rtUrl: null,
    ftype: 0,
    rtUrls: [],
    djId: 0,
    copyright: 0,
    s_id: 0,
    mark: 131136,
    originCoverType: 0,
    originSongSimpleData: null,
    tagPicList: null,
    resourceState: true,
    version: 159,
    songJumpInfo: null,
    entertainmentTags: null,
    awardTags: null,
    single: 0,
    noCopyrightRcmd: null,
    mst: 9,
    cp: 1382818,
    rtype: 0,
    rurl: null,
    mv: 0,
    publishTime: 1472537575263,
    tns: ["风之谷"]
  },
  {
    name: "晚星",
    id: 1319520140,
    pst: 0,
    t: 0,
    ar: [
      {
        id: 12128251,
        name: "逆时针向",
        tns: [],
        alias: []
      }
    ],
    alia: [],
    pop: 100,
    st: 0,
    rt: null,
    fee: 8,
    v: 32,
    crbt: null,
    cf: "",
    al: {
      id: 74009778,
      name: "晚星",
      picUrl: "https://p1.music.126.net/blQBZ_5HEUbq8iNvlrNsiw==/109951163617861379.jpg",
      tns: [],
      pic_str: "109951163617861379",
      pic: 109951163617861380
    },
    dt: 193714,
    h: {
      br: 320000,
      fid: 0,
      size: 7751097,
      vd: -59073,
      sr: 44100
    },
    m: {
      br: 192000,
      fid: 0,
      size: 4650675,
      vd: -59073,
      sr: 44100
    },
    l: {
      br: 128000,
      fid: 0,
      size: 3100465,
      vd: -59073,
      sr: 44100
    },
    sq: {
      br: 835352,
      fid: 0,
      size: 20227465,
      vd: -59073,
      sr: 44100
    },
    hr: null,
    a: null,
    cd: "01",
    no: 1,
    rtUrl: null,
    ftype: 0,
    rtUrls: [],
    djId: 0,
    copyright: 0,
    s_id: 0,
    mark: 163904,
    originCoverType: 0,
    originSongSimpleData: null,
    tagPicList: null,
    resourceState: true,
    version: 32,
    songJumpInfo: null,
    entertainmentTags: null,
    awardTags: null,
    single: 0,
    noCopyrightRcmd: null,
    mst: 9,
    cp: 0,
    rtype: 0,
    rurl: null,
    mv: 0,
    publishTime: 1540137600000
  },
  {
    name: "日出",
    id: 1428348753,
    pst: 0,
    t: 0,
    ar: [
      {
        id: 30480423,
        name: "JINBAO",
        tns: [],
        alias: []
      }
    ],
    alia: [],
    pop: 100,
    st: 0,
    rt: "",
    fee: 8,
    v: 19,
    crbt: null,
    cf: "",
    al: {
      id: 86232231,
      name: "四季.春",
      picUrl: "https://p1.music.126.net/L50KoQezBC_oJSwOvJvKtA==/109951164770114149.jpg",
      tns: [],
      pic_str: "109951164770114149",
      pic: 109951164770114140
    },
    dt: 271090,
    h: {
      br: 320000,
      fid: 0,
      size: 10846085,
      vd: 72149,
      sr: 44100
    },
    m: {
      br: 192000,
      fid: 0,
      size: 6507668,
      vd: 74796,
      sr: 44100
    },
    l: {
      br: 128000,
      fid: 0,
      size: 4338460,
      vd: 76584,
      sr: 44100
    },
    sq: {
      br: 1411000,
      fid: 0,
      size: 16910270,
      vd: 72149,
      sr: 44100
    },
    hr: null,
    a: null,
    cd: "01",
    no: 4,
    rtUrl: null,
    ftype: 0,
    rtUrls: [],
    djId: 0,
    copyright: 0,
    s_id: 0,
    mark: 131136,
    originCoverType: 0,
    originSongSimpleData: null,
    tagPicList: null,
    resourceState: true,
    version: 19,
    songJumpInfo: null,
    entertainmentTags: null,
    awardTags: null,
    single: 0,
    noCopyrightRcmd: null,
    mst: 9,
    cp: 0,
    rtype: 0,
    rurl: null,
    mv: 0,
    publishTime: 0
  },
  {
    name: "白色",
    id: 494992638,
    pst: 0,
    t: 0,
    ar: [
      {
        id: 12520634,
        name: "灰澈",
        tns: [],
        alias: []
      }
    ],
    alia: [],
    pop: 100,
    st: 0,
    rt: null,
    fee: 8,
    v: 20,
    crbt: null,
    cf: "",
    al: {
      id: 35859814,
      name: "白色",
      picUrl: "https://p1.music.126.net/_EuX4aT0AB0f4Gi5fdMP8w==/109951162991584436.jpg",
      tns: [],
      pic_str: "109951162991584436",
      pic: 109951162991584430
    },
    dt: 168254,
    h: {
      br: 320000,
      fid: 0,
      size: 6732321,
      vd: 11474,
      sr: 44100
    },
    m: {
      br: 192000,
      fid: 0,
      size: 4039410,
      vd: 11474,
      sr: 44100
    },
    l: {
      br: 128000,
      fid: 0,
      size: 2692955,
      vd: 11474,
      sr: 44100
    },
    sq: null,
    hr: null,
    a: null,
    cd: "01",
    no: 1,
    rtUrl: null,
    ftype: 0,
    rtUrls: [],
    djId: 0,
    copyright: 0,
    s_id: 0,
    mark: 131136,
    originCoverType: 0,
    originSongSimpleData: null,
    tagPicList: null,
    resourceState: true,
    version: 20,
    songJumpInfo: null,
    entertainmentTags: null,
    awardTags: null,
    single: 0,
    noCopyrightRcmd: null,
    mst: 9,
    cp: 0,
    rtype: 0,
    rurl: null,
    mv: 0,
    publishTime: 1501673286378
  },
  {
    name: "戏阳",
    id: 480463724,
    pst: 0,
    t: 0,
    ar: [
      {
        id: 12442396,
        name: "鱼九",
        tns: [],
        alias: []
      }
    ],
    alia: [],
    pop: 90,
    st: 0,
    rt: null,
    fee: 0,
    v: 25,
    crbt: null,
    cf: "",
    al: {
      id: 35548932,
      name: "黄梅时节",
      picUrl: "https://p1.music.126.net/8Kpbp_8S7GoGEwDYeBdBsA==/109951162934638340.jpg",
      tns: [],
      pic_str: "109951162934638340",
      pic: 109951162934638340
    },
    dt: 212457,
    h: {
      br: 320000,
      fid: 0,
      size: 8500289,
      vd: 0,
      sr: 44100
    },
    m: {
      br: 192000,
      fid: 0,
      size: 5100191,
      vd: 606,
      sr: 44100
    },
    l: {
      br: 128000,
      fid: 0,
      size: 3400142,
      vd: 1230,
      sr: 44100
    },
    sq: null,
    hr: null,
    a: null,
    cd: "01",
    no: 1,
    rtUrl: null,
    ftype: 0,
    rtUrls: [],
    djId: 0,
    copyright: 2,
    s_id: 0,
    mark: 131072,
    originCoverType: 0,
    originSongSimpleData: null,
    tagPicList: null,
    resourceState: true,
    version: 25,
    songJumpInfo: null,
    entertainmentTags: null,
    awardTags: null,
    single: 0,
    noCopyrightRcmd: null,
    mst: 9,
    cp: 0,
    rtype: 0,
    rurl: null,
    mv: 0,
    publishTime: 1494345600000
  },
  {
    name: "寒色",
    id: 1410273354,
    pst: 0,
    t: 0,
    ar: [
      {
        id: 32974232,
        name: "寒柴",
        tns: [],
        alias: []
      }
    ],
    alia: [],
    pop: 95,
    st: 0,
    rt: "",
    fee: 8,
    v: 13,
    crbt: null,
    cf: "",
    al: {
      id: 84085603,
      name: "寒色",
      picUrl: "https://p1.music.126.net/cGCExvXxCJZP0Y7p8XmP5g==/109951164564526640.jpg",
      tns: [],
      pic_str: "109951164564526640",
      pic: 109951164564526640
    },
    dt: 106764,
    h: {
      br: 320000,
      fid: 0,
      size: 4273676,
      vd: 16868,
      sr: 44100
    },
    m: {
      br: 192000,
      fid: 0,
      size: 2564223,
      vd: 19514,
      sr: 44100
    },
    l: {
      br: 128000,
      fid: 0,
      size: 1709497,
      vd: 21323,
      sr: 44100
    },
    sq: {
      br: 1411000,
      fid: 0,
      size: 4787351,
      vd: 16868,
      sr: 44100
    },
    hr: null,
    a: null,
    cd: "01",
    no: 1,
    rtUrl: null,
    ftype: 0,
    rtUrls: [],
    djId: 0,
    copyright: 0,
    s_id: 0,
    mark: 131072,
    originCoverType: 0,
    originSongSimpleData: null,
    tagPicList: null,
    resourceState: true,
    version: 13,
    songJumpInfo: null,
    entertainmentTags: null,
    awardTags: null,
    single: 0,
    noCopyrightRcmd: null,
    mst: 9,
    cp: 0,
    rtype: 0,
    rurl: null,
    mv: 0,
    publishTime: 1576512000000
  },
  {
    name: "入眠",
    id: 1890216367,
    pst: 0,
    t: 0,
    ar: [
      {
        id: 12286466,
        name: "smile丶轩",
        tns: [],
        alias: []
      }
    ],
    alia: [],
    pop: 90,
    st: 0,
    rt: "",
    fee: 8,
    v: 9,
    crbt: null,
    cf: "",
    al: {
      id: 135331226,
      name: "寂静",
      picUrl: "https://p1.music.126.net/JTBpimOabPpA6uzm4aeJOw==/109951166560806707.jpg",
      tns: [],
      pic_str: "109951166560806707",
      pic: 109951166560806700
    },
    dt: 114181,
    h: {
      br: 320000,
      fid: 0,
      size: 4569382,
      vd: -13934,
      sr: 44100
    },
    m: {
      br: 192000,
      fid: 0,
      size: 2741647,
      vd: -11288,
      sr: 44100
    },
    l: {
      br: 128000,
      fid: 0,
      size: 1827779,
      vd: -9481,
      sr: 44100
    },
    sq: {
      br: 1098648,
      fid: 0,
      size: 15680624,
      vd: -13933,
      sr: 44100
    },
    hr: null,
    a: null,
    cd: "01",
    no: 1,
    rtUrl: null,
    ftype: 0,
    rtUrls: [],
    djId: 0,
    copyright: 0,
    s_id: 0,
    mark: 131136,
    originCoverType: 0,
    originSongSimpleData: null,
    tagPicList: null,
    resourceState: true,
    version: 9,
    songJumpInfo: null,
    entertainmentTags: null,
    awardTags: null,
    single: 0,
    noCopyrightRcmd: null,
    mst: 9,
    cp: 0,
    rtype: 0,
    rurl: null,
    mv: 0,
    publishTime: 0
  },
  {
    name: "篱落",
    id: 1319512631,
    pst: 0,
    t: 0,
    ar: [
      {
        id: 13610039,
        name: "方彦霖",
        tns: [],
        alias: []
      }
    ],
    alia: [],
    pop: 95,
    st: 0,
    rt: null,
    fee: 8,
    v: 37,
    crbt: null,
    cf: "",
    al: {
      id: 74009773,
      name: "篱落",
      picUrl: "https://p1.music.126.net/TWdZ4rSuuOdNgKq3QNQfIQ==/109951163617807170.jpg",
      tns: [],
      pic_str: "109951163617807170",
      pic: 109951163617807170
    },
    dt: 199977,
    h: {
      br: 320000,
      fid: 0,
      size: 8001872,
      vd: 3629,
      sr: 44100
    },
    m: {
      br: 192000,
      fid: 0,
      size: 4801141,
      vd: 3629,
      sr: 44100
    },
    l: {
      br: 128000,
      fid: 0,
      size: 3200775,
      vd: 3629,
      sr: 44100
    },
    sq: {
      br: 684855,
      fid: 0,
      size: 17119468,
      vd: 3629,
      sr: 44100
    },
    hr: null,
    a: null,
    cd: "01",
    no: 1,
    rtUrl: null,
    ftype: 0,
    rtUrls: [],
    djId: 0,
    copyright: 0,
    s_id: 0,
    mark: 131136,
    originCoverType: 0,
    originSongSimpleData: null,
    tagPicList: null,
    resourceState: true,
    version: 37,
    songJumpInfo: null,
    entertainmentTags: null,
    awardTags: null,
    single: 0,
    noCopyrightRcmd: null,
    mst: 9,
    cp: 0,
    rtype: 0,
    rurl: null,
    mv: 0,
    publishTime: 1540137600000
  },
  {
    name: "飘散",
    id: 511176125,
    pst: 0,
    t: 0,
    ar: [
      {
        id: 12094734,
        name: "清风至",
        tns: [],
        alias: []
      },
      {
        id: 12286466,
        name: "smile丶轩",
        tns: [],
        alias: []
      }
    ],
    alia: [],
    pop: 95,
    st: 0,
    rt: null,
    fee: 8,
    v: 46,
    crbt: null,
    cf: "",
    al: {
      id: 36472912,
      name: "秋",
      picUrl: "https://p1.music.126.net/_HeRjNMkEGRclKZsnI4J2w==/109951163037595538.jpg",
      tns: [],
      pic_str: "109951163037595538",
      pic: 109951163037595540
    },
    dt: 217173,
    h: {
      br: 320000,
      fid: 0,
      size: 8689415,
      vd: 42271,
      sr: 44100
    },
    m: {
      br: 192000,
      fid: 0,
      size: 5213666,
      vd: 44910,
      sr: 44100
    },
    l: {
      br: 128000,
      fid: 0,
      size: 3475792,
      vd: 46679,
      sr: 44100
    },
    sq: {
      br: 1411000,
      fid: 0,
      size: 17240287,
      vd: 42269,
      sr: 44100
    },
    hr: null,
    a: null,
    cd: "01",
    no: 1,
    rtUrl: null,
    ftype: 0,
    rtUrls: [],
    djId: 0,
    copyright: 0,
    s_id: 0,
    mark: 131136,
    originCoverType: 0,
    originSongSimpleData: null,
    tagPicList: null,
    resourceState: true,
    version: 46,
    songJumpInfo: null,
    entertainmentTags: null,
    awardTags: null,
    single: 0,
    noCopyrightRcmd: null,
    mst: 9,
    cp: 0,
    rtype: 0,
    rurl: null,
    mv: 0,
    publishTime: 1507132800000
  },
  {
    name: "撒野【钢琴纯音乐】",
    id: 1467181646,
    pst: 0,
    t: 0,
    ar: [
      {
        id: 12101190,
        name: "欧林东东",
        tns: [],
        alias: []
      }
    ],
    alia: [],
    pop: 95,
    st: 0,
    rt: "",
    fee: 8,
    v: 4,
    crbt: null,
    cf: "",
    al: {
      id: 85480300,
      name: "撒野",
      picUrl: "https://p1.music.126.net/RIw5c9i2AQIjjZOUs0RZmA==/109951164682224827.jpg",
      tns: [],
      pic_str: "109951164682224827",
      pic: 109951164682224830
    },
    dt: 215301,
    h: {
      br: 320000,
      fid: 0,
      size: 8613138,
      vd: 4664,
      sr: 44100
    },
    m: {
      br: 192000,
      fid: 0,
      size: 5167900,
      vd: 7310,
      sr: 44100
    },
    l: {
      br: 128000,
      fid: 0,
      size: 3445281,
      vd: 9120,
      sr: 44100
    },
    sq: null,
    hr: null,
    a: null,
    cd: "01",
    no: 1,
    rtUrl: null,
    ftype: 0,
    rtUrls: [],
    djId: 0,
    copyright: 0,
    s_id: 0,
    mark: 131136,
    originCoverType: 0,
    originSongSimpleData: null,
    tagPicList: null,
    resourceState: true,
    version: 4,
    songJumpInfo: null,
    entertainmentTags: null,
    awardTags: null,
    single: 0,
    noCopyrightRcmd: null,
    mst: 9,
    cp: 0,
    rtype: 0,
    rurl: null,
    mv: 0,
    publishTime: 0
  },
  {
    name: "星茶会",
    id: 492390949,
    pst: 0,
    t: 0,
    ar: [
      {
        id: 12520634,
        name: "灰澈",
        tns: [],
        alias: []
      }
    ],
    alia: [],
    pop: 100,
    st: 0,
    rt: null,
    fee: 8,
    v: 19,
    crbt: null,
    cf: "",
    al: {
      id: 35808228,
      name: "星茶会",
      picUrl: "https://p1.music.126.net/qhcfRnSXfNToa66ff7S8Kw==/109951167879453336.jpg",
      tns: [],
      pic_str: "109951167879453336",
      pic: 109951167879453340
    },
    dt: 196728,
    h: {
      br: 320000,
      fid: 0,
      size: 7871260,
      vd: 13258,
      sr: 44100
    },
    m: {
      br: 192000,
      fid: 0,
      size: 4722773,
      vd: 13258,
      sr: 44100
    },
    l: {
      br: 128000,
      fid: 0,
      size: 3148530,
      vd: 13258,
      sr: 44100
    },
    sq: null,
    hr: null,
    a: null,
    cd: "01",
    no: 1,
    rtUrl: null,
    ftype: 0,
    rtUrls: [],
    djId: 0,
    copyright: 0,
    s_id: 0,
    mark: 131136,
    originCoverType: 0,
    originSongSimpleData: null,
    tagPicList: null,
    resourceState: true,
    version: 19,
    songJumpInfo: null,
    entertainmentTags: null,
    awardTags: null,
    single: 0,
    noCopyrightRcmd: null,
    mst: 9,
    cp: 0,
    rtype: 0,
    rurl: null,
    mv: 0,
    publishTime: 0
  },
  {
    name: "春之行",
    id: 547780876,
    pst: 0,
    t: 0,
    ar: [
      {
        id: 12520634,
        name: "灰澈",
        tns: [],
        alias: []
      }
    ],
    alia: [],
    pop: 100,
    st: 0,
    rt: null,
    fee: 8,
    v: 25,
    crbt: null,
    cf: "",
    al: {
      id: 37995769,
      name: "春之行",
      picUrl: "https://p1.music.126.net/ogNGax3WZudTPaT2iYaEdA==/109951163206875333.jpg",
      tns: [],
      pic_str: "109951163206875333",
      pic: 109951163206875330
    },
    dt: 227422,
    h: {
      br: 320000,
      fid: 0,
      size: 9099015,
      vd: -31852,
      sr: 44100
    },
    m: {
      br: 192000,
      fid: 0,
      size: 5459426,
      vd: -31852,
      sr: 44100
    },
    l: {
      br: 128000,
      fid: 0,
      size: 3639632,
      vd: -31852,
      sr: 44100
    },
    sq: null,
    hr: null,
    a: null,
    cd: "01",
    no: 1,
    rtUrl: null,
    ftype: 0,
    rtUrls: [],
    djId: 0,
    copyright: 0,
    s_id: 0,
    mark: 131136,
    originCoverType: 0,
    originSongSimpleData: null,
    tagPicList: null,
    resourceState: true,
    version: 25,
    songJumpInfo: null,
    entertainmentTags: null,
    awardTags: null,
    single: 0,
    noCopyrightRcmd: null,
    mst: 9,
    cp: 0,
    rtype: 0,
    rurl: null,
    mv: 0,
    publishTime: 1521953537788
  },
  {
    name: "不尽夏",
    id: 1966360020,
    pst: 0,
    t: 0,
    ar: [
      {
        id: 34531218,
        name: "钰见·梵星",
        tns: [],
        alias: []
      }
    ],
    alia: [],
    pop: 80,
    st: 0,
    rt: "",
    fee: 0,
    v: 6,
    crbt: null,
    cf: "",
    al: {
      id: 148565264,
      name: "不尽夏",
      picUrl: "https://p1.music.126.net/WLYekl8gQ6V7hUgQyjXbfQ==/109951167706257170.jpg",
      tns: [],
      pic_str: "109951167706257170",
      pic: 109951167706257170
    },
    dt: 191000,
    h: {
      br: 320002,
      fid: 0,
      size: 7642427,
      vd: 102932,
      sr: 44100
    },
    m: {
      br: 192002,
      fid: 0,
      size: 4585474,
      vd: 105570,
      sr: 44100
    },
    l: {
      br: 128002,
      fid: 0,
      size: 3056997,
      vd: 107352,
      sr: 44100
    },
    sq: {
      br: 1211061,
      fid: 0,
      size: 28914100,
      vd: 102931,
      sr: 44100
    },
    hr: null,
    a: null,
    cd: "01",
    no: 1,
    rtUrl: null,
    ftype: 0,
    rtUrls: [],
    djId: 0,
    copyright: 0,
    s_id: 0,
    mark: 524480,
    originCoverType: 0,
    originSongSimpleData: null,
    tagPicList: null,
    resourceState: true,
    version: 6,
    songJumpInfo: null,
    entertainmentTags: null,
    awardTags: null,
    single: 0,
    noCopyrightRcmd: null,
    mst: 9,
    cp: 0,
    rtype: 0,
    rurl: null,
    mv: 0,
    publishTime: 0
  },
  {
    name: "日暮里",
    id: 1351183637,
    pst: 0,
    t: 0,
    ar: [
      {
        id: 30480423,
        name: "JINBAO",
        tns: [],
        alias: []
      }
    ],
    alia: [],
    pop: 100,
    st: 0,
    rt: "",
    fee: 8,
    v: 23,
    crbt: null,
    cf: "",
    al: {
      id: 75808773,
      name: "東京物语",
      picUrl: "https://p1.music.126.net/cL4xlcO2KOOzsnIZB5Lmlw==/109951163917052870.jpg",
      tns: [],
      pic_str: "109951163917052870",
      pic: 109951163917052860
    },
    dt: 206547,
    h: {
      br: 320000,
      fid: 0,
      size: 8264142,
      vd: 46859,
      sr: 44100
    },
    m: {
      br: 192000,
      fid: 0,
      size: 4958502,
      vd: 46859,
      sr: 44100
    },
    l: {
      br: 128000,
      fid: 0,
      size: 3305683,
      vd: 46859,
      sr: 44100
    },
    sq: {
      br: 503463,
      fid: 0,
      size: 12998648,
      vd: 46859,
      sr: 44100
    },
    hr: null,
    a: null,
    cd: "01",
    no: 5,
    rtUrl: null,
    ftype: 0,
    rtUrls: [],
    djId: 0,
    copyright: 0,
    s_id: 0,
    mark: 131136,
    originCoverType: 1,
    originSongSimpleData: null,
    tagPicList: null,
    resourceState: true,
    version: 23,
    songJumpInfo: null,
    entertainmentTags: null,
    awardTags: null,
    single: 0,
    noCopyrightRcmd: null,
    mst: 9,
    cp: 0,
    rtype: 0,
    rurl: null,
    mv: 0,
    publishTime: 1552233600000
  },
  {
    name: "追光者 钢琴版",
    id: 489499305,
    pst: 0,
    t: 0,
    ar: [
      {
        id: 12280729,
        name: "陈嘉盈",
        tns: [],
        alias: []
      }
    ],
    alia: [],
    pop: 100,
    st: 0,
    rt: null,
    fee: 0,
    v: 17,
    crbt: null,
    cf: "",
    al: {
      id: 35717713,
      name: "追光者 钢琴版",
      picUrl: "https://p1.music.126.net/5NpQ__RAtD5moVbcVt0TVg==/109951162970854152.jpg",
      tns: [],
      pic_str: "109951162970854152",
      pic: 109951162970854140
    },
    dt: 210442,
    h: {
      br: 320000,
      fid: 0,
      size: 8419831,
      vd: -5917,
      sr: 44100
    },
    m: {
      br: 192000,
      fid: 0,
      size: 5051916,
      vd: -5917,
      sr: 44100
    },
    l: {
      br: 128000,
      fid: 0,
      size: 3367959,
      vd: -5917,
      sr: 44100
    },
    sq: {
      br: 461072,
      fid: 0,
      size: 12128650,
      vd: -5917,
      sr: 44100
    },
    hr: null,
    a: null,
    cd: "01",
    no: 1,
    rtUrl: null,
    ftype: 0,
    rtUrls: [],
    djId: 0,
    copyright: 0,
    s_id: 0,
    mark: 131072,
    originCoverType: 2,
    originSongSimpleData: null,
    tagPicList: null,
    resourceState: true,
    version: 17,
    songJumpInfo: null,
    entertainmentTags: null,
    awardTags: null,
    single: 0,
    noCopyrightRcmd: null,
    mst: 9,
    cp: 0,
    rtype: 0,
    rurl: null,
    mv: 0,
    publishTime: 1499529600000
  },
  {
    name: "夏日可可",
    id: 1457172865,
    pst: 0,
    t: 0,
    ar: [
      {
        id: 30600219,
        name: "万能日记",
        tns: [],
        alias: []
      }
    ],
    alia: [],
    pop: 95,
    st: 0,
    rt: "",
    fee: 8,
    v: 16,
    crbt: null,
    cf: "",
    al: {
      id: 91282971,
      name: "夏日可可",
      picUrl: "https://p1.music.126.net/OOMKL4pDSLSAnCmpHDK4TQ==/109951165080362105.jpg",
      tns: [],
      pic_str: "109951165080362105",
      pic: 109951165080362110
    },
    dt: 205227,
    h: {
      br: 320000,
      fid: 0,
      size: 8211897,
      vd: 3092,
      sr: 44100
    },
    m: {
      br: 192000,
      fid: 0,
      size: 4927155,
      vd: 5738,
      sr: 44100
    },
    l: {
      br: 128000,
      fid: 0,
      size: 3284785,
      vd: 7551,
      sr: 44100
    },
    sq: {
      br: 659312,
      fid: 0,
      size: 16913612,
      vd: 3092,
      sr: 44100
    },
    hr: null,
    a: null,
    cd: "01",
    no: 1,
    rtUrl: null,
    ftype: 0,
    rtUrls: [],
    djId: 0,
    copyright: 0,
    s_id: 0,
    mark: 131136,
    originCoverType: 0,
    originSongSimpleData: null,
    tagPicList: null,
    resourceState: true,
    version: 16,
    songJumpInfo: null,
    entertainmentTags: null,
    awardTags: null,
    single: 0,
    noCopyrightRcmd: null,
    mst: 9,
    cp: 0,
    rtype: 0,
    rurl: null,
    mv: 0,
    publishTime: 0
  },
  {
    name: "满目星河",
    id: 1399869906,
    pst: 0,
    t: 0,
    ar: [
      {
        id: 12157336,
        name: "CMJ",
        tns: [],
        alias: []
      }
    ],
    alia: [],
    pop: 100,
    st: 0,
    rt: "",
    fee: 8,
    v: 20,
    crbt: null,
    cf: "",
    al: {
      id: 82772321,
      name: "满目星河",
      picUrl: "https://p1.music.126.net/Ihce1IeGjCljcQv0EsW0_A==/109951164456284816.jpg",
      tns: [],
      pic_str: "109951164456284816",
      pic: 109951164456284820
    },
    dt: 178018,
    h: {
      br: 320002,
      fid: 0,
      size: 7123245,
      vd: 1403,
      sr: 48000
    },
    m: {
      br: 192002,
      fid: 0,
      size: 4273965,
      vd: 4016,
      sr: 48000
    },
    l: {
      br: 128002,
      fid: 0,
      size: 2849325,
      vd: 5816,
      sr: 48000
    },
    sq: {
      br: 755325,
      fid: 0,
      size: 16807763,
      vd: 1422,
      sr: 48000
    },
    hr: {
      br: 1524656,
      fid: 0,
      size: 33927166,
      vd: 1409,
      sr: 48000
    },
    a: null,
    cd: "01",
    no: 1,
    rtUrl: null,
    ftype: 0,
    rtUrls: [],
    djId: 0,
    copyright: 0,
    s_id: 0,
    mark: 536870912,
    originCoverType: 0,
    originSongSimpleData: null,
    tagPicList: null,
    resourceState: true,
    version: 20,
    songJumpInfo: null,
    entertainmentTags: null,
    awardTags: null,
    single: 0,
    noCopyrightRcmd: null,
    mst: 9,
    cp: 0,
    rtype: 0,
    rurl: null,
    mv: 0,
    publishTime: 1572278400000
  },
  {
    name: "云村的风",
    id: 520849195,
    pst: 0,
    t: 0,
    ar: [
      {
        id: 12079231,
        name: "邱有句",
        tns: [],
        alias: []
      }
    ],
    alia: [],
    pop: 100,
    st: 0,
    rt: null,
    fee: 8,
    v: 51,
    crbt: null,
    cf: "",
    al: {
      id: 36858434,
      name: "云村的风",
      picUrl: "https://p1.music.126.net/hzaCetDBfQ4cLqD3TXVTFw==/109951163070143402.jpg",
      tns: [],
      pic_str: "109951163070143402",
      pic: 109951163070143410
    },
    dt: 232699,
    h: {
      br: 320000,
      fid: 0,
      size: 9311129,
      vd: 45756,
      sr: 44100
    },
    m: {
      br: 192000,
      fid: 0,
      size: 5586695,
      vd: 45756,
      sr: 44100
    },
    l: {
      br: 128000,
      fid: 0,
      size: 3724478,
      vd: 45756,
      sr: 44100
    },
    sq: {
      br: 490261,
      fid: 0,
      size: 14260474,
      vd: 45756,
      sr: 44100
    },
    hr: null,
    a: null,
    cd: "01",
    no: 1,
    rtUrl: null,
    ftype: 0,
    rtUrls: [],
    djId: 0,
    copyright: 0,
    s_id: 0,
    mark: 131136,
    originCoverType: 0,
    originSongSimpleData: null,
    tagPicList: null,
    resourceState: true,
    version: 51,
    songJumpInfo: null,
    entertainmentTags: null,
    awardTags: null,
    single: 0,
    noCopyrightRcmd: null,
    mst: 9,
    cp: 0,
    rtype: 0,
    rurl: null,
    mv: 0,
    publishTime: 1511612489684
  },
  {
    name: "薄荷与猫",
    id: 1833298690,
    pst: 0,
    t: 0,
    ar: [
      {
        id: 12157336,
        name: "CMJ",
        tns: [],
        alias: []
      }
    ],
    alia: [],
    pop: 100,
    st: 0,
    rt: "",
    fee: 8,
    v: 17,
    crbt: null,
    cf: "",
    al: {
      id: 125297821,
      name: "薄荷与猫",
      picUrl: "https://p1.music.126.net/Jo2oqQE2u-qBhlCxhUSjpw==/109951165844356223.jpg",
      tns: [],
      pic_str: "109951165844356223",
      pic: 109951165844356220
    },
    dt: 166800,
    h: {
      br: 320000,
      fid: 0,
      size: 6674925,
      vd: 9320,
      sr: 48000
    },
    m: {
      br: 192000,
      fid: 0,
      size: 4004973,
      vd: 11945,
      sr: 48000
    },
    l: {
      br: 128000,
      fid: 0,
      size: 2669997,
      vd: 13793,
      sr: 48000
    },
    sq: {
      br: 1431888,
      fid: 0,
      size: 29854873,
      vd: 9308,
      sr: 48000
    },
    hr: null,
    a: null,
    cd: "01",
    no: 1,
    rtUrl: null,
    ftype: 0,
    rtUrls: [],
    djId: 0,
    copyright: 0,
    s_id: 0,
    mark: 131072,
    originCoverType: 0,
    originSongSimpleData: null,
    tagPicList: null,
    resourceState: true,
    version: 17,
    songJumpInfo: null,
    entertainmentTags: null,
    awardTags: null,
    single: 0,
    noCopyrightRcmd: null,
    mst: 9,
    cp: 0,
    rtype: 0,
    rurl: null,
    mv: 0,
    publishTime: 0
  },
  {
    name: "皇家萌卫",
    id: 412319569,
    pst: 0,
    t: 0,
    ar: [
      {
        id: 1199076,
        name: "灵空音乐",
        tns: [],
        alias: []
      }
    ],
    alia: [],
    pop: 100,
    st: 0,
    rt: "",
    fee: 8,
    v: 90,
    crbt: null,
    cf: "",
    al: {
      id: 34695275,
      name: "皇家萌卫",
      picUrl: "https://p1.music.126.net/2k_eS2K6Ezx-S6n-vhSa4A==/17637266021377160.jpg",
      tns: [],
      pic_str: "17637266021377160",
      pic: 17637266021377160
    },
    dt: 209423,
    h: null,
    m: null,
    l: {
      br: 128000,
      fid: 0,
      size: 3351657,
      vd: -11600,
      sr: 44100
    },
    sq: null,
    hr: null,
    a: null,
    cd: "1",
    no: 1,
    rtUrl: null,
    ftype: 0,
    rtUrls: [],
    djId: 0,
    copyright: 0,
    s_id: 0,
    mark: 131072,
    originCoverType: 2,
    originSongSimpleData: null,
    tagPicList: null,
    resourceState: true,
    version: 90,
    songJumpInfo: null,
    entertainmentTags: null,
    awardTags: null,
    single: 0,
    noCopyrightRcmd: null,
    mst: 9,
    cp: 0,
    rtype: 0,
    rurl: null,
    mv: 0,
    publishTime: 1462919126628
  },
  {
    name: "夏末的心愿",
    id: 1492668093,
    pst: 0,
    t: 0,
    ar: [
      {
        id: 35516167,
        name: "安林",
        tns: [],
        alias: []
      }
    ],
    alia: [],
    pop: 95,
    st: 0,
    rt: "",
    fee: 8,
    v: 16,
    crbt: null,
    cf: "",
    al: {
      id: 97790816,
      name: "夏末的心愿",
      picUrl: "https://p1.music.126.net/7bjt1QrHRkLSEaVK8zPEHQ==/109951165437654832.jpg",
      tns: [],
      pic_str: "109951165437654832",
      pic: 109951165437654830
    },
    dt: 209557,
    h: {
      br: 320000,
      fid: 0,
      size: 8385350,
      vd: -23130,
      sr: 44100
    },
    m: {
      br: 192000,
      fid: 0,
      size: 5031227,
      vd: -20507,
      sr: 44100
    },
    l: {
      br: 128000,
      fid: 0,
      size: 3354166,
      vd: -18719,
      sr: 44100
    },
    sq: {
      br: 1508700,
      fid: 0,
      size: 39519981,
      vd: -23126,
      sr: 44100
    },
    hr: null,
    a: null,
    cd: "01",
    no: 1,
    rtUrl: null,
    ftype: 0,
    rtUrls: [],
    djId: 0,
    copyright: 0,
    s_id: 0,
    mark: 131136,
    originCoverType: 0,
    originSongSimpleData: null,
    tagPicList: null,
    resourceState: true,
    version: 16,
    songJumpInfo: null,
    entertainmentTags: null,
    awardTags: null,
    single: 0,
    noCopyrightRcmd: null,
    mst: 9,
    cp: 0,
    rtype: 0,
    rurl: null,
    mv: 0,
    publishTime: 0
  },
  {
    name: "初夏的夜晚",
    id: 561876887,
    pst: 0,
    t: 0,
    ar: [
      {
        id: 12020036,
        name: "Hea2t",
        tns: [],
        alias: []
      }
    ],
    alia: [],
    pop: 95,
    st: 0,
    rt: null,
    fee: 8,
    v: 85,
    crbt: null,
    cf: "",
    al: {
      id: 38792236,
      name: "初夏的夜晚",
      picUrl: "https://p1.music.126.net/syVGoH2ORDo_Q6MWg3fIQQ==/109951163299977223.jpg",
      tns: [],
      pic_str: "109951163299977223",
      pic: 109951163299977220
    },
    dt: 174404,
    h: {
      br: 320000,
      fid: 0,
      size: 6978917,
      vd: -21712,
      sr: 44100
    },
    m: {
      br: 192000,
      fid: 0,
      size: 4187368,
      vd: -21712,
      sr: 44100
    },
    l: {
      br: 128000,
      fid: 0,
      size: 2791593,
      vd: -21712,
      sr: 44100
    },
    sq: {
      br: 839668,
      fid: 0,
      size: 18305211,
      vd: -21712,
      sr: 44100
    },
    hr: null,
    a: null,
    cd: "01",
    no: 1,
    rtUrl: null,
    ftype: 0,
    rtUrls: [],
    djId: 0,
    copyright: 0,
    s_id: 0,
    mark: 131136,
    originCoverType: 0,
    originSongSimpleData: null,
    tagPicList: null,
    resourceState: true,
    version: 85,
    songJumpInfo: null,
    entertainmentTags: null,
    awardTags: null,
    single: 0,
    noCopyrightRcmd: null,
    mst: 9,
    cp: 0,
    rtype: 0,
    rurl: null,
    mv: 0,
    publishTime: 1526313600000
  },
  {
    name: "儿时的夏日",
    id: 467744316,
    pst: 0,
    t: 0,
    ar: [
      {
        id: 12065110,
        name: "余日秋山",
        tns: [],
        alias: []
      }
    ],
    alia: [],
    pop: 100,
    st: 0,
    rt: null,
    fee: 8,
    v: 27,
    crbt: null,
    cf: "",
    al: {
      id: 35309159,
      name: "儿时的夏日",
      picUrl: "https://p1.music.126.net/AoxdNp812wLheBzLBm-zXw==/109951163871163517.jpg",
      tns: [],
      pic_str: "109951163871163517",
      pic: 109951163871163520
    },
    dt: 274950,
    h: {
      br: 320000,
      fid: 0,
      size: 11000729,
      vd: -46767,
      sr: 44100
    },
    m: {
      br: 192000,
      fid: 0,
      size: 6600455,
      vd: -46767,
      sr: 44100
    },
    l: {
      br: 128000,
      fid: 0,
      size: 4400318,
      vd: -46767,
      sr: 44100
    },
    sq: {
      br: 908800,
      fid: 0,
      size: 31234333,
      vd: -46767,
      sr: 44100
    },
    hr: null,
    a: null,
    cd: "1",
    no: 1,
    rtUrl: null,
    ftype: 0,
    rtUrls: [],
    djId: 0,
    copyright: 0,
    s_id: 0,
    mark: 131136,
    originCoverType: 0,
    originSongSimpleData: null,
    tagPicList: null,
    resourceState: true,
    version: 27,
    songJumpInfo: null,
    entertainmentTags: null,
    awardTags: null,
    single: 0,
    noCopyrightRcmd: null,
    mst: 9,
    cp: 0,
    rtype: 0,
    rurl: null,
    mv: 0,
    publishTime: 1490326154334
  },
  {
    name: "彼方的天空",
    id: 1407113422,
    pst: 0,
    t: 0,
    ar: [
      {
        id: 32097509,
        name: "Melody_Fall",
        tns: [],
        alias: []
      }
    ],
    alia: [],
    pop: 95,
    st: 0,
    rt: "",
    fee: 8,
    v: 20,
    crbt: null,
    cf: "",
    al: {
      id: 83789138,
      name: "彼方的天空",
      picUrl: "https://p1.music.126.net/HkblYXVqNLD4pYCV7islxQ==/109951164636018678.jpg",
      tns: [],
      pic_str: "109951164636018678",
      pic: 109951164636018670
    },
    dt: 237017,
    h: {
      br: 320000,
      fid: 0,
      size: 9483538,
      vd: 15617,
      sr: 44100
    },
    m: {
      br: 192000,
      fid: 0,
      size: 5690140,
      vd: 18222,
      sr: 44100
    },
    l: {
      br: 128000,
      fid: 0,
      size: 3793441,
      vd: 19905,
      sr: 44100
    },
    sq: {
      br: 1411000,
      fid: 0,
      size: 18474844,
      vd: 15622,
      sr: 44100
    },
    hr: null,
    a: null,
    cd: "01",
    no: 1,
    rtUrl: null,
    ftype: 0,
    rtUrls: [],
    djId: 0,
    copyright: 0,
    s_id: 0,
    mark: 131136,
    originCoverType: 0,
    originSongSimpleData: null,
    tagPicList: null,
    resourceState: true,
    version: 20,
    songJumpInfo: null,
    entertainmentTags: null,
    awardTags: null,
    single: 0,
    noCopyrightRcmd: null,
    mst: 9,
    cp: 0,
    rtype: 0,
    rurl: null,
    mv: 0,
    publishTime: 0
  },
  {
    name: "山海不可平",
    id: 1352045760,
    pst: 0,
    t: 0,
    ar: [
      {
        id: 12157336,
        name: "CMJ",
        tns: [],
        alias: []
      }
    ],
    alia: [],
    pop: 100,
    st: 0,
    rt: "",
    fee: 8,
    v: 16,
    crbt: null,
    cf: "",
    al: {
      id: 75844888,
      name: "山海不可平",
      picUrl: "https://p1.music.126.net/SDxrgXu415dR45-pwF1mFw==/109951163927514171.jpg",
      tns: [],
      pic_str: "109951163927514171",
      pic: 109951163927514180
    },
    dt: 113509,
    h: {
      br: 320000,
      fid: 0,
      size: 4543260,
      vd: 4546,
      sr: 44100
    },
    m: {
      br: 192000,
      fid: 0,
      size: 2725973,
      vd: 4546,
      sr: 44100
    },
    l: {
      br: 128000,
      fid: 0,
      size: 1817330,
      vd: 4546,
      sr: 44100
    },
    sq: {
      br: 523711,
      fid: 0,
      size: 7430759,
      vd: 4546,
      sr: 44100
    },
    hr: null,
    a: null,
    cd: "01",
    no: 1,
    rtUrl: null,
    ftype: 0,
    rtUrls: [],
    djId: 0,
    copyright: 0,
    s_id: 0,
    mark: 131072,
    originCoverType: 1,
    originSongSimpleData: null,
    tagPicList: null,
    resourceState: true,
    version: 16,
    songJumpInfo: null,
    entertainmentTags: null,
    awardTags: null,
    single: 0,
    noCopyrightRcmd: null,
    mst: 9,
    cp: 0,
    rtype: 0,
    rurl: null,
    mv: 0,
    publishTime: 0
  },
  {
    name: "星辰坠入梦里",
    id: 1432435619,
    pst: 0,
    t: 0,
    ar: [
      {
        id: 12020036,
        name: "Hea2t",
        tns: [],
        alias: []
      }
    ],
    alia: [],
    pop: 100,
    st: 0,
    rt: "",
    fee: 8,
    v: 17,
    crbt: null,
    cf: "",
    al: {
      id: 86630391,
      name: "星辰坠入梦里",
      picUrl: "https://p1.music.126.net/Q56slaszZRYDSgk3CMK9fA==/109951164820639715.jpg",
      tns: [],
      pic_str: "109951164820639715",
      pic: 109951164820639710
    },
    dt: 199588,
    h: {
      br: 320000,
      fid: 0,
      size: 7986199,
      vd: 21001,
      sr: 44100
    },
    m: {
      br: 192000,
      fid: 0,
      size: 4791737,
      vd: 23636,
      sr: 44100
    },
    l: {
      br: 128000,
      fid: 0,
      size: 3194506,
      vd: 25388,
      sr: 44100
    },
    sq: {
      br: 2116000,
      fid: 0,
      size: 32938940,
      vd: 21001,
      sr: 44100
    },
    hr: null,
    a: null,
    cd: "01",
    no: 1,
    rtUrl: null,
    ftype: 0,
    rtUrls: [],
    djId: 0,
    copyright: 0,
    s_id: 0,
    mark: 131136,
    originCoverType: 0,
    originSongSimpleData: null,
    tagPicList: null,
    resourceState: true,
    version: 17,
    songJumpInfo: null,
    entertainmentTags: null,
    awardTags: null,
    single: 0,
    noCopyrightRcmd: null,
    mst: 9,
    cp: 0,
    rtype: 0,
    rurl: null,
    mv: 0,
    publishTime: 0
  },
  {
    name: "亲爱的旅人啊 -伴奏",
    id: 1934862309,
    pst: 0,
    t: 0,
    ar: [
      {
        id: 52151348,
        name: "木子",
        tns: [],
        alias: []
      }
    ],
    alia: [],
    pop: 85,
    st: 0,
    rt: "",
    fee: 0,
    v: 7,
    crbt: null,
    cf: "",
    al: {
      id: 142951955,
      name: "wanan",
      picUrl: "https://p1.music.126.net/VUasODkQER9vNWFWiDiSNg==/109951167240735614.jpg",
      tns: [],
      pic_str: "109951167240735614",
      pic: 109951167240735620
    },
    dt: 53636,
    h: {
      br: 320000,
      fid: 0,
      size: 2148354,
      vd: 83774,
      sr: 44100
    },
    m: {
      br: 192000,
      fid: 0,
      size: 1289030,
      vd: 86420,
      sr: 44100
    },
    l: {
      br: 128000,
      fid: 0,
      size: 859368,
      vd: 88230,
      sr: 44100
    },
    sq: {
      br: 348594,
      fid: 0,
      size: 2337180,
      vd: 83775,
      sr: 44100
    },
    hr: null,
    a: null,
    cd: "01",
    no: 1,
    rtUrl: null,
    ftype: 0,
    rtUrls: [],
    djId: 0,
    copyright: 0,
    s_id: 0,
    mark: 131200,
    originCoverType: 2,
    originSongSimpleData: null,
    tagPicList: null,
    resourceState: true,
    version: 7,
    songJumpInfo: null,
    entertainmentTags: null,
    awardTags: null,
    single: 0,
    noCopyrightRcmd: null,
    mst: 9,
    cp: 0,
    rtype: 0,
    rurl: null,
    mv: 0,
    publishTime: 0
  },
  {
    name: "追逐繁星的孩子",
    id: 1816835537,
    pst: 0,
    t: 0,
    ar: [
      {
        id: 46664013,
        name: "拾光",
        tns: [],
        alias: []
      }
    ],
    alia: [],
    pop: 95,
    st: 0,
    rt: "",
    fee: 8,
    v: 11,
    crbt: null,
    cf: "",
    al: {
      id: 122392064,
      name: "追逐繁星的孩子",
      picUrl: "https://p1.music.126.net/z3ET8GHJCa3ajuQs0j7P3Q==/109951165681566296.jpg",
      tns: [],
      pic_str: "109951165681566296",
      pic: 109951165681566300
    },
    dt: 73812,
    h: {
      br: 320000,
      fid: 0,
      size: 2954925,
      vd: 31697,
      sr: 48000
    },
    m: {
      br: 192000,
      fid: 0,
      size: 1772973,
      vd: 34340,
      sr: 48000
    },
    l: {
      br: 128000,
      fid: 0,
      size: 1181997,
      vd: 36063,
      sr: 48000
    },
    sq: {
      br: 1397841,
      fid: 0,
      size: 12897273,
      vd: 31698,
      sr: 48000
    },
    hr: null,
    a: null,
    cd: "01",
    no: 1,
    rtUrl: null,
    ftype: 0,
    rtUrls: [],
    djId: 0,
    copyright: 0,
    s_id: 0,
    mark: 131136,
    originCoverType: 0,
    originSongSimpleData: null,
    tagPicList: null,
    resourceState: true,
    version: 11,
    songJumpInfo: null,
    entertainmentTags: null,
    awardTags: null,
    single: 0,
    noCopyrightRcmd: null,
    mst: 9,
    cp: 0,
    rtype: 0,
    rurl: null,
    mv: 0,
    publishTime: 0
  },
  {
    name: "林深见鹿不见你",
    id: 1407389699,
    pst: 0,
    t: 0,
    ar: [
      {
        id: 33603866,
        name: "赵大鼾",
        tns: [],
        alias: []
      }
    ],
    alia: [],
    pop: 100,
    st: 0,
    rt: "",
    fee: 8,
    v: 16,
    crbt: null,
    cf: "",
    al: {
      id: 83810449,
      name: "林深见鹿不见你",
      picUrl: "https://p1.music.126.net/c5FDgfvbHyvj8Uix3jUfZQ==/109951164526037531.jpg",
      tns: [],
      pic_str: "109951164526037531",
      pic: 109951164526037540
    },
    dt: 350979,
    h: {
      br: 320000,
      fid: 0,
      size: 14041382,
      vd: -29507,
      sr: 44100
    },
    m: {
      br: 192000,
      fid: 0,
      size: 8424847,
      vd: -26868,
      sr: 44100
    },
    l: {
      br: 128000,
      fid: 0,
      size: 5616579,
      vd: -25078,
      sr: 44100
    },
    sq: {
      br: 2822000,
      fid: 0,
      size: 67117289,
      vd: -29507,
      sr: 44100
    },
    hr: null,
    a: null,
    cd: "01",
    no: 1,
    rtUrl: null,
    ftype: 0,
    rtUrls: [],
    djId: 0,
    copyright: 0,
    s_id: 0,
    mark: 131136,
    originCoverType: 0,
    originSongSimpleData: null,
    tagPicList: null,
    resourceState: true,
    version: 16,
    songJumpInfo: null,
    entertainmentTags: null,
    awardTags: null,
    single: 0,
    noCopyrightRcmd: null,
    mst: 9,
    cp: 0,
    rtype: 0,
    rurl: null,
    mv: 0,
    publishTime: 1575302400000
  },
  {
    name: "送给心中的男孩子",
    id: 574731407,
    pst: 0,
    t: 0,
    ar: [
      {
        id: 13038382,
        name: "温野",
        tns: [],
        alias: []
      }
    ],
    alia: [],
    pop: 95,
    st: 0,
    rt: null,
    fee: 8,
    v: 25,
    crbt: null,
    cf: "",
    al: {
      id: 39745758,
      name: "我这么可爱你为什么不喜欢我",
      picUrl: "https://p1.music.126.net/nzQXTZ7zwEMMenddLS9j4w==/109951163367520595.jpg",
      tns: [],
      pic_str: "109951163367520595",
      pic: 109951163367520590
    },
    dt: 159738,
    h: {
      br: 320000,
      fid: 0,
      size: 6391685,
      vd: 31660,
      sr: 44100
    },
    m: {
      br: 192000,
      fid: 0,
      size: 3835028,
      vd: 31660,
      sr: 44100
    },
    l: {
      br: 128000,
      fid: 0,
      size: 2556700,
      vd: 31660,
      sr: 44100
    },
    sq: null,
    hr: null,
    a: null,
    cd: "01",
    no: 1,
    rtUrl: null,
    ftype: 0,
    rtUrls: [],
    djId: 0,
    copyright: 2,
    s_id: 0,
    mark: 131136,
    originCoverType: 0,
    originSongSimpleData: null,
    tagPicList: null,
    resourceState: true,
    version: 25,
    songJumpInfo: null,
    entertainmentTags: null,
    awardTags: null,
    single: 0,
    noCopyrightRcmd: null,
    mst: 9,
    cp: 0,
    rtype: 0,
    rurl: null,
    mv: 0,
    publishTime: 1529424000000
  },
  {
    name: "蝴蝶停在指挥棒上",
    id: 1359858480,
    pst: 0,
    t: 0,
    ar: [
      {
        id: 12286466,
        name: "smile丶轩",
        tns: [],
        alias: []
      }
    ],
    alia: [],
    pop: 95,
    st: 0,
    rt: "",
    fee: 8,
    v: 23,
    crbt: null,
    cf: "",
    al: {
      id: 78533576,
      name: "游吟",
      picUrl: "https://p1.music.126.net/BMZVY9349XxOi10oXqpEYQ==/109951164010092782.jpg",
      tns: [],
      pic_str: "109951164010092782",
      pic: 109951164010092780
    },
    dt: 192161,
    h: {
      br: 320000,
      fid: 0,
      size: 7689448,
      vd: -17058,
      sr: 44100
    },
    m: {
      br: 192000,
      fid: 0,
      size: 4613686,
      vd: -17058,
      sr: 44100
    },
    l: {
      br: 128000,
      fid: 0,
      size: 3075805,
      vd: -17058,
      sr: 44100
    },
    sq: {
      br: 577492,
      fid: 0,
      size: 13871473,
      vd: -17058,
      sr: 44100
    },
    hr: null,
    a: null,
    cd: "01",
    no: 1,
    rtUrl: null,
    ftype: 0,
    rtUrls: [],
    djId: 0,
    copyright: 0,
    s_id: 0,
    mark: 131136,
    originCoverType: 0,
    originSongSimpleData: null,
    tagPicList: null,
    resourceState: true,
    version: 23,
    songJumpInfo: null,
    entertainmentTags: null,
    awardTags: null,
    single: 0,
    noCopyrightRcmd: null,
    mst: 9,
    cp: 0,
    rtype: 0,
    rurl: null,
    mv: 0,
    publishTime: 0
  },
  {
    name: "微风轻起，我喜欢你",
    id: 555422283,
    pst: 0,
    t: 0,
    ar: [
      {
        id: 12328286,
        name: "马路通",
        tns: [],
        alias: []
      }
    ],
    alia: [],
    pop: 100,
    st: 0,
    rt: null,
    fee: 8,
    v: 47,
    crbt: null,
    cf: "",
    al: {
      id: 38477257,
      name: "我喜欢你",
      picUrl: "https://p1.music.126.net/WxUDrtdIHIx2oesGBhAXzA==/109951163266412310.jpg",
      tns: [],
      pic_str: "109951163266412310",
      pic: 109951163266412300
    },
    dt: 104000,
    h: {
      br: 320000,
      fid: 0,
      size: 4162917,
      vd: 11294,
      sr: 44100
    },
    m: {
      br: 192000,
      fid: 0,
      size: 2497768,
      vd: 11294,
      sr: 44100
    },
    l: {
      br: 128000,
      fid: 0,
      size: 1665193,
      vd: 11294,
      sr: 44100
    },
    sq: {
      br: 566081,
      fid: 0,
      size: 7359053,
      vd: 11294,
      sr: 44100
    },
    hr: null,
    a: null,
    cd: "01",
    no: 1,
    rtUrl: null,
    ftype: 0,
    rtUrls: [],
    djId: 0,
    copyright: 0,
    s_id: 0,
    mark: 131136,
    originCoverType: 0,
    originSongSimpleData: null,
    tagPicList: null,
    resourceState: true,
    version: 47,
    songJumpInfo: null,
    entertainmentTags: null,
    awardTags: null,
    single: 0,
    noCopyrightRcmd: null,
    mst: 9,
    cp: 0,
    rtype: 0,
    rurl: null,
    mv: 0,
    publishTime: 1525104000000
  },
  {
    name: "愿人心温暖，万物复苏",
    id: 1304717622,
    pst: 0,
    t: 0,
    ar: [
      {
        id: 13038382,
        name: "温野",
        tns: [],
        alias: []
      }
    ],
    alia: [],
    pop: 95,
    st: 0,
    rt: null,
    fee: 8,
    v: 21,
    crbt: null,
    cf: "",
    al: {
      id: 72374503,
      name: "温野",
      picUrl: "https://p1.music.126.net/EZhtCz6Y4st0aGOTlFizXA==/109951163509815409.jpg",
      tns: [],
      pic_str: "109951163509815409",
      pic: 109951163509815410
    },
    dt: 187242,
    h: {
      br: 320000,
      fid: 0,
      size: 7491962,
      vd: -60798,
      sr: 44100
    },
    m: {
      br: 192000,
      fid: 0,
      size: 4495195,
      vd: -60798,
      sr: 44100
    },
    l: {
      br: 128000,
      fid: 0,
      size: 2996811,
      vd: -60798,
      sr: 44100
    },
    sq: {
      br: 669523,
      fid: 0,
      size: 15670416,
      vd: -60798,
      sr: 44100
    },
    hr: null,
    a: null,
    cd: "01",
    no: 1,
    rtUrl: null,
    ftype: 0,
    rtUrls: [],
    djId: 0,
    copyright: 2,
    s_id: 0,
    mark: 131136,
    originCoverType: 0,
    originSongSimpleData: null,
    tagPicList: null,
    resourceState: true,
    version: 21,
    songJumpInfo: null,
    entertainmentTags: null,
    awardTags: null,
    single: 0,
    noCopyrightRcmd: null,
    mst: 9,
    cp: 0,
    rtype: 0,
    rurl: null,
    mv: 0,
    publishTime: 1534953600000
  },
  {
    name: "如果声音不记得 钢琴版",
    id: 1900632764,
    pst: 0,
    t: 0,
    ar: [
      {
        id: 48860856,
        name: "Elizabeth McAuliffe Rachel",
        tns: [],
        alias: []
      }
    ],
    alia: [],
    pop: 85,
    st: 0,
    rt: "",
    fee: 8,
    v: 4,
    crbt: null,
    cf: "",
    al: {
      id: 130462593,
      name: "Rachel的音乐窝",
      picUrl: "https://p1.music.126.net/tMM9OvePKzPhb1NPEtWdFg==/109951166673336157.jpg",
      tns: [],
      pic_str: "109951166673336157",
      pic: 109951166673336160
    },
    dt: 39000,
    h: {
      br: 320009,
      fid: 0,
      size: 1561965,
      vd: 70581,
      sr: 48000
    },
    m: {
      br: 192009,
      fid: 0,
      size: 937197,
      vd: 73223,
      sr: 48000
    },
    l: {
      br: 128009,
      fid: 0,
      size: 624813,
      vd: 75018,
      sr: 48000
    },
    sq: null,
    hr: null,
    a: null,
    cd: "01",
    no: 1,
    rtUrl: null,
    ftype: 0,
    rtUrls: [],
    djId: 0,
    copyright: 0,
    s_id: 0,
    mark: 131072,
    originCoverType: 0,
    originSongSimpleData: null,
    tagPicList: null,
    resourceState: true,
    version: 4,
    songJumpInfo: null,
    entertainmentTags: null,
    awardTags: null,
    single: 0,
    noCopyrightRcmd: null,
    mst: 9,
    cp: 0,
    rtype: 0,
    rurl: null,
    mv: 0,
    publishTime: 0
  },
  {
    name: "我这么可爱你为什么不喜欢我",
    id: 863265903,
    pst: 0,
    t: 0,
    ar: [
      {
        id: 13038382,
        name: "温野",
        tns: [],
        alias: []
      }
    ],
    alia: [],
    pop: 95,
    st: 0,
    rt: null,
    fee: 8,
    v: 19,
    crbt: null,
    cf: "",
    al: {
      id: 39745758,
      name: "我这么可爱你为什么不喜欢我",
      picUrl: "https://p1.music.126.net/nzQXTZ7zwEMMenddLS9j4w==/109951163367520595.jpg",
      tns: [],
      pic_str: "109951163367520595",
      pic: 109951163367520590
    },
    dt: 92149,
    h: {
      br: 320000,
      fid: 0,
      size: 3688533,
      vd: 10641,
      sr: 44100
    },
    m: {
      br: 192000,
      fid: 0,
      size: 2213137,
      vd: 10641,
      sr: 44100
    },
    l: {
      br: 128000,
      fid: 0,
      size: 1475439,
      vd: 10641,
      sr: 44100
    },
    sq: {
      br: 490858,
      fid: 0,
      size: 5654016,
      vd: 10641,
      sr: 44100
    },
    hr: null,
    a: null,
    cd: "01",
    no: 1,
    rtUrl: null,
    ftype: 0,
    rtUrls: [],
    djId: 0,
    copyright: 0,
    s_id: 0,
    mark: 131136,
    originCoverType: 0,
    originSongSimpleData: null,
    tagPicList: null,
    resourceState: true,
    version: 19,
    songJumpInfo: null,
    entertainmentTags: null,
    awardTags: null,
    single: 0,
    noCopyrightRcmd: null,
    mst: 9,
    cp: 0,
    rtype: 0,
    rurl: null,
    mv: 0,
    publishTime: 1529424000000
  },
  {
    name: "你像是晴天粉色云彩空气甜的坠入脑海",
    id: 1925336574,
    pst: 0,
    t: 0,
    ar: [
      {
        id: 48044350,
        name: "酥羽梨",
        tns: [],
        alias: []
      }
    ],
    alia: [],
    pop: 95,
    st: 0,
    rt: "",
    fee: 8,
    v: 16,
    crbt: null,
    cf: "",
    al: {
      id: 141313028,
      name: "你像是晴天粉色云彩空气甜的坠入脑海",
      picUrl: "https://p1.music.126.net/ILi_zJL9yM9statbyDN9bg==/109951167114187511.jpg",
      tns: [],
      pic_str: "109951167114187511",
      pic: 109951167114187500
    },
    dt: 219058,
    h: {
      br: 320002,
      fid: 0,
      size: 8764845,
      vd: 32194,
      sr: 48000
    },
    m: {
      br: 192002,
      fid: 0,
      size: 5258925,
      vd: 34848,
      sr: 48000
    },
    l: {
      br: 128002,
      fid: 0,
      size: 3505965,
      vd: 36654,
      sr: 48000
    },
    sq: {
      br: 745404,
      fid: 0,
      size: 20410926,
      vd: 32155,
      sr: 48000
    },
    hr: null,
    a: null,
    cd: "01",
    no: 1,
    rtUrl: null,
    ftype: 0,
    rtUrls: [],
    djId: 0,
    copyright: 0,
    s_id: 0,
    mark: 131136,
    originCoverType: 0,
    originSongSimpleData: null,
    tagPicList: null,
    resourceState: true,
    version: 16,
    songJumpInfo: null,
    entertainmentTags: null,
    awardTags: null,
    single: 0,
    noCopyrightRcmd: null,
    mst: 9,
    cp: 0,
    rtype: 0,
    rurl: null,
    mv: 0,
    publishTime: 0
  }
];

function Player() {
  const [playing, { toggle: togglePlayer }] = useToggle(); // 播放中
  const audioRef = useRef<HTMLAudioElement>(null);
  const [curSong, setCurSong] = useState<Song>();
  const [songReady, setSongReady] = useState(true); // 歌曲缓存完成
  const [playTime, setPlayTime] = useState<number>(0);

  const { id, dt } = curSong || {};
  const percent = useMemo(() => {
    const duration = dt / 1000;
    return isNaN(playTime / duration) ? 0 : (Math.ceil(playTime) / Math.ceil(duration)) * 100;
  }, [playTime, dt]);

  const handleError = () => {
    setSongReady(true);
  };

  useEffect(() => {
    playing ? audioRef.current!.play() : audioRef.current!.pause();
  }, [playing]);

  useEffect(() => {
    if (id) {
      const songUrl = `https://music.163.com/song/media/outer/url?id=${id}.mp3`;
      audioRef.current!.src = songUrl;
      setTimeout(() => {
        audioRef.current!.play().then((res) => {
          // 歌曲开始播放后将标识设置为true
          setSongReady(true);
        });
      });
      togglePlayer();
    }
  }, [id]);
  return (
    <div className="w-heart--wrapper flex flex-col pb-24">
      <div className="flex-1 px-32 flex">
        <SongListTable<Song>
          dataSource={songList}
          scroll={{ y: document.body.clientHeight - 240 }}
          onPlayClick={(item) => {
            setCurSong(item);
          }}
          curPlayId={id}
        />
        <div className="ml-8 mt-5 shrink-0">
          <Image
            width={200}
            height={200}
            src="https://p1.music.126.net/uNpSTrse-CivyZ2NUyhJUQ==/17892352718986703.jpg?param=224y224"
          />
          <div className="text-center pt-2">
            <p>歌曲名：青石巷</p>
            <p>歌手：魏琮霏</p>
            <p>专辑：《Wei》</p>
          </div>
        </div>
      </div>
      <div className="fixed bottom-0 z-50 w-full backdrop-blur px-32 h-20 flex items-center">
        <div className="flex items-center cursor-pointer">
          <IconRestart className="text-2xl" />
          {playing ? (
            <IconPause className="text-3xl mx-5" onClick={togglePlayer} />
          ) : (
            <IconPlay className="text-3xl mx-5" onClick={togglePlayer} />
          )}
          <IconRestart className="text-2xl rotate-180" />
        </div>
        <div className="flex flex-col w-2/3 mx-3">
          <div className="flex justify-between mb-2 mx-3">
            <span>歌曲名称</span>
            {dt && (
              <span>
                {formatPlayTime(playTime)} / {formatPlayTime(dt / 1000)}
              </span>
            )}
          </div>
          {/* <div className="h-1 bg-black dark:bg-white"></div> */}
          <Slider
            value={percent}
            onChange={(val) => {
              if (typeof val == "number") {
                const newTime = val * (dt / 1000 / 100);
                setPlayTime(newTime);
                audioRef.current!.currentTime = newTime;
                if (!playing) {
                  togglePlayer();
                }
              }
            }}
          />
        </div>
        <div className="flex items-center">
          <IconSync className="text-2xl" />
          <IconHeartStroked className="text-2xl mx-3" />
          <IconShareStroked className="text-2xl" />
        </div>
        <div className="flex items-center">
          <IconVolume2 className="text-2xl ml-3 mr-2" />
          {/* <div className="h-1 bg-black dark:bg-white w-20"></div> */}
          <div className="w-24">
            <Slider></Slider>
          </div>
        </div>
      </div>
      <audio
        ref={audioRef}
        onTimeUpdate={(e) => {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          setPlayTime(e.target.currentTime);
        }}
        // onEnded={handleAudioEnd}
        onError={handleError}
      ></audio>
    </div>
  );
}

export default Player;
