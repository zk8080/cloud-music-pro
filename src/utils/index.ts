// 切割数组
export function chunk<T>(array: T[], size = 1) {
  const length = array == null ? 0 : array.length;
  if (!length || size < 1) {
    return [];
  }
  let index = 0;
  let resIndex = 0;
  const result: T[][] = new Array(Math.ceil(length / size));

  while (index < length) {
    result[resIndex++] = array.slice(index, (index += size));
  }
  return result;
}

//转换歌曲播放时间
export const formatPlayTime = (interval: number) => {
  interval = interval | 0;
  const minute = (interval / 60) | 0;
  const second = (interval % 60).toString().padStart(2, "0");
  return `${minute}:${second}`;
};

// 播放歌曲公共方法
export const handlePlayer = (ids: number | number[]) => {
  const curDetailPlayerIds: number[] = JSON.parse(localStorage.getItem("cloud-music-pro-playerList") || "[]");
  // 播放单首歌曲
  if (typeof ids === "number") {
    // 播放列表不存在该歌曲
    if (!curDetailPlayerIds?.includes(ids)) {
      curDetailPlayerIds.unshift(ids);
      localStorage.setItem("cloud-music-pro-playerList", JSON.stringify(curDetailPlayerIds));
    }
    localStorage.setItem("cloud-music-pro-playerId", String(ids));
  } else {
    if (ids?.length <= 0) return;
    // 播放整个歌单
    localStorage.setItem("cloud-music-pro-playerList", JSON.stringify(ids));
    localStorage.setItem("cloud-music-pro-playerId", String(ids[0]));
  }
  window.open("/player", "ColudMusicProPlayer");
};
