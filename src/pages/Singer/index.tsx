import { SearchInfoType } from "@/types/singer";
import React, { useState } from "react";
import SingerCategory from "./components/SingerCategory";
import "./index.scss";

function Singer() {
  const [searchInfo, setSearchInfo] = useState<SearchInfoType>({
    initial: undefined,
    type: "-1",
    area: "-1"
  });
  const { initial, type, area } = searchInfo;
  return (
    <div className="singer--wrapper">
      <SingerCategory
        curAlpha={initial}
        curArea={area}
        curCategory={type}
        onTagClick={(obj) => {
          setSearchInfo({ ...searchInfo, ...obj });
        }}
      />
    </div>
  );
}

export default Singer;
