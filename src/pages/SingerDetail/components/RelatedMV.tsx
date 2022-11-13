import { memo, useState, useEffect } from "react";
import { Skeleton } from "@douyinfe/semi-ui";
import { useParams } from "react-router-dom";
import { useInfiniteQuery } from "@tanstack/react-query";
import { getSingerMV } from "@/http/api";
import { Mv } from "@/types/singerDetail";
import SongCard from "@/components/SongCard";
import InfinitLoadList from "@/components/InfinitLoadList";

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
      <InfinitLoadList<Mv>
        dataList={mvList}
        hasMore={hasNextPage}
        isFetchingNextPage={isFetchingNextPage}
        onLoadMore={() => {
          fetchNextPage();
        }}
        renderItem={(item) => {
          const { name, imgurl, id } = item;
          return <SongCard key={id} coverImgUrl={imgurl} songName={name} />;
        }}
      />
    </Skeleton>
  );
}

export default memo(RelatedMV);
