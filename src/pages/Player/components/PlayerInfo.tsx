import { LineItem } from "@/utils/lyric-parse";
import { Image } from "@douyinfe/semi-ui";
import classNames from "classnames";
import { memo, useEffect } from "react";

interface IPlayerInfoProps {
  playId?: number;
  songName?: string;
  picUrl?: string;
  arNames?: string;
  alName?: string;
  lyricList?: LineItem[];
  currentLineNum?: number;
  lyricLoading?: boolean;
}

function PlayerInfo(props: IPlayerInfoProps) {
  const { playId, picUrl, songName, arNames, alName, lyricList, currentLineNum } = props;

  useEffect(() => {
    const curLi = document.querySelector(`.lyric-container ul li:nth-child(${currentLineNum})`);
    if (curLi) {
      curLi.scrollIntoView({
        behavior: "smooth"
      });
    }
  }, [currentLineNum]);

  return (
    <div className="ml-8 mt-5 shrink-0 w-64 text-center">
      <Image width={200} height={200} src={`${picUrl}?param=224y224`} />
      <div className="text-center pt-2 overflow-hidden">
        {playId && (
          <>
            <p>歌曲名：{songName}</p>
            <p>歌手：{arNames}</p>
            <p>专辑：《{alName}》</p>
          </>
        )}
        {!!lyricList?.length && playId && (
          <div className="lyric-container mt-12 relative">
            <div className="overflow-y-auto h-56 no-scrollbar">
              <ul>
                {lyricList.map((v, index) => {
                  return (
                    <li
                      key={index}
                      className={classNames({
                        "text-primary": currentLineNum === index
                      })}
                    >
                      {v.txt}
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        )}
        {!playId && <p>请选择播放歌曲</p>}
      </div>
    </div>
  );
}

export default memo(PlayerInfo);
