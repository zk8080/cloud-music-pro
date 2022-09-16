import React, { memo } from "react";
import { Button, List } from "@douyinfe/semi-ui";
import SongCard from "@/components/SongCard";
import { Playlist } from "@/types/home";

interface IPlayerListProps {
  playList?: Playlist[];
  hasMore?: boolean;
  onLoadMore?: () => void;
}

function PlayerList(props: IPlayerListProps) {
  const { playList, hasMore, onLoadMore } = props;

  const loadMore = hasMore ? (
    <div className="text-center mt-5">
      <Button
        onClick={() => {
          onLoadMore?.();
        }}
        type="primary"
        theme="solid"
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
      dataSource={playList}
      loadMore={loadMore}
      renderItem={(item) => {
        const { name, coverImgUrl } = item;
        return (
          <List.Item className="mt-6">
            <SongCard songName={name} coverImgUrl={coverImgUrl} />
          </List.Item>
        );
      }}
    />
  );
}

export default memo(PlayerList);
