import ShuffleLogo from "@/assets/shuffle-line.svg";
import RepeatLogo from "@/assets/repeat-2-line.svg";
import RepeatOneLogo from "@/assets/repeat-one-line.svg";

export const modeSrcMap = {
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

export const initialVal = {
  curSong: undefined,
  curIdx: -1
};
