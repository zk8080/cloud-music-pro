import SongListTable from "@/components/SongListTable";
import {
  IconHeartStroked,
  IconMute,
  IconPause,
  IconPlay,
  IconRestart,
  IconShareStroked,
  IconVolume1,
  IconVolume2
} from "@douyinfe/semi-icons";
import { Image, Modal, Slider, Toast, Tooltip } from "@douyinfe/semi-ui";
import { usePrevious, useToggle } from "ahooks";
import { useEffect, useMemo, useRef, useState } from "react";
import { formatPlayTime, shuffle } from "@/utils";
import { ModeType, SongItem } from "@/types/player";
import { getSongDetail, getSongUrl } from "@/http/api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useLocalStorageState } from "ahooks";
import ShuffleLogo from "@/assets/shuffle-line.svg";
import RepeatLogo from "@/assets/repeat-2-line.svg";
import RepeatOneLogo from "@/assets/repeat-one-line.svg";

const modeSrcMap = {
  0: {
    src: RepeatLogo,
    text: "列表循环"
  },
  1: {
    src: RepeatOneLogo,
    text: "单曲循环"
  },
  2: {
    src: ShuffleLogo,
    text: "随机播放"
  }
};

function Player() {
  const queryClient = useQueryClient();
  const [playing, { toggle: togglePlayer, setRight, setLeft }] = useToggle(); // 播放中
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playTime, setPlayTime] = useState<number>(0);
  const [playIdList, setPlayIdList] = useLocalStorageState<number[]>("cloud-music-pro-playerList");
  const [curPlayId, setCurPlayId] = useLocalStorageState<number>("cloud-music-pro-playerId");
  const [volume, setVolume] = useState<number>(100);
  const [duration, setDuration] = useState<number>(0);
  const [mode, setMode] = useState<ModeType>(0);
  const [playSongList, setPlaySongList] = useState<SongItem[]>([]); // 实际播放列表
  const preVolume = usePrevious(volume);

  const { data: songList, isLoading } = useQuery(
    ["playerSongDetail", playIdList],
    () => getSongDetail({ ids: playIdList?.join(",") }),
    {
      select(data) {
        return data.songs || [];
      },
      enabled: playIdList.length >= 0
    }
  );

  const songUrlMutation = useMutation(
    (id: string) => {
      return getSongUrl({ id });
    },
    {
      onSuccess: async (res) => {
        const { url, freeTrialInfo, time = 0 } = res.data?.[0] || {};
        setDuration(time / 1000);
        if (url) {
          audioRef.current!.src = url;
          setTimeout(() => {
            audioRef
              .current!.play()
              .then(() => {
                setRight();
              })
              .catch((e) => {
                if (e.name === "NotAllowedError") {
                  Modal.warning({
                    title: "提示",
                    content: "由于您的浏览器设置，音乐无法自动播放，请手动点击播放。",
                    onOk: () => {
                      audioRef.current!.play().then(() => {
                        setRight();
                      });
                    },
                    cancelButtonProps: {
                      theme: "solid"
                    },
                    closable: false
                  });
                }
              })
              .finally(() => {
                if (freeTrialInfo) {
                  Toast.info({
                    content: "版权原因，正在为你播放试听片段",
                    showClose: false
                  });
                }
              });
          });
        } else {
          Toast.error({
            content: "播放失败",
            showClose: false
          });
        }
      }
    }
  );

  const { curSong, curIdx } = useMemo(() => {
    const curIdx = playSongList?.findIndex((item) => item.id === curPlayId);
    if (typeof curIdx === "number" && playSongList) {
      return {
        curSong: playSongList[curIdx],
        curIdx
      };
    }
    return {};
  }, [playSongList, curPlayId]);

  const { name, al, ar } = curSong || {};
  const percent = useMemo(() => {
    return isNaN(playTime / duration) ? 0 : (Math.ceil(playTime) / Math.ceil(duration)) * 100;
  }, [playTime, duration]);

  // 播放音乐
  const handlePlayer = (id: number) => {
    setPlayTime(0);
    setLeft();
    songUrlMutation.mutate(String(id));
  };

  const handleError = () => {
    Toast.error({
      content: "播放出错",
      showClose: false
    });
  };

  // 单曲循环
  const handleLoop = () => {
    setPlayTime(0);
    audioRef.current!.play();
  };

  const handleAudioEnd = () => {
    if (mode === 1) {
      handleLoop();
    } else {
      setLeft();
      handleNext();
    }
  };

  // 上一首
  const handlePrev = () => {
    if (typeof curIdx === "number" && playSongList) {
      let tmpIdx = curIdx - 1;
      if (tmpIdx < 0) {
        tmpIdx = playSongList?.length - 1;
      }
      setCurPlayId(playSongList[tmpIdx].id!);
    }
  };

  // 下一首
  const handleNext = () => {
    if (typeof curIdx === "number" && playSongList) {
      let tmpIdx = curIdx + 1;
      if (tmpIdx === playSongList?.length) {
        tmpIdx = 0;
      }
      setCurPlayId(playSongList[tmpIdx].id!);
    }
  };

  // 更改播放模式
  const changeMode = () => {
    const newMode = ((mode + 1) % 3) as ModeType;
    if (newMode === 0) {
      //顺序模式
      setPlaySongList(songList || []);
    } else if (newMode === 1) {
      //单曲循环
      setPlaySongList([curSong!]);
    } else if (newMode === 2) {
      //随机播放
      const newList = shuffle(songList || []);
      setPlaySongList(newList || []);
    }
    setMode(newMode);
  };

  useEffect(() => {
    setPlaySongList(songList || []);
  }, [songList?.length]);

  useEffect(() => {
    playing ? audioRef.current!.play() : audioRef.current!.pause();
  }, [playing]);

  useEffect(() => {
    if (curPlayId && !isLoading) {
      handlePlayer(curPlayId);
    }
  }, [curPlayId, isLoading]);

  useEffect(() => {
    audioRef.current!.volume = volume / 100;
  }, [volume]);

  useEffect(() => {
    window.name = "ColudMusicProPlayer";
  }, []);

  return (
    <div className="w-heart--wrapper flex flex-col pb-24">
      <div className="flex-1 px-32 flex justify-between">
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
          tableLoading={isLoading}
          showDelete={true}
          onDeleteClick={async (obj) => {
            const newIdList = playIdList.filter((id) => id !== obj.id);
            // 查询失效，主动设置查询缓存数据
            await queryClient.invalidateQueries(["playerSongDetail"]);
            // 执行"乐观"更新
            queryClient.setQueryData(["playerSongDetail", newIdList], () => {
              return songList?.filter((item) => item.id !== obj.id);
            });
            setPlayIdList(newIdList);
            setCurPlayId(newIdList?.[0]);
          }}
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
            <span>{name}</span>
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
                const newTime = val * (duration / 100);
                setPlayTime(newTime);
                audioRef.current!.currentTime = newTime;
                if (!playing) {
                  togglePlayer();
                }
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
      <audio
        ref={audioRef}
        onTimeUpdate={(e) => {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          setPlayTime(e.target.currentTime);
        }}
        onEnded={handleAudioEnd}
        onError={handleError}
      ></audio>
    </div>
  );
}

export default Player;
