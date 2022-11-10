import { memo, useState, useEffect } from "react";
import { Button, List, Skeleton } from "@douyinfe/semi-ui";
import { useParams } from "react-router-dom";
import { useInfiniteQuery } from "@tanstack/react-query";
import { getSingerMV } from "@/http/api";
import { Mv } from "@/types/singerDetail";
import SongCard from "@/components/SongCard";

function RelatedMV() {
  const { id } = useParams();
  const [mvList, setMVList] = useState<Mv[]>([]);

  const { data, fetchNextPage, hasNextPage, isLoading, isFetchingNextPage } = useInfiniteQuery(
    ["singerRelatedMV", id],
    async (obj) => {
      const res = await getSingerMV({ id, limit: 30, offset: obj.pageParam });
      return res;
    },
    {
      getNextPageParam: (lastPage, page) => {
        if (lastPage.hasMore) {
          return page.length * 30;
        }
        return;
      }
    }
  );
  useEffect(() => {
    if (data?.pages && data?.pages?.length > 0) {
      const list = data?.pages.reduce((t, c) => {
        return [...t, ...(c.mvs || [])];
      }, [] as Mv[]);
      setMVList(list);
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
        dataSource={mvList}
        loadMore={loadMore}
        renderItem={(item) => {
          const { name, imgurl, id } = item;
          return (
            <List.Item className="mt-6">
              <SongCard key={id} coverImgUrl={imgurl} songName={name} />
            </List.Item>
          );
        }}
      />
    </Skeleton>
  );
}

export default memo(RelatedMV);
