import { getSingerlistByTag } from "@/http/api";
import { Artist } from "@/types/home";
import { SearchInfoType } from "@/types/singer";
import { Skeleton } from "@douyinfe/semi-ui";
import { useInfiniteQuery } from "@tanstack/react-query";
import React, { useState, useEffect } from "react";
import SingerCategory from "./components/SingerCategory";
import SingerList from "./components/SingerList";
import "./index.scss";

function Singer() {
  const [searchInfo, setSearchInfo] = useState<SearchInfoType>({
    initial: undefined,
    type: "-1",
    area: "-1"
  });
  const { initial, type, area } = searchInfo;

  const [singerList, setSingerList] = useState<Artist[]>([]);

  const { data, fetchNextPage, hasNextPage, isLoading, isFetchingNextPage } = useInfiniteQuery(
    ["singerList", searchInfo],
    async (obj) => {
      const res = await getSingerlistByTag({ limit: 30, ...searchInfo, offset: obj.pageParam });
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
        return [...t, ...(c.artists || [])];
      }, [] as Artist[]);
      setSingerList(list);
    }
  }, [data?.pages]);
  return (
    <div className="singer--wrapper w-heart--wrapper">
      <SingerCategory
        curAlpha={initial}
        curArea={area}
        curCategory={type}
        onTagClick={(obj) => {
          setSearchInfo({ ...searchInfo, ...obj });
        }}
      />
      <Skeleton
        placeholder={
          <div className="px-32 flex items-center justify-between flex-wrap mt-6">
            {Array.from({ length: 10 }, (v, i) => i).map((item) => (
              <div
                key={item}
                className="w-56 h-64 flex flex-col items-center justify-center mb-5 rounded-md bg-zinc-100 dark:bg-zinc-800"
              >
                <Skeleton.Image className="w-44 h-44 mb-5 rounded-full" />
                <Skeleton.Title className="w-32 h-8" />
              </div>
            ))}
          </div>
        }
        loading={isLoading}
        active
      >
        <SingerList
          singerList={singerList}
          hasMore={hasNextPage}
          isFetchingNextPage={isFetchingNextPage}
          onLoadMore={() => {
            fetchNextPage();
          }}
        />
      </Skeleton>
    </div>
  );
}

export default Singer;
