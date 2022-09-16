import { getPersonalizedNewSong } from "@/http/api";
import { PersonalizedNewSongItem } from "@/types/home";
import { chunk } from "@/utils";
import { Card, Carousel, Typography } from "@douyinfe/semi-ui";
import { useEffect, useState } from "react";
import Image from "@/components/CoverImage";
import SongCard from "@/components/SongCard";

const { Title, Text } = Typography;

function PersonalizedNewSong() {
  const [personalizedList, setPersonalizedList] = useState<PersonalizedNewSongItem[][]>([]);

  useEffect(() => {
    const getList = async () => {
      const res = await getPersonalizedNewSong({ limit: 20 });
      if (res.code === 200) {
        const newList = chunk(res.result || [], 5);
        setPersonalizedList(newList || []);
      }
    };
    getList();
  }, []);

  return (
    <>
      <Title heading={2} ellipsis={{ showTooltip: true }} className="flex items-center justify-center my-5">
        新碟上架
      </Title>
      {personalizedList?.length > 0 && (
        <Carousel
          className="w-full h-88"
          theme="dark"
          speed={1000}
          animation="fade"
          showIndicator={false}
          autoPlay={false}
          arrowType="hover"
        >
          {personalizedList.map((item, index) => {
            return (
              <div key={index} className="px-32 flex items-center justify-between">
                {item.map((childItem) => {
                  const {
                    id,
                    picUrl,
                    name,
                    song = {
                      artists: []
                    }
                  } = childItem || {};
                  return (
                    <SongCard
                      key={id}
                      coverImgUrl={picUrl}
                      songName={name}
                      artistsName={song?.artists && song?.artists[0]?.name}
                    />
                  );
                })}
              </div>
            );
          })}
        </Carousel>
      )}
    </>
  );
}

export default PersonalizedNewSong;
