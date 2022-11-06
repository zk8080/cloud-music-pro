import SongListTable from "@/components/SongListTable";
import { getSingerDetail } from "@/http/api";
import { IconHeartStroked, IconShareStroked } from "@douyinfe/semi-icons";
import { Skeleton, Button, Typography, TabPane, Tabs, Empty } from "@douyinfe/semi-ui";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { IllustrationNoResult, IllustrationNoResultDark } from "@douyinfe/semi-illustrations";

const { Title } = Typography;

function SingerDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: detailData, isLoading, isError } = useQuery(["songDetail", id], () => getSingerDetail({ id }));

  const { artist, hotSongs } = detailData || {};

  const { picUrl, name } = artist || {};

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
              {/* <Skeleton.Paragraph rows={3} /> */}
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
            {/* <Paragraph
              ellipsis={{
                rows: 4,
                expandable: true,
                collapsible: true
              }}
              className="mt-4"
            >
              {"描述123"}
            </Paragraph> */}
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
      <Tabs type="button">
        <TabPane tab="热门歌曲" itemKey="1">
          <SongListTable tableLoading={isLoading} dataSource={hotSongs} />
        </TabPane>
        <TabPane tab="所有专辑" itemKey="2">
          🚧 WIP
        </TabPane>
        <TabPane tab="相关MV" itemKey="3">
          🚧 WIP
        </TabPane>
      </Tabs>
    </div>
  );
}

export default SingerDetail;
