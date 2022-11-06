import { Typography } from "@douyinfe/semi-ui";
import classNames from "classnames";

const { Text } = Typography;

interface ISingerFilterProps {
  filterList?: { key?: string; name?: string }[];
  curTag?: string;
  onTagClick?: (key?: string) => void;
}

function SingerFilter(props: ISingerFilterProps) {
  const { filterList, curTag, onTagClick } = props;
  return (
    <ul className="flex flex-wrap mb-4">
      {filterList?.map((filterItem) => {
        const { name, key } = filterItem;
        return (
          <li
            key={key || name}
            className={classNames(
              "group text-center rounded-2xl px-3 py-1 mr-2 cursor-pointer hover:text-white text-sm hover:bg-primary active:bg-primary",
              {
                active: curTag === key
              }
            )}
            onClick={() => {
              onTagClick?.(key);
            }}
          >
            <Text ellipsis={true} className="group-hover:text-white">
              {name}
            </Text>
          </li>
        );
      })}
    </ul>
  );
}

export default SingerFilter;
