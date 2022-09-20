import { getCategoryList, getPlaylistByTag } from "@/http/api";
import { Playlist } from "@/types/home";
import { IconClose } from "@douyinfe/semi-icons";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useRef, useState } from "react";
import CategoryTagList from "./components/CategoryTagList";
import PlayerList from "./components/PlayerList";
import { useInfiniteQuery } from "@tanstack/react-query";
import "./index.scss";

const initialCat = "全部";

function Category() {
  // const [categoryList, setCategoryList] = useState<CategoryMapList[]>([]);
  const [curCategory, setCurCategory] = useState<string>(initialCat);
  const [playList, setPlayList] = useState<Playlist[]>([]);
  const offsetRef = useRef<number>(0);

  const { data: categoryList = [] } = useQuery(["categoryList"], getCategoryList, {
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

  const { data, fetchNextPage, hasNextPage } = useInfiniteQuery(
    ["playList", curCategory],
    async (obj) => {
      const res = await getPlaylistByTag({ limit: 50, cat: curCategory, offset: obj.pageParam });
      return res;
    },
    {
      getNextPageParam: (lastPage) => {
        if (lastPage.more) {
          return offsetRef.current * 50;
        }
        return;
      }
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
      <CategoryTagList
        categoryList={categoryList}
        onTagClick={(cat) => {
          setCurCategory(cat);
          offsetRef.current = 0;
        }}
        curCategory={curCategory}
      />
      <h2 className="px-32 my-3 text-3xl flex">
        {curCategory}
        {curCategory !== initialCat && (
          <IconClose
            onClick={() => {
              setCurCategory(initialCat);
              offsetRef.current = 0;
            }}
            className="ml-2 cursor-pointer hover:text-primary"
          />
        )}
      </h2>
      <PlayerList
        playList={playList}
        hasMore={hasNextPage}
        onLoadMore={() => {
          offsetRef.current += 1;
          fetchNextPage();
        }}
      />
    </div>
  );
}

export default Category;
