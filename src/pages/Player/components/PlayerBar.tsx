import { modeSrcMap } from "@/constants/player";
import { ModeType } from "@/types/player";
import { formatPlayTime } from "@/utils";
import {
  IconRestart,
  IconPause,
  IconPlay,
  IconHeartStroked,
  IconShareStroked,
  IconMute,
  IconVolume1,
  IconVolume2
} from "@douyinfe/semi-icons";
import { Slider, Tooltip } from "@douyinfe/semi-ui";
import { memo } from "react";

interface IPlayerBarProps {
  playId?: number;
  playing?: boolean;
  duration: number;
  songName?: string;
  playTime?: number;
  percent?: number;
  mode: ModeType;
  volume: number;
  setVolume: (volume: number) => void;
  preVolume?: number;
  changeMode: () => void;
  handlePrev: () => void;
  handleNext: () => void;
  togglePlayer: () => void;
  changePercent: (val: number) => void;
}

function PlayerBar(props: IPlayerBarProps) {
  const {
    playId,
    playing,
    duration,
    songName,
    playTime = 0,
    percent,
    mode,
    volume,
    setVolume,
    preVolume,
    changeMode,
    handlePrev,
    handleNext,
    togglePlayer,
    changePercent
  } = props;
  return (
    <div className="fixed bottom-0 z-50 w-full backdrop-blur px-32 h-20 flex items-center" key={playId}>
      <div className="flex items-center cursor-pointer">
        <IconRestart className="text-2xl" onClick={handlePrev} />
        {playing ? (
          <IconPause className="text-3xl mx-5" onClick={togglePlayer} />
        ) : (
          <IconPlay className="text-3xl mx-5" onClick={togglePlayer} />
        )}
        <IconRestart className="text-2xl rotate-180" onClick={handleNext} />
      </div>
      <div className="flex flex-col w-2/3 mx-3">
        <div className="flex justify-between mb-2 mx-3">
          <span>{songName}</span>
          {duration && (
            <span>
              {formatPlayTime(playTime)} / {formatPlayTime(duration)}
            </span>
          )}
        </div>
        <Slider
          value={percent}
          onChange={(val) => {
            if (typeof val == "number") {
              changePercent(val);
            }
          }}
          tooltipVisible={false}
        />
      </div>
      <div className="flex items-center">
        <Tooltip content={modeSrcMap[mode].text}>
          <img src={modeSrcMap[mode].src} alt="" className="cursor-pointer" onClick={changeMode} />
        </Tooltip>
        <IconHeartStroked className="text-2xl mx-3" />
        <IconShareStroked className="text-2xl" />
      </div>
      <div className="flex items-center cursor-pointer">
        {volume === 0 && <IconMute className="text-2xl ml-3 mr-2" onClick={() => setVolume(preVolume!)} />}
        {volume > 0 && volume <= 50 && <IconVolume1 className="text-2xl ml-3 mr-2" onClick={() => setVolume(0)} />}
        {volume > 50 && <IconVolume2 className="text-2xl ml-3 mr-2" onClick={() => setVolume(0)} />}
        <div className="w-24">
          <Slider value={volume} onChange={(val) => setVolume(val as number)} />
        </div>
      </div>
    </div>
  );
}

export default memo(PlayerBar);
