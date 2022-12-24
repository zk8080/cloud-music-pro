import { Button, Empty, Skeleton, Tag, Typography } from "@douyinfe/semi-ui";
import { IconHeartStroked, IconShareStroked } from "@douyinfe/semi-icons";
import { useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import { getPlaylistTrackList, getSongListDetail } from "@/http/api";
import { IllustrationNoResult, IllustrationNoResultDark } from "@douyinfe/semi-illustrations";
import SongListTable from "@/components/SongListTable";
import { Song } from "@/types/home";
import { handlePlayer } from "@/utils";

const { Title, Paragraph } = Typography;

function SongList() {
  const { id } = useParams();
  const navigate = useNavigate();
  const {
    data: detailData,
    isLoading,
    isError
  } = useQuery(["songDetail", id], () => getSongListDetail({ id }), {
    select(data) {
      if (data.code === 200) return data.playlist || {};
    }
  });

  const { name, coverImgUrl, tags, description } = detailData || {};

  const { data: listData, isLoading: listLoading } = useQuery(
    ["songList", id],
    () => getPlaylistTrackList({ id: parseInt(id!) }),
    {
      select(data) {
        if (data.code === 200) return data.songs;
      }
    }
  );

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
            <img src={`${coverImgUrl}?param=224y224`} className="w-full h-full rounded-md" alt="" />
          </div>
          <div className="flex flex-col">
            <Title heading={2}>{name}</Title>
            <Paragraph
              ellipsis={{
                rows: 4,
                expandable: true,
                collapsible: true
              }}
              className="mt-4"
            >
              {description}
            </Paragraph>
            <div className="mt-4 mb-4">
              {tags?.map((item) => (
                <Tag size="large" color="red" className="mr-3" key={item}>
                  #{item}
                </Tag>
              ))}
            </div>
            <div className="mt-auto">
              <Button
                type="primary"
                theme="solid"
                size="large"
                className="mr-4"
                onClick={() => handlePlayer(listData?.map((item) => item.id!) || [])}
              >
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
      <SongListTable<Song>
        tableLoading={listLoading}
        dataSource={listData}
        onPlayClick={(item) => handlePlayer(item.id!)}
      />
    </div>
  );
}

export default SongList;
