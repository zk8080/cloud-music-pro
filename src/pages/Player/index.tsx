import {
  IconHeartStroked,
  IconPause,
  IconPlay,
  IconRestart,
  IconShareStroked,
  IconSync,
  IconVolume2
} from "@douyinfe/semi-icons";
import { useToggle } from "ahooks";

function Player() {
  const [playFlag, { toggle: togglePlayer }] = useToggle();

  return (
    <div className="w-heart--wrapper flex flex-col">
      <div className="flex-1 px-32">播放内容</div>
      <div className="fixed bottom-0 z-50 w-full backdrop-blur px-32 h-20 flex items-center">
        <div className="flex items-center cursor-pointer">
          <IconRestart className="text-2xl" />
          {playFlag ? (
            <IconPause className="text-3xl mx-5" onClick={togglePlayer} />
          ) : (
            <IconPlay className="text-3xl mx-5" onClick={togglePlayer} />
          )}
          <IconRestart className="text-2xl rotate-180" />
        </div>
        <div className="flex flex-col w-2/3 mx-6">
          <div className="flex justify-between mb-2">
            <span>歌曲名称</span>
            <span>01:50 / 04:30</span>
          </div>
          <div className="h-1 bg-black dark:bg-white"></div>
        </div>
        <div className="flex items-center">
          <IconSync className="text-2xl" />
          <IconHeartStroked className="text-2xl mx-3" />
          <IconShareStroked className="text-2xl" />
        </div>
        <div className="flex items-center">
          <IconVolume2 className="text-2xl mx-3" />
          <div className="h-1 bg-black dark:bg-white w-20"></div>
        </div>
      </div>
    </div>
  );
}

export default Player;
