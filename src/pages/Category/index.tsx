import { getCategoryList, getPlaylistByTag } from "@/http/api";
import { Playlist } from "@/types/home";
import { IconClose } from "@douyinfe/semi-icons";
import { useQuery, useInfiniteQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import CategoryTagList from "./components/CategoryTagList";
import "./index.scss";
import { Skeleton } from "@douyinfe/semi-ui";
import InfinitLoadList from "@/components/InfinitLoadList";
import SongCard from "@/components/SongCard";
import { useNavigate } from "react-router-dom";

const initialCat = "全部";

function Category() {
  const navigate = useNavigate();
  const [curCategory, setCurCategory] = useState<string>(initialCat);
  const [playList, setPlayList] = useState<Playlist[]>([]);

  const { data: categoryList = [], isLoading: categoryLoading } = useQuery(["categoryList"], getCategoryList, {
    select: (res) => {
      const { code, sub, categories = {} } = res || {};
      if (code === 200) {
        const tmpList = Object.entries(categories)?.map(([key, val]) => {
          const list = sub?.filter((item) => item.category === Number(key));
          return {
            code: key,
            name: val,
            list
          };
        });
        return tmpList;
      }
      return [];
    }
  });

  const { data, fetchNextPage, hasNextPage, isLoading, isFetchingNextPage } = useInfiniteQuery(
    ["playList", curCategory],
    async (obj) => {
      const res = await getPlaylistByTag({ limit: 20, cat: curCategory, offset: obj.pageParam || 0 });
      return res;
    },
    {
      getNextPageParam: (lastPage, page) => {
        if (lastPage.more) {
          return page.length * 20;
        }
        return;
      },
      refetchOnWindowFocus: false
    }
  );

  useEffect(() => {
    if (data?.pages && data?.pages?.length > 0) {
      const list = data?.pages.reduce((t, c) => {
        return [...t, ...(c.playlists || [])];
      }, [] as Playlist[]);
      setPlayList(list);
    }
  }, [data?.pages]);

  return (
    <div className="category--wrapper">
      <Skeleton
        placeholder={
          <div className="w-heart--wrapper px-32 my-3">
            <Skeleton.Paragraph rows={5} />
          </div>
        }
        loading={categoryLoading}
        active
      >
        <CategoryTagList
          categoryList={categoryList}
          onTagClick={(cat) => {
            setCurCategory(cat);
          }}
          curCategory={curCategory}
        />
      </Skeleton>
      <Skeleton
        placeholder={
          <div className="w-heart--wrapper px-32 my-3">
            <Skeleton.Title className="w-32 h-8" />
          </div>
        }
        loading={categoryLoading}
        active
      >
        <h2 className="w-heart--wrapper px-32 my-3 text-3xl flex">
          {curCategory}
          {curCategory !== initialCat && (
            <IconClose
              onClick={() => {
                setCurCategory(initialCat);
              }}
              className="ml-2 cursor-pointer hover:text-primary"
            />
          )}
        </h2>
      </Skeleton>
      <Skeleton
        placeholder={
          <div className="w-heart--wrapper px-32 flex items-center justify-between flex-wrap">
            {Array.from({ length: 20 }, (v, i) => i).map((item) => (
              <Skeleton.Image key={item} className="w-56 h-72 mt-6" />
            ))}
          </div>
        }
        loading={isLoading}
        active
      >
        <InfinitLoadList<Playlist>
          className="px-32"
          dataList={playList}
          hasMore={hasNextPage}
          isFetchingNextPage={isFetchingNextPage}
          onLoadMore={() => {
            fetchNextPage();
          }}
          onItemClick={(item) => {
            navigate(`/songList/${item?.id}`);
          }}
          renderItem={(item) => {
            const { name, coverImgUrl } = item;
            return <SongCard songName={name} coverImgUrl={coverImgUrl} />;
          }}
        />
      </Skeleton>
    </div>
  );
}

export default Category;
