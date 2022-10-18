import { CategoryMapList } from "@/types/category";
import { IconCommand, IconComponent, IconGlobeStroke, IconLayers, IconLikeHeart } from "@douyinfe/semi-icons";
import { Typography } from "@douyinfe/semi-ui";
import classNames from "classnames";
import { memo } from "react";

const { Text } = Typography;

interface ICategoryTagListProps {
  categoryList: CategoryMapList[];
  onTagClick?: (str: string) => void;
  curCategory?: string;
}

const IconMap = {
  "0": <IconGlobeStroke />,
  "1": <IconComponent />,
  "2": <IconLayers />,
  "3": <IconLikeHeart />,
  "4": <IconCommand />
};

function CategoryTagList(props: ICategoryTagListProps) {
  const { categoryList, curCategory, onTagClick } = props;

  return (
    <div className="w-heart--wrapper px-32 flex flex-col mt-6 justify-between">
      {categoryList?.map((item) => {
        const { code, name, list } = item;
        return (
          <div className="flex mb-2" key={code}>
            <div className="flex items-baseline mr-3 shrink-0">
              {IconMap[code as keyof typeof IconMap]}
              <span className="mx-2">{name}</span>
            </div>
            <ul className="flex flex-wrap">
              {list?.map((category, idx) => {
                const { name } = category;
                return (
                  <li
                    key={idx}
                    className={classNames(
                      "group text-center rounded-2xl py-1 px-5 cursor-pointer hover:text-white mr-3 mb-3 text-sm hover:bg-primary active:bg-primary",
                      {
                        active: curCategory === name
                      }
                    )}
                    onClick={() => {
                      if (curCategory === name) {
                        onTagClick?.("全部");
                      } else {
                        onTagClick?.(name!);
                      }
                    }}
                  >
                    <Text ellipsis={true} className="group-hover:text-white">
                      {name}
                    </Text>
                  </li>
                );
              })}
            </ul>
          </div>
        );
      })}
    </div>
  );
}

export default memo(CategoryTagList);
