// 解析 [00:01.997] 这一类时间戳的正则表达式
const timeExp = /\[(\d{2,}):(\d{2})(?:\.(\d{2,3}))?]/g;

const STATE_PAUSE = 0;
const STATE_PLAYING = 1;

export interface LineItem {
  time: number;
  txt: string;
}

export type HandlerFun = (obj: { txt: string; lineNum: number }) => void;

export default class Lyric {
  lrc: string;
  lines: LineItem[];
  handler: HandlerFun;
  state: number;
  curLineIndex: number;
  startStamp: number;
  timer?: number = 0;

  constructor(lrc: string, handler: HandlerFun) {
    this.lrc = lrc; // 要解析的歌词
    this.lines = []; // 解析后的歌词数组，每一项包涵对应的歌词和时间
    this.handler = handler; // 回调函数
    this.state = STATE_PAUSE; // 播放状态
    this.curLineIndex = 0; // 当前播放歌词所在的行数
    this.startStamp = 0; // 歌曲开始的时间戳

    // 执行解析函数
    this.__initLines();
  }

  __initLines() {
    // 解析代码
    const linesArr = this.lrc.split("\n");
    for (let i = 0; i < linesArr.length; i++) {
      const line = linesArr[i]; // 如 "[00:01.997] 作词：薛之谦"
      const result: any = timeExp.exec(line); // 校验每一项是否有时间戳
      if (!result) return;
      const txt = line.replace(timeExp, "").trim(); // 去除时间戳 获取歌词部分
      if (txt) {
        if (result[3].length === 3) {
          result[3] = result[3] / 10; // [00:01.997] 中匹配到的 997 就会被切成 99
        }
        this.lines.push({
          time: result[1] * 60 * 1000 + result[2] * 1000 + (result[3] || 0) * 10, // 转化具体到毫秒的时间，result[3] * 10 可理解为 (result / 100) * 1000
          txt
        });
      }
    }
    this.lines.sort((a, b) => {
      return a.time - b.time; // 根据时间排序
    });
  }

  // 播放方法
  play(offset = 0, isSeek = false) {
    if (!this.lines.length) {
      return;
    }
    this.state = STATE_PLAYING;
    // 找到当前所在的行
    this.curLineIndex = this._findcurLineIndex(offset);
    // 现在正处于第 this.curLineIndex-1 行
    // 立即定位，方式是调用传来的回调函数，并把当前歌词信息传给它
    this._callHandler(this.curLineIndex - 1);
    // 根据时间进度判断歌曲开始的时间戳
    this.startStamp = +new Date() - offset;
    if (this.curLineIndex < this.lines.length) {
      clearTimeout(this.timer);
      // 继续播放
      this._playRest(isSeek);
    }
  }

  _findcurLineIndex(time: number) {
    for (let i = 0; i < this.lines.length; i++) {
      if (time <= this.lines[i].time) {
        return i;
      }
    }
    return this.lines.length - 1;
  }

  _callHandler(i: number) {
    if (i < 0) {
      return;
    }
    this.handler({
      txt: this.lines[i].txt,
      lineNum: i
    });
  }

  //isSeek 标志位表示用户是否手动调整进度
  _playRest(isSeek = false) {
    const line = this.lines[this.curLineIndex];
    let delay;
    if (isSeek) {
      delay = line.time - (+new Date() - this.startStamp);
    } else {
      // 拿到上一行的歌词开始时间，算间隔
      const preTime = this.lines[this.curLineIndex - 1] ? this.lines[this.curLineIndex - 1].time : 0;
      delay = line.time - preTime;
    }
    this.timer = setTimeout(() => {
      this._callHandler(this.curLineIndex++);
      if (this.curLineIndex < this.lines.length && this.state === STATE_PLAYING) {
        this._playRest();
      }
    }, delay);
  }

  // 状态切换
  togglePlay(offset: number) {
    if (this.state === STATE_PLAYING) {
      this.stop();
    } else {
      this.state = STATE_PLAYING;
      this.play(offset, true);
    }
  }

  stop() {
    this.state = STATE_PAUSE;
    clearTimeout(this.timer);
  }

  // 手动调整进度
  seek(offset: number) {
    this.play(offset, true);
  }
}
