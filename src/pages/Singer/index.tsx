import InfinitLoadList from "@/components/InfinitLoadList";
import { getSingerlistByTag } from "@/http/api";
import { Artist } from "@/types/home";
import { SearchInfoType } from "@/types/singer";
import { Skeleton, Typography } from "@douyinfe/semi-ui";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import SingerCategory from "./components/SingerCategory";
import "./index.scss";
import { useNavigate } from "react-router-dom";

const { Title } = Typography;

function Singer() {
  const navigate = useNavigate();
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
            {Array.from({ length: 30 }, (v, i) => i).map((item) => (
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
        <InfinitLoadList<Artist>
          className="px-32"
          dataList={singerList}
          hasMore={hasNextPage}
          isFetchingNextPage={isFetchingNextPage}
          onLoadMore={() => {
            fetchNextPage();
          }}
          onItemClick={(item) => {
            navigate(`/singerDetail/${item?.id}`);
          }}
          renderItem={(item) => {
            const { name, picUrl } = item;
            return (
              <div className=" flex flex-col w-56 h-64 items-center justify-center rounded-md bg-zinc-100 dark:bg-zinc-800">
                <div className="group w-44 h-44 rounded-full mb-5 cursor-pointer overflow-hidden">
                  <img
                    className="rounded-full w-full h-full group-hover:scale-125 transition duration-500 ease-in-out"
                    src={`${picUrl}?param=160y160`}
                    alt=""
                  />
                </div>
                <Title heading={5} ellipsis={{ showTooltip: true }}>
                  {name}
                </Title>
              </div>
            );
          }}
        />
      </Skeleton>
    </div>
  );
}

export default Singer;
