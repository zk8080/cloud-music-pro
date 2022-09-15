import { getCategoryList } from "@/http/api";
import { CategoryMapList } from "@/types/category";
import React, { useEffect, useState } from "react";
import CategoryTagList from "./components/CategoryTagList";
import "./index.scss";

function Category() {
  const [categoryList, setCategoryList] = useState<CategoryMapList[]>([]);
  const [curCategory, setCurCategory] = useState<string>("全部");

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
  }, []);
  return (
    <div className="category--wrapper">
      <CategoryTagList categoryList={categoryList} onTagClick={setCurCategory} curCategory={curCategory} />
    </div>
  );
}

export default Category;
