import { Song } from "@/types/home";
import { formatPlayTime } from "@/utils";
import { IconPlayCircle, IconHeartStroked, IconShareStroked } from "@douyinfe/semi-icons";
import { Table } from "@douyinfe/semi-ui";
import { ColumnProps } from "@douyinfe/semi-ui/lib/es/table";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./index.scss";

interface ISongListTableProps {
  dataSource?: Song[];
  tableLoading?: boolean;
}

function SongListTable(props: ISongListTableProps) {
  const { dataSource, tableLoading } = props || {};

  const navigate = useNavigate();

  const [curMouseId, setCurMouseId] = useState<number>();

  const columns: ColumnProps<Song>[] = [
    {
      title: "序号",
      dataIndex: "sort",
      width: 80,
      render: (text, record, index) => index + 1
    },
    {
      title: "歌曲",
      dataIndex: "name",
      width: 300
    },
    {
      title: "歌手",
      dataIndex: "singer",
      render: (text, record) => {
        return record?.ar?.map((item, index) => {
          const { id, name } = item || {};
          return (
            <span key={id}>
              {index > 0 && " / "}
              <a className="cursor-pointer hover:text-primary" onClick={() => navigate(`/singerDetail/${id}`)}>
                {name}
              </a>
            </span>
          );
        });
      }
    },
    {
      title: "专辑",
      dataIndex: "album",
      width: 300,
      render: (text, record) => {
        const { id, name } = record?.al || {};
        if (id) {
          return (
            <a className="cursor-pointer hover:text-primary" onClick={() => navigate(`/albumDetail/${id}`)}>
              《{name}》
            </a>
          );
        }
        return "--";
      }
    },
    {
      title: "时长",
      dataIndex: "dt",
      width: 200,
      align: "right",
      className: "song-list--duration",
      render: (text, record) => {
        if (curMouseId && curMouseId === record.id) {
          return (
            <div className="flex justify-between">
              <IconPlayCircle className="cursor-pointer" size="large" />
              <IconHeartStroked className="cursor-pointer" size="large" />
              <IconShareStroked className="cursor-pointer" size="large" />
            </div>
          );
        }
        return formatPlayTime(text / 1000);
      }
    }
  ];

  return (
    <Table
      loading={tableLoading}
      columns={columns}
      dataSource={dataSource || []}
      pagination={false}
      className="mt-5 song-list--table"
      onRow={(record) => {
        return {
          onMouseEnter: () => {
            setCurMouseId(record?.id);
          }, // 鼠标移入行
          onMouseLeave: () => {
            setCurMouseId(undefined);
          } // 鼠标移出行
        };
      }}
    />
  );
}

export default SongListTable;
