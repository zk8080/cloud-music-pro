import { Card, Typography } from "@douyinfe/semi-ui";
import classNames from "classnames";
import CoverImage from "../CoverImage";

const { Title, Text } = Typography;

interface ISongCardProps {
  coverImgUrl?: string;
  songName?: string;
  className?: string;
  artistsName?: string;
}

function SongCard(props: ISongCardProps) {
  const { coverImgUrl, songName, className, artistsName } = props;
  return (
    <Card
      className={classNames("w-56", className)}
      shadows="always"
      bordered={false}
      cover={<CoverImage src={`${coverImgUrl}?param=224y224`} />}
    >
      <Title heading={5} ellipsis={{ showTooltip: true }}>
        {songName}
      </Title>
      {artistsName && <Text>{artistsName}</Text>}
    </Card>
  );
}

export default SongCard;
