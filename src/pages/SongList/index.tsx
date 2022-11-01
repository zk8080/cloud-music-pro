import { Button, Empty, Skeleton, Table, Tag, Typography } from "@douyinfe/semi-ui";
import { IconLikeHeart, IconExternalOpen } from "@douyinfe/semi-icons";
import { ColumnProps } from "@douyinfe/semi-ui/lib/es/table";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getPlaylistTrackList, getSongListDetail } from "@/http/api";
import { IllustrationNoResult, IllustrationNoResultDark } from "@douyinfe/semi-illustrations";
import { Song } from "@/types/home";

const { Title, Text } = Typography;

function SongList() {
  const { id } = useParams();
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

  const columns: ColumnProps<Song>[] = [
    {
      title: "序号",
      dataIndex: "sort",
      render: (text, record, index) => index + 1
    },
    {
      title: "歌曲",
      dataIndex: "name"
    },
    {
      title: "歌手",
      dataIndex: "singer",
      render: (text, record) => {
        return record?.ar?.[0]?.name || "--";
      }
    },
    {
      title: "专辑",
      dataIndex: "album",
      render: (text, record) => {
        return record?.al?.name || "--";
      }
    }
  ];
  if (isError) {
    return (
      <Empty
        image={<IllustrationNoResult />}
        darkModeImage={<IllustrationNoResultDark />}
        description={"没有找到相关歌单"}
        className="p-8"
      />
    );
  }
  return (
    <div className="flex flex-col w-heart--wrappe px-32">
      <Skeleton
        placeholder={
          <div className="flex py-6">
            <div className="w-64 h-64 shrink-0 mr-10">
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
          <div className="w-64 h-64 shrink-0 mr-10">
            <img src={`${coverImgUrl}?param=256y256`} className="w-full h-full" alt="" />
          </div>
          <div className="flex flex-col">
            <Title heading={3}>{name}</Title>
            <Text className="mt-4">{description}</Text>
            <div className="mt-4">
              {tags?.map((item) => (
                <Tag size="large" color="red" className="mr-3" key={item}>
                  #{item}
                </Tag>
              ))}
            </div>
            <div className="mt-auto">
              <Button type="primary" theme="solid" size="large" className="mr-4">
                播放全部
              </Button>
              <Button type="tertiary" theme="solid" size="large" icon={<IconLikeHeart />} className="mr-4">
                收藏
              </Button>
              <Button type="tertiary" theme="solid" icon={<IconExternalOpen />} size="large">
                分享
              </Button>
            </div>
          </div>
        </div>
      </Skeleton>

      <Title heading={2}>全部歌曲</Title>
      <Table loading={listLoading} columns={columns} dataSource={listData || []} pagination={false} className="mt-5" />
    </div>
  );
}

export default SongList;
