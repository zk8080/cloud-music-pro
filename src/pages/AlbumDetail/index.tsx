import { Button, Empty, Skeleton, Typography } from "@douyinfe/semi-ui";
import { IconHeartStroked, IconShareStroked } from "@douyinfe/semi-icons";
import { useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import { getAlbumDetail } from "@/http/api";
import { IllustrationNoResult, IllustrationNoResultDark } from "@douyinfe/semi-illustrations";
import SongListTable from "@/components/SongListTable";
import { format } from "date-fns";

const { Title, Paragraph } = Typography;

function AlbumDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data, isLoading, isError } = useQuery(["albumDetail", id], () => getAlbumDetail({ id }));

  const { album, songs = [] } = data || {};

  const { description = "", artist, name, picUrl, publishTime } = album || {};

  const { name: artistName, id: artistId } = artist || {};

  if (isError) {
    return (
      <Empty
        image={<IllustrationNoResult />}
        darkModeImage={<IllustrationNoResultDark />}
        description={"没有找到相关歌单"}
        className="p-8"
      >
        <Button theme="solid" type="primary" onClick={() => navigate(-1)}>
          返回上一页
        </Button>
      </Empty>
    );
  }
  return (
    <div className="flex flex-col w-heart--wrapper px-32">
      <Skeleton
        placeholder={
          <div className="flex py-6">
            <div className="w-64 h-64 shrink-0 mr-8">
              <Skeleton.Image className="w-full h-full" />
            </div>
            <div className="flex-1 flex flex-col">
              <Skeleton.Title className="mb-2" />
              <Skeleton.Paragraph rows={3} />
              <Skeleton.Button className="mt-auto" />
            </div>
          </div>
        }
        loading={isLoading}
        active
      >
        <div className="flex py-6">
          <div className="w-64 h-64 shrink-0 mr-8">
            <img src={`${picUrl}?param=224y224`} className="w-full h-full" alt="" />
          </div>
          <div className="flex flex-col">
            <Title heading={2}>{name}</Title>
            <div className="my-3 text-lg">
              <a className="cursor-pointer hover:text-primary" onClick={() => navigate(`/singerDetail/${artistId}`)}>
                {artistName}
              </a>
              {publishTime && <span className="ml-4">{format(publishTime, "yyyy-MM-dd")}发布</span>}
            </div>
            {description && (
              <Paragraph
                ellipsis={{
                  rows: 4,
                  expandable: true,
                  collapsible: true
                }}
                className="mb-4"
              >
                {description}
              </Paragraph>
            )}

            <div className="mt-auto">
              <Button type="primary" theme="solid" size="large" className="mr-4">
                播放全部
              </Button>
              <Button type="tertiary" theme="solid" size="large" icon={<IconHeartStroked />} className="mr-4">
                收藏
              </Button>
              <Button type="tertiary" theme="solid" icon={<IconShareStroked />} size="large">
                分享
              </Button>
            </div>
          </div>
        </div>
      </Skeleton>

      <Title heading={3}>全部歌曲</Title>
      <SongListTable tableLoading={isLoading} dataSource={songs} />
    </div>
  );
}

export default AlbumDetail;
