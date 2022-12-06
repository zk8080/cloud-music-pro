import { Song } from "@/types/home";
import { formatPlayTime } from "@/utils";
import { IconPlayCircle, IconHeartStroked, IconShareStroked } from "@douyinfe/semi-icons";
import { Table } from "@douyinfe/semi-ui";
import { ColumnProps, TableProps } from "@douyinfe/semi-ui/lib/es/table";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./index.scss";

interface ISongListTableProps<T extends Record<string, any> = any> extends TableProps<T> {
  dataSource?: T[];
  tableLoading?: boolean;
}

function SongListTable<T extends Record<string, any> = any>(props: ISongListTableProps<T>) {
  const { dataSource, tableLoading, ...restProps } = props || {};

  const navigate = useNavigate();

  const [curMouseId, setCurMouseId] = useState<number>();

  const columns: ColumnProps<Song>[] = [
    {
      title: "序号",
      dataIndex: "sort",
      width: "10%",
      render: (text, record, index) => index + 1
    },
    {
      title: "歌曲",
      dataIndex: "name",
      width: "30%"
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
      width: "30%",
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
      width: "15%",
      align: "right",
      className: "song-list--duration",
      render: (text, record) => {
        if (curMouseId && curMouseId === record.id) {
          return (
            <div className="song-duration--operation flex justify-between">
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
      {...restProps}
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
