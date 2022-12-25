import { Image } from "@douyinfe/semi-ui";
import { memo } from "react";

interface IPlayerInfoProps {
  playId?: number;
  songName?: string;
  picUrl?: string;
  arNames?: string;
  alName?: string;
}

function PlayerInfo(props: IPlayerInfoProps) {
  const { playId, picUrl, songName, arNames, alName } = props;

  return (
    <div className="ml-8 mt-5 shrink-0 w-64">
      <Image width={200} height={200} src={`${picUrl}?param=224y224`} />
      <div className="text-center pt-2">
        {playId && (
          <>
            <p>歌曲名：{songName}</p>
            <p>歌手：{arNames}</p>
            <p>专辑：《{alName}》</p>
          </>
        )}
        {!playId && <p>请选择播放歌曲</p>}
      </div>
    </div>
  );
}

export default memo(PlayerInfo);
