import SongListTable from "@/components/SongListTable";
import { getSingerDetail } from "@/http/api";
import { IconHeartStroked, IconShareStroked } from "@douyinfe/semi-icons";
import { Skeleton, Button, Typography, TabPane, Tabs, Empty, Divider } from "@douyinfe/semi-ui";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { IllustrationNoResult, IllustrationNoResultDark } from "@douyinfe/semi-illustrations";
import SingerAlbum from "./components/SingerAlbum";
import { useState } from "react";
import "./index.scss";
import classNames from "classnames";

const { Title } = Typography;

function SingerDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeKey, setActiveKey] = useState<string>("1");
  const { data: detailData, isLoading, isError } = useQuery(["singerDetail", id], () => getSingerDetail({ id }));

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
    <div className="singer-detail--wrapper flex flex-col w-heart--wrappe px-32">
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
      <div className="my-4">
        <span
          className={classNames("nav-bar--tab", {
            actived: activeKey === "1"
          })}
          onClick={() => setActiveKey("1")}
        >
          热门歌曲
        </span>
        <Divider layout="vertical" margin="12px" />
        <span
          className={classNames("nav-bar--tab", {
            actived: activeKey === "2"
          })}
          onClick={() => setActiveKey("2")}
        >
          所有专辑
        </span>
        {/* <Divider layout="vertical" margin="12px" />
        <span
          className="py-2 px-3 rounded-sm text-gray-500 text-sm cursor-pointer
         hover:bg-gray-100 hover:text-gray-900"
        >
          热门歌曲
        </span> */}
      </div>
      {activeKey === "1" && <SongListTable tableLoading={isLoading} dataSource={hotSongs} />}
      {activeKey === "2" && <SingerAlbum />}
    </div>
  );
}

export default SingerDetail;
