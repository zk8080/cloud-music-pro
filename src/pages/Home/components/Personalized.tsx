import { getHotTag, getHighqualityPlaylistByTag } from "@/http/api";
import { Playlist, Tag } from "@/types/home";
import { chunk } from "@/utils";
import { Card, Carousel, Typography } from "@douyinfe/semi-ui";
import { useEffect, useState } from "react";
import classNames from "classnames";
import Image from "@/components/CoverImage";
import SongCard from "@/components/SongCard";

const { Title } = Typography;

function Personalized() {
  const [tagList, setTagList] = useState<Tag[]>([]);
  const [curTag, setCurTag] = useState<string>("全部");
  const [personalizedList, setPersonalizedList] = useState<Playlist[][]>([]); // 歌单列表

  const getList = async (tag = "全部") => {
    const res = await getHighqualityPlaylistByTag({ limit: 20, cat: tag });
    if (res.code === 200) {
      const newList = chunk(res.playlists || [], 5);
      setPersonalizedList(newList || []);
    }
  };

  useEffect(() => {
    const getTags = async () => {
      const res = await getHotTag();
      if (res.code === 200) {
        const newList = res.tags ? [{ id: -1, name: "全部" }, ...res.tags] : [];
        setTagList(newList?.slice(0, 5) || []);
      }
    };
    getTags();
  }, []);

  useEffect(() => {
    getList();
  }, []);

  return (
    <>
      <Title heading={2} ellipsis={{ showTooltip: true }} className="flex items-center justify-center my-5">
        热门推荐
      </Title>
      {tagList.length > 0 && (
        <div className="flex items-center justify-center my-4">
          {tagList.map((item) => {
            return (
              <div
                key={item.id}
                className={classNames("tag-item mx-4 cursor-pointer hover:text-primary", {
                  active: curTag === item.name
                })}
                onClick={async () => {
                  await getList(item.name);
                  setCurTag(item.name || "全部");
                }}
              >
                {item.name}
              </div>
            );
          })}
        </div>
      )}

      <div key={curTag}>
        {personalizedList?.length > 0 && (
          <Carousel
            key={curTag}
            className="w-full h-80"
            speed={1000}
            animation="fade"
            showIndicator={false}
            autoPlay={false}
            arrowType="hover"
            theme="dark"
          >
            {personalizedList.map((item, index) => {
              return (
                <div key={`${curTag}${index}`} className="px-32 flex items-center justify-between">
                  {item.map((childItem) => {
                    const { id, coverImgUrl, name } = childItem || {};
                    return <SongCard key={id} coverImgUrl={coverImgUrl} songName={name} />;
                  })}
                </div>
              );
            })}
          </Carousel>
        )}
      </div>
    </>
  );
}

export default Personalized;
