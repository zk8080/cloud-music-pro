import { Card, Typography } from "@douyinfe/semi-ui";
import classNames from "classnames";
import { useNavigate } from "react-router-dom";
import CoverImage from "../CoverImage";

const { Title, Text } = Typography;

interface ISongCardProps {
  coverImgUrl?: string;
  songName?: string;
  className?: string;
  artistsName?: string;
  artistsId?: number;
}

function SongCard(props: ISongCardProps) {
  const { coverImgUrl, songName, className, artistsName, artistsId } = props;

  const navigate = useNavigate();

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
      {artistsId && (
        <Text className="hover:text-primary cursor-pointer" onClick={() => navigate(`/singerDetail/${artistsId}`)}>
          {artistsName}
        </Text>
      )}
    </Card>
  );
}

export default SongCard;
