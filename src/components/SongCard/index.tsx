import { Card, Typography } from "@douyinfe/semi-ui";
import classNames from "classnames";
import CoverImage from "../CoverImage";

const { Title } = Typography;

interface ISongCardProps {
  coverImgUrl?: string;
  songName?: string;
  className?: string;
  textRender?: React.ReactNode;
}

function SongCard(props: ISongCardProps) {
  const { coverImgUrl, songName, className, textRender } = props;

  return (
    <Card
      className={classNames("w-56 dark:bg-zinc-800", className)}
      shadows="always"
      bordered={false}
      cover={<CoverImage src={`${coverImgUrl}?param=224y224`} />}
    >
      <Title heading={5} ellipsis={{ showTooltip: true }}>
        {songName}
      </Title>
      {textRender}
    </Card>
  );
}

export default SongCard;
