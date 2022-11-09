import { memo, useState, useEffect } from "react";
import { Button, List, Skeleton, Typography } from "@douyinfe/semi-ui";
import { useParams } from "react-router-dom";
import { useInfiniteQuery } from "@tanstack/react-query";
import { getSingerAlbumDetail } from "@/http/api";
import { HotAlbum } from "@/types/singerDetail";
import { format } from "date-fns";
import SongCard from "@/components/SongCard";

const { Text } = Typography;

function SingerAlbum() {
  const { id } = useParams();
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

  const loadMore = hasNextPage ? (
    <div className="text-center mt-5">
      <Button
        onClick={() => {
          fetchNextPage();
        }}
        type="primary"
        theme="solid"
        loading={isFetchingNextPage}
      >
        显示更多
      </Button>
    </div>
  ) : null;

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
      <List
        grid={{
          gutter: 16,
          span: 5 / 24
        }}
        className="w-heart--wrapper"
        layout="horizontal"
        dataSource={albumList}
        loadMore={loadMore}
        renderItem={(item) => {
          const { name, blurPicUrl, id, publishTime } = item;
          return (
            <List.Item className="mt-6">
              <SongCard
                key={id}
                coverImgUrl={blurPicUrl}
                songName={name}
                textRender={publishTime ? <Text>{format(publishTime, "yyyy-MM-dd")}</Text> : null}
              />
            </List.Item>
          );
        }}
      />
    </Skeleton>
  );
}

export default memo(SingerAlbum);
