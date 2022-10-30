import { Avatar, Button, Table, Tag, Typography } from "@douyinfe/semi-ui";
import { IconLikeHeart, IconExternalOpen, IconMore } from "@douyinfe/semi-icons";
import { ColumnProps } from "@douyinfe/semi-ui/lib/es/table";

const { Title, Text } = Typography;

const data = [
  {
    key: "1",
    name: "Semi Design 设计稿.fig",
    nameIconSrc: "https://lf3-static.bytednsdoc.com/obj/eden-cn/ptlz_zlp/ljhwZthlaukjlkulzlp/figma-icon.png",
    size: "2M",
    owner: "姜鹏志",
    updateTime: "2020-02-02 05:13",
    avatarBg: "grey"
  },
  {
    key: "2",
    name: "Semi Design 分享演示文稿",
    nameIconSrc: "https://lf3-static.bytednsdoc.com/obj/eden-cn/ptlz_zlp/ljhwZthlaukjlkulzlp/docs-icon.png",
    size: "2M",
    owner: "郝宣",
    updateTime: "2020-01-17 05:31",
    avatarBg: "red"
  },
  {
    key: "3",
    name: "设计文档",
    nameIconSrc: "https://lf3-static.bytednsdoc.com/obj/eden-cn/ptlz_zlp/ljhwZthlaukjlkulzlp/docs-icon.png",
    size: "34KB",
    owner: "Zoey Edwards",
    updateTime: "2020-01-26 11:01",
    avatarBg: "light-blue"
  }
];

type RecordType = {
  key: string;
  name: string;
  nameIconSrc: string;
  size: string;
  owner: string;
  updateTime: string;
  avatarBg: string;
};

function SongList() {
  const columns: ColumnProps<RecordType>[] = [
    {
      title: "标题",
      dataIndex: "name",
      render: (text, record) => {
        return (
          <div>
            <Avatar size="small" shape="square" src={record.nameIconSrc} style={{ marginRight: 12 }}></Avatar>
            {text}
          </div>
        );
      }
    },
    {
      title: "大小",
      dataIndex: "size"
    },
    {
      title: "所有者",
      dataIndex: "owner",
      render: (text) => {
        return (
          <div>
            <Avatar size="small" style={{ marginRight: 4 }}>
              {typeof text === "string" && text.slice(0, 1)}
            </Avatar>
            {text}
          </div>
        );
      }
    },
    {
      title: "更新日期",
      dataIndex: "updateTime"
    },
    {
      title: "",
      dataIndex: "operate",
      render: () => {
        return <IconMore />;
      }
    }
  ];

  return (
    <div className="flex flex-col w-heart--wrappe px-32">
      <div className="flex py-6">
        <div className="w-64 h-64 bg-red-400 mr-10">图片</div>
        <div className="flex flex-col">
          <Title heading={3}>标题</Title>
          <Text className="mt-4">描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述</Text>
          <div className="mt-4">
            <Tag size="large" color="red">
              标签
            </Tag>
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
      <Title heading={2}>全部歌曲</Title>
      <Table columns={columns} dataSource={data} pagination={false} className="mt-5" />;
    </div>
  );
}

export default SongList;
