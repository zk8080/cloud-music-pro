import SongListTable from "@/components/SongListTable";

import { Modal, Toast } from "@douyinfe/semi-ui";
import { usePrevious, useToggle } from "ahooks";
import { useEffect, useMemo, useRef, useState } from "react";
import { shuffle } from "@/utils";
import { ModeType, SongItem } from "@/types/player";
import { getSongDetail, getSongUrl } from "@/http/api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useLocalStorageState } from "ahooks";
import PlayerInfo from "./components/PlayerInfo";
import PlayerBar from "./components/PlayerBar";
import { initialVal } from "@/constants/player";

function Player() {
  const queryClient = useQueryClient();
  const [playing, { toggle: togglePlayer, setRight, setLeft }] = useToggle(); // 播放中
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playTime, setPlayTime] = useState<number>(0);
  const [playIdList, setPlayIdList] = useLocalStorageState<number[]>("cloud-music-pro-playerList", {
    defaultValue: []
  });
  const [curPlayId, setCurPlayId] = useLocalStorageState<number>("cloud-music-pro-playerId");
  const [volume, setVolume] = useState<number>(100);
  const [duration, setDuration] = useState<number>(0);
  const [mode, setMode] = useState<ModeType>(0);
  const [songList, setSongList] = useState<SongItem[]>([]); // 全量播放列表
  const [playSongList, setPlaySongList] = useState<SongItem[]>([]); // 实际播放列表
  const preVolume = usePrevious(volume);

  const { isLoading } = useQuery(
    ["playerSongDetail", playIdList],
    () => getSongDetail({ ids: playIdList?.join(",") }),
    {
      select(data) {
        return data.songs || [];
      },
      onSuccess(data) {
        setSongList(data);
        handlePlaySongListByMode(mode, data);
      },
      enabled: playIdList?.length > 0
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
    return initialVal;
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

  // 根据播放模式 设置播放列表
  const handlePlaySongListByMode = (modeType: ModeType, list: SongItem[]) => {
    if (modeType === 0) {
      //顺序模式
      setPlaySongList(list || []);
    } else if (modeType === 1) {
      //单曲循环
      setPlaySongList([curSong!]);
    } else if (modeType === 2) {
      //随机播放
      const newList = shuffle(list || []);
      setPlaySongList(newList || []);
    }
  };

  // 更改播放模式
  const changeMode = () => {
    const newMode = ((mode + 1) % 3) as ModeType;
    setMode(newMode);
    handlePlaySongListByMode(newMode, songList);
  };

  useEffect(() => {
    playing ? audioRef.current!.play() : audioRef.current!.pause();
  }, [playing]);

  useEffect(() => {
    if (curPlayId) {
      handlePlayer(curPlayId);
    }
  }, [curPlayId]);

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
          tableLoading={isLoading && playIdList.length > 0}
          showDelete={true}
          onDeleteClick={async (obj) => {
            const newIdList = playIdList.filter((id) => id !== obj.id);
            setPlayIdList(newIdList);
            const newSongList = songList?.filter((item) => item.id !== obj.id);
            // 取消查询，主动更新歌曲数据
            await queryClient.cancelQueries(["playerSongDetail"]);
            // 执行"乐观"更新
            queryClient.setQueryData(["playerSongDetail", newIdList], () => {
              return newSongList;
            });
            setSongList(newSongList);
            if (curPlayId === obj.id) {
              setLeft();
              setCurPlayId(newIdList?.[0]);
            }
          }}
        />
        <PlayerInfo
          key={String(curPlayId)}
          playId={curPlayId}
          arNames={ar?.map((item) => item.name).join("/")}
          alName={al?.name}
          songName={name}
          picUrl={al?.picUrl}
        />
      </div>
      {curPlayId && (
        <PlayerBar
          key={curPlayId}
          playId={curPlayId}
          togglePlayer={togglePlayer}
          changeMode={changeMode}
          handleNext={handleNext}
          handlePrev={handlePrev}
          mode={mode}
          playTime={playTime}
          percent={percent}
          volume={volume}
          setVolume={setVolume}
          preVolume={preVolume}
          duration={duration}
          songName={name}
          playing={playing}
          changePercent={(val) => {
            const newTime = val * (duration / 100);
            setPlayTime(newTime);
            audioRef.current!.currentTime = newTime;
            if (!playing) {
              togglePlayer();
            }
          }}
        />
      )}
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
