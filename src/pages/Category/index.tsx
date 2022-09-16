import { getCategoryList, getPlaylistByTag } from "@/http/api";
import { CategoryMapList } from "@/types/category";
import { Playlist } from "@/types/home";
import { IconClose } from "@douyinfe/semi-icons";
import { useEffect, useState } from "react";
import CategoryTagList from "./components/CategoryTagList";
import PlayerList from "./components/PlayerList";
import "./index.scss";

const initialCat = "全部";

function Category() {
  const [categoryList, setCategoryList] = useState<CategoryMapList[]>([]);
  const [curCategory, setCurCategory] = useState<string>(initialCat);
  const [playList, setPlayList] = useState<Playlist[]>([]);
  const [offset, setOffset] = useState<number>(0);
  const [hasMore, setHasMore] = useState<boolean>(false);

  // 获取歌单列表
  const getPlayList = async ({ cat, offset }: { cat: string; offset: number }) => {
    try {
      setCurCategory(cat);
      setOffset(offset);
      const res = await getPlaylistByTag({
        limit: 50,
        cat,
        offset: offset * 50,
        order: "hot"
      });
      if (res.code === 200) {
        if (offset > 0) {
          setPlayList([...playList, ...(res.playlists || [])]);
        } else {
          setPlayList(res.playlists || []);
        }
        setHasMore(res.more || false);
      }
    } catch (e) {
      console.log(e);
    }
  };

  // 加载更多
  const onLoadMore = () => {
    getPlayList({ cat: curCategory, offset: offset + 1 });
  };

  useEffect(() => {
    const getList = async () => {
      try {
        const res = await getCategoryList();
        const { code, all, sub, categories = {} } = res || {};
        if (code === 200) {
          const tmpList = Object.entries(categories)?.map(([key, val]) => {
            const list = sub?.filter((item) => item.category === Number(key));
            console.log(list);
            return {
              code: key,
              name: val,
              list
            };
          });
          setCategoryList(tmpList);
        }
      } catch (e) {
        console.log(e);
      }
    };
    getList();
    getPlayList({ cat: initialCat, offset: 0 });
  }, []);

  return (
    <div className="category--wrapper">
      <CategoryTagList
        categoryList={categoryList}
        onTagClick={(cat) => {
          getPlayList({ cat, offset: 0 });
        }}
        curCategory={curCategory}
      />
      <h2 className="px-32 my-3 text-3xl flex">
        {curCategory}
        {curCategory !== initialCat && (
          <IconClose
            onClick={() => {
              getPlayList({ cat: initialCat, offset: 0 });
            }}
            className="ml-2 cursor-pointer hover:text-primary"
          />
        )}
      </h2>
      <PlayerList playList={playList} hasMore={hasMore} onLoadMore={onLoadMore} />
    </div>
  );
}

export default Category;
