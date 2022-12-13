import SongListTable from "@/components/SongListTable";
import {
  IconHeartStroked,
  IconPause,
  IconPlay,
  IconRestart,
  IconShareStroked,
  IconSync,
  IconVolume2
} from "@douyinfe/semi-icons";
import { Image, Slider } from "@douyinfe/semi-ui";
import { useToggle } from "ahooks";
import { useEffect, useMemo, useRef, useState } from "react";
import { formatPlayTime } from "@/utils";
import { SongItem } from "@/types/player";
import { getSongDetail } from "@/http/api";
import { useQuery } from "@tanstack/react-query";
import { useLocalStorageState } from "ahooks";

function Player() {
  const [playing, { toggle: togglePlayer, setRight }] = useToggle(); // 播放中
  const audioRef = useRef<HTMLAudioElement>(null);
  const [songReady, setSongReady] = useState(true); // 歌曲缓存完成
  const [playTime, setPlayTime] = useState<number>(0);
  const [playIdList] = useLocalStorageState<number[]>("cloud-music-pro-playerList");
  const [curPlayId, setCurPlayId] = useLocalStorageState<number>("cloud-music-pro-playerId");

  const { data: songList, isLoading } = useQuery(
    ["playerSongDetail", playIdList],
    () => getSongDetail({ ids: playIdList?.join(",") }),
    {
      select(data) {
        if (data.code === 200) return data.songs || [];
      },
      enabled: playIdList.length >= 0
    }
  );

  const curSong = useMemo(() => songList?.find((item) => item.id === curPlayId), [songList, curPlayId]);

  const { dt = 0, name, al, ar } = curSong || {};
  const percent = useMemo(() => {
    const duration = dt / 1000;
    return isNaN(playTime / duration) ? 0 : (Math.ceil(playTime) / Math.ceil(duration)) * 100;
  }, [playTime, dt]);

  const handleError = () => {
    setSongReady(true);
  };

  useEffect(() => {
    playing ? audioRef.current!.play() : audioRef.current!.pause();
  }, [playing]);

  useEffect(() => {
    if (curPlayId) {
      const songUrl = `https://music.163.com/song/media/outer/url?id=${curPlayId}.mp3`;
      audioRef.current!.src = songUrl;
      setTimeout(() => {
        audioRef.current!.play().then(() => {
          // 歌曲开始播放后将标识设置为true
          setSongReady(true);
          setRight();
        });
      });
    }
  }, [curPlayId]);

  useEffect(() => {
    window.name = "ColudMusicProPlayer";
  }, []);

  return (
    <div className="w-heart--wrapper flex flex-col pb-24">
      <div className="flex-1 px-32 flex">
        <SongListTable<SongItem>
          dataSource={songList}
          scroll={{ y: document.body.clientHeight - 240 }}
          onPlayClick={(item) => {
            if (curPlayId === item.id) {
              togglePlayer();
            } else {
              setCurPlayId(item.id!);
            }
          }}
          curPlayId={curPlayId}
          playing={playing}
          onPauseClick={togglePlayer}
          loading={isLoading}
        />
        <div className="ml-8 mt-5 shrink-0">
          <Image width={200} height={200} src={`${al?.picUrl}?param=224y224`} />
          <div className="text-center pt-2">
            <p>歌曲名：{name}</p>
            <p>歌手：{ar?.map((item) => item.name).join("/")}</p>
            <p>专辑：《{al?.name}》</p>
          </div>
        </div>
      </div>
      <div className="fixed bottom-0 z-50 w-full backdrop-blur px-32 h-20 flex items-center">
        <div className="flex items-center cursor-pointer">
          <IconRestart className="text-2xl" />
          {playing ? (
            <IconPause className="text-3xl mx-5" onClick={togglePlayer} />
          ) : (
            <IconPlay className="text-3xl mx-5" onClick={togglePlayer} />
          )}
          <IconRestart className="text-2xl rotate-180" />
        </div>
        <div className="flex flex-col w-2/3 mx-3">
          <div className="flex justify-between mb-2 mx-3">
            <span>歌曲名称</span>
            {dt && (
              <span>
                {formatPlayTime(playTime)} / {formatPlayTime(dt / 1000)}
              </span>
            )}
          </div>
          <Slider
            value={percent}
            onChange={(val) => {
              if (typeof val == "number") {
                const newTime = val * (dt / 1000 / 100);
                setPlayTime(newTime);
                audioRef.current!.currentTime = newTime;
                if (!playing) {
                  togglePlayer();
                }
              }
            }}
          />
        </div>
        <div className="flex items-center">
          <IconSync className="text-2xl" />
          <IconHeartStroked className="text-2xl mx-3" />
          <IconShareStroked className="text-2xl" />
        </div>
        <div className="flex items-center">
          <IconVolume2 className="text-2xl ml-3 mr-2" />
          {/* <div className="h-1 bg-black dark:bg-white w-20"></div> */}
          <div className="w-24">
            <Slider></Slider>
          </div>
        </div>
      </div>
      <audio
        ref={audioRef}
        onTimeUpdate={(e) => {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          setPlayTime(e.target.currentTime);
        }}
        // onEnded={handleAudioEnd}
        onError={handleError}
      ></audio>
    </div>
  );
}

export default Player;
