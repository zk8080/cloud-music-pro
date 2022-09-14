import { IconPlayCircle } from "@douyinfe/semi-icons";
import { ImgHTMLAttributes } from "react";

type IImageProps = ImgHTMLAttributes<HTMLImageElement>;

function Image(props: IImageProps) {
  return (
    <div className="group w-full h-full relative overflow-hidden">
      <IconPlayCircle
        className="absolute z-10 text-white left-1/2 top-1/2 opacity-0 text-4xl m-[-18px] group-hover:opacity-100 group-hover:scale-150 transition duration-500 ease-in-out"
        size="inherit"
      />
      <img className="w-full h-full group-hover:scale-125 transition duration-200 ease-in-out" {...props} />
    </div>
  );
}

export default Image;
