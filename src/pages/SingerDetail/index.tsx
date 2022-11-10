import SongListTable from "@/components/SongListTable";
import { getSingerDetail } from "@/http/api";
import { IconHeartStroked, IconShareStroked } from "@douyinfe/semi-icons";
import { Skeleton, Button, Typography, TabPane, Tabs, Empty } from "@douyinfe/semi-ui";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { IllustrationNoResult, IllustrationNoResultDark } from "@douyinfe/semi-illustrations";
import SingerAlbum from "./components/SingerAlbum";
import RelatedMV from "./components/RelatedMV";

const { Title, Paragraph } = Typography;

function SingerDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data: detailData, isLoading, isError } = useQuery(["singerDetail", id], () => getSingerDetail({ id }));

  const { artist, hotSongs } = detailData || {};

  const { picUrl, name, albumSize, briefDesc, mvSize } = artist || {};

  if (isError) {
    return (
      <Empty
        image={<IllustrationNoResult />}
        darkModeImage={<IllustrationNoResultDark />}
        description={"没有找到歌手信息"}
        className="p-8"
      >
        <Button theme="solid" type="primary" onClick={() => navigate(-1)}>
          返回上一页
        </Button>
      </Empty>
    );
  }

  return (
    <div className="flex flex-col w-heart--wrappe px-32">
      <Skeleton
        placeholder={
          <div className="flex py-6">
            <div className="w-44 h-44 rounded-full shrink-0 mr-8 overflow-hidden">
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
          <div className="group w-44 h-44 rounded-full mr-8 cursor-pointer overflow-hidden shrink-0">
            <img
              className="rounded-full w-full h-full group-hover:scale-125 transition duration-500 ease-in-out"
              src={`${picUrl}?param=160y160`}
              alt=""
            />
          </div>
          <div className="flex flex-col">
            <Title heading={2}>{name}</Title>
            {briefDesc && (
              <Paragraph
                ellipsis={{
                  rows: 4,
                  expandable: true,
                  collapsible: true
                }}
                className="my-4"
              >
                {briefDesc}
              </Paragraph>
            )}
            <div className="mt-auto">
              <Button type="primary" theme="solid" size="large" className="mr-4">
                播放热门歌曲
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
      <Tabs type="button" lazyRender={true}>
        <TabPane tab={`热门歌曲${hotSongs?.length || 0}`} itemKey="1" className="overflow-visible">
          <SongListTable tableLoading={isLoading} dataSource={hotSongs} />
        </TabPane>
        <TabPane tab={`所有专辑${albumSize || 0}`} itemKey="2" className="overflow-visible">
          <SingerAlbum />
        </TabPane>
        <TabPane tab={`相关MV${mvSize || 0}`} itemKey="3" className="overflow-visible">
          <RelatedMV />
        </TabPane>
      </Tabs>
    </div>
  );
}

export default SingerDetail;
