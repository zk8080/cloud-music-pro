import { getPlaylistTrackList, getToplist } from "@/http/api";
import { List, Playlist, Song } from "@/types/home";
import { Typography } from "@douyinfe/semi-ui";
import classNames from "classnames";
import React, { useEffect, useState } from "react";

const { Title, Text } = Typography;

function Leaderboard() {
  const [topList, setTopList] = useState<List[]>([]);
  const [topDetailMap, setTopDetailMap] = useState<Record<number, Song[]>>({});

  // 获取榜单歌单详情
  const getTopDetail = async () => {
    const res = await Promise.all(
      topList.map((item) => {
        return getPlaylistTrackList({ id: item.id!, limit: 10 });
      })
    );
    const tmpMap: Record<number, Song[]> = {};
    res.map((item, index) => {
      if (item.code === 200) {
        if (item.songs) {
          tmpMap[topList[index].id!] = item.songs;
        }
      }
    });
    setTopDetailMap(tmpMap);
    console.log(res, "---res--");
  };

  useEffect(() => {
    // 获取所有榜单
    const getTopList = async () => {
      const res = await getToplist();
      if (res.code === 200) {
        setTopList(res.list?.slice(0, 4) || []);
      }
    };
    getTopList();
  }, []);

  useEffect(() => {
    if (topList.length > 0) {
      getTopDetail();
    }
  }, [topList]);

  return (
    <>
      <Title heading={2} ellipsis={{ showTooltip: true }} className="flex items-center justify-center my-5">
        排行榜
      </Title>
      <div className="flex mt-5 px-32 justify-between">
        {topList.map((item) => {
          return (
            <div
              className="flex flex-col w-24/100 h-112 py-4 shadow-2xl rounded-md"
              key={item.id}
              style={{
                backgroundImage: `url(${item.coverImgUrl}?imageView&param=100y100&blur=40x20)`
              }}
            >
              <Title heading={4} className="text-white text-center font-mono italic">
                {item.name}
              </Title>
              <ul className="h-full flex flex-col justify-between mt-2">
                {topDetailMap[item.id!]?.map((track, index) => {
                  return (
                    <li
                      key={track.id}
                      className="top-detail--item flex items-center px-5 cursor-pointer text-white text-xl"
                    >
                      <span
                        className={classNames("italic", {
                          "font-bold": index + 1 < 4
                        })}
                      >
                        {index + 1}.
                      </span>
                      <Text className="ml-3 mr-4" ellipsis={{ showTooltip: true }}>
                        {track.name}
                      </Text>
                      <Text className="ml-auto" ellipsis={{ showTooltip: true }}>
                        {track.ar?.[0]?.name}
                      </Text>
                    </li>
                  );
                })}
              </ul>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default Leaderboard;
