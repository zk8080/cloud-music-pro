import SingerFilter from "@/components/SingerFilter";
import { alphaTypes, areaTypes, categoryTypes } from "@/constants/singer";
import { SearchInfoType } from "@/types/singer";

interface ISingerCategoryProps {
  onTagClick?: (obj?: SearchInfoType) => void;
  curAlpha?: string;
  curCategory?: string;
  curArea?: string;
}

function SingerCategory(props: ISingerCategoryProps) {
  const { curAlpha, onTagClick, curCategory, curArea } = props;
  return (
    <div className="px-32  flex flex-col mt-6 justify-between">
      <SingerFilter
        filterList={alphaTypes}
        curTag={curAlpha}
        onTagClick={(key) => {
          onTagClick?.({ initial: key });
        }}
      />
      <SingerFilter
        filterList={categoryTypes}
        curTag={curCategory}
        onTagClick={(key) => {
          onTagClick?.({ type: key });
        }}
      />
      <SingerFilter
        filterList={areaTypes}
        curTag={curArea}
        onTagClick={(key) => {
          onTagClick?.({ area: key });
        }}
      />
    </div>
  );
}

export default SingerCategory;
