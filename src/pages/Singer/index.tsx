import { getSingerlistByTag } from "@/http/api";
import { Artist } from "@/types/home";
import { SearchInfoType } from "@/types/singer";
import { Skeleton } from "@douyinfe/semi-ui";
import { useInfiniteQuery } from "@tanstack/react-query";
import React, { useRef, useState, useEffect } from "react";
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

  const offsetRef = useRef<number>(0);

  const { data, fetchNextPage, hasNextPage, isLoading, isFetchingNextPage } = useInfiniteQuery(
    ["singerList", searchInfo],
    async (obj) => {
      const res = await getSingerlistByTag({ limit: 30, ...searchInfo, offset: obj.pageParam });
      return res;
    },
    {
      getNextPageParam: (lastPage) => {
        if (lastPage.more) {
          return offsetRef.current * 30;
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
          <div className="px-32 flex items-center justify-between flex-wrap">
            {Array.from({ length: 10 }, (v, i) => i).map((item) => (
              <div key={item} className="flex flex-col items-center justify-center">
                <Skeleton.Image className="w-56 h-56 mb-5 mt-6 rounded-full" />
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
            offsetRef.current += 1;
            fetchNextPage();
          }}
        />
      </Skeleton>
    </div>
  );
}

export default Singer;
