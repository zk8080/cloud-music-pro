import { getPlaylistTrackList, getToplist } from "@/http/api";
import { List, Song } from "@/types/home";
import { Skeleton, Typography } from "@douyinfe/semi-ui";
import { useQuery } from "@tanstack/react-query";
import classNames from "classnames";
import { useNavigate } from "react-router-dom";

const { Title, Text } = Typography;

function Leaderboard() {
  const navigate = useNavigate();
  const query = useQuery(["topList"], getToplist);

  const topList = query.data?.list?.slice(0, 4) || [];

  // 获取榜单歌单详情
  const getTopDetail = async (topList: List[]) => {
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
    return tmpMap;
  };

  const topMap = useQuery(["topDetailMap", topList], () => getTopDetail(topList), {
    // 当有榜单信息时再调用
    enabled: topList.length > 0
  });
  const { data: topDetailMap, isLoading } = topMap;

  return (
    <>
      <Title heading={2} ellipsis={{ showTooltip: true }} className="flex items-center justify-center my-5">
        排行榜
      </Title>
      <Skeleton
        placeholder={
          <div className="w-heart--wrapper flex mt-5 px-32 justify-between">
            <Skeleton.Image className="w-24/100 h-112 rounded-md" />
            <Skeleton.Image className="w-24/100 h-112 rounded-md" />
            <Skeleton.Image className="w-24/100 h-112 rounded-md" />
            <Skeleton.Image className="w-24/100 h-112 rounded-md" />
          </div>
        }
        loading={isLoading}
        active
      >
        <div className="w-heart--wrapper flex mt-5 px-32 justify-between">
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
                  {topDetailMap?.[item.id!]?.map((track, index) => {
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
                        <Text
                          className="ml-auto"
                          ellipsis={{ showTooltip: true }}
                          onClick={() => navigate(`/singerDetail/${track.ar?.[0]?.id}`)}
                        >
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
      </Skeleton>
    </>
  );
}

export default Leaderboard;
