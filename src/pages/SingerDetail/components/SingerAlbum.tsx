import { memo, useState, useEffect } from "react";
import { Skeleton, Typography } from "@douyinfe/semi-ui";
import { useNavigate, useParams } from "react-router-dom";
import { useInfiniteQuery } from "@tanstack/react-query";
import { getSingerAlbumDetail } from "@/http/api";
import { HotAlbum } from "@/types/singerDetail";
import { format } from "date-fns";
import SongCard from "@/components/SongCard";
import InfinitLoadList from "@/components/InfinitLoadList";

const { Text } = Typography;

function SingerAlbum() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [albumList, setAlbumList] = useState<HotAlbum[]>([]);

  const { data, fetchNextPage, hasNextPage, isLoading, isFetchingNextPage } = useInfiniteQuery(
    ["singerAlbum", id],
    async (obj) => {
      const res = await getSingerAlbumDetail({ id, limit: 30, offset: obj.pageParam });
      return res;
    },
    {
      getNextPageParam: (lastPage, page) => {
        if (lastPage.more) {
          return page.length * 30;
        }
        return;
      }
    }
  );
  useEffect(() => {
    if (data?.pages && data?.pages?.length > 0) {
      const list = data?.pages.reduce((t, c) => {
        return [...t, ...(c.hotAlbums || [])];
      }, [] as HotAlbum[]);
      setAlbumList(list);
    }
  }, [data?.pages]);

  return (
    <Skeleton
      placeholder={
        <div className="w-heart--wrapper flex items-center justify-between flex-wrap">
          {Array.from({ length: 10 }, (v, i) => i).map((item) => (
            <Skeleton.Image key={item} className="w-56 h-72 mt-6" />
          ))}
        </div>
      }
      loading={isLoading}
      active
    >
      <InfinitLoadList<HotAlbum>
        dataList={albumList}
        hasMore={hasNextPage}
        isFetchingNextPage={isFetchingNextPage}
        onLoadMore={() => {
          fetchNextPage();
        }}
        onItemClick={(item) => {
          navigate(`/albumDetail/${item?.id}`);
        }}
        renderItem={(item) => {
          const { name, blurPicUrl, id, publishTime } = item;
          return (
            <SongCard
              key={id}
              coverImgUrl={blurPicUrl}
              songName={name}
              textRender={publishTime ? <Text>{format(publishTime, "yyyy-MM-dd")}</Text> : null}
            />
          );
        }}
      />
    </Skeleton>
  );
}

export default memo(SingerAlbum);
