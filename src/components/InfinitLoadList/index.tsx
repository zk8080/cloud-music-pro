import React from "react";
import { Button, List } from "@douyinfe/semi-ui";
import classNames from "classnames";

interface IPlayerListProps<T = unknown> {
  dataList?: T[];
  hasMore?: boolean;
  onLoadMore?: () => void;
  isFetchingNextPage?: boolean;
  renderItem?: (item: T, ind: number) => React.ReactNode;
  onItemClick?: (item?: T) => void;
  className?: string;
}

function InfinitLoadList<T = unknown>(props: IPlayerListProps<T>) {
  const { dataList, hasMore, onLoadMore, isFetchingNextPage, renderItem, onItemClick, className } = props;
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
      className={classNames("w-heart--wrapper", className)}
      layout="horizontal"
      dataSource={dataList}
      loadMore={loadMore}
      renderItem={(item, ind) => {
        return (
          <List.Item className="mt-6" onClick={() => onItemClick?.(item)}>
            {renderItem?.(item, ind)}
          </List.Item>
        );
      }}
    />
  );
}

export default InfinitLoadList;
