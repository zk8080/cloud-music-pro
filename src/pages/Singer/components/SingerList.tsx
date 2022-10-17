import React, { memo } from "react";
import { Button, List, Typography } from "@douyinfe/semi-ui";
import { Artist } from "@/types/home";

const { Title } = Typography;

interface IPlayerListProps {
  singerList?: Artist[];
  hasMore?: boolean;
  onLoadMore?: () => void;
  isFetchingNextPage?: boolean;
}

function SingerList(props: IPlayerListProps) {
  const { singerList, hasMore, onLoadMore, isFetchingNextPage } = props;

  const loadMore = hasMore ? (
    <div className="text-center mt-5">
      <Button
        onClick={() => {
          onLoadMore?.();
        }}
        type="primary"
        theme="solid"
        loading={isFetchingNextPage}
      >
        显示更多
      </Button>
    </div>
  ) : null;

  return (
    <List
      grid={{
        gutter: 12,
        span: 5 / 24
      }}
      className="px-32"
      layout="horizontal"
      dataSource={singerList}
      loadMore={loadMore}
      renderItem={(item) => {
        const { name, picUrl } = item;
        return (
          <List.Item className="mt-6 flex flex-col w-56 h-64 items-center justify-center bg-slate-100">
            <div className="group w-44 h-44 rounded-full mb-5 cursor-pointer overflow-hidden">
              <img
                className="rounded-full w-full h-full group-hover:scale-125 transition duration-500 ease-in-out"
                src={`${picUrl}?param=160y160`}
                alt=""
              />
            </div>
            <Title heading={5} ellipsis={{ showTooltip: true }}>
              {name}
            </Title>
          </List.Item>
        );
      }}
    />
  );
}

export default memo(SingerList);
