import { memo, useState, useEffect } from "react";
import { Button, Card, List, Skeleton, Typography } from "@douyinfe/semi-ui";
import { useParams } from "react-router-dom";
import { useInfiniteQuery } from "@tanstack/react-query";
import { getSingerAlbumDetail } from "@/http/api";
import { HotAlbum } from "@/types/singerDetail";
import CoverImage from "@/components/CoverImage";

const { Title } = Typography;

function SingerAlbum() {
  const { id } = useParams();
  const [albumList, setAlbumList] = useState<HotAlbum[]>([]);

  const { data, fetchNextPage, hasNextPage, isLoading, isFetchingNextPage } = useInfiniteQuery(
    ["123456", id],
    async (obj) => {
      const res = await getSingerAlbumDetail({ id, limit: 30, offset: obj.pageParam });
      return res;
    },
    {
      getNextPageParam: (lastPage, page) => {
        if (lastPage.more) {
          return page.length * 30;
        }
        return;
      }
    }
  );
  useEffect(() => {
    if (data?.pages && data?.pages?.length > 0) {
      const list = data?.pages.reduce((t, c) => {
        return [...t, ...(c.hotAlbums || [])];
      }, [] as HotAlbum[]);
      setAlbumList(list);
    }
  }, [data?.pages]);

  const loadMore = hasNextPage ? (
    <div className="text-center mt-5">
      <Button
        onClick={() => {
          fetchNextPage();
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
    <Skeleton
      placeholder={
        <div className="w-heart--wrapper flex items-center justify-between flex-wrap">
          {Array.from({ length: 10 }, (v, i) => i).map((item) => (
            <Skeleton.Image key={item} className="w-56 h-72 mt-6" />
          ))}
        </div>
      }
      loading={isLoading}
      active
    >
      <List
        grid={{
          gutter: 16,
          span: 5 / 24
        }}
        className="w-heart--wrapper"
        layout="horizontal"
        dataSource={albumList}
        loadMore={loadMore}
        renderItem={(item) => {
          const { name, blurPicUrl, id } = item;
          return (
            <List.Item className="mt-6">
              <Card
                key={id}
                className="w-56 dark:bg-zinc-800"
                shadows="always"
                bordered={false}
                cover={<CoverImage src={`${blurPicUrl}?param=224y224`} />}
              >
                <Title heading={5} ellipsis={{ showTooltip: true }}>
                  {name}
                </Title>
              </Card>
            </List.Item>
          );
        }}
      />
    </Skeleton>
  );
}

export default memo(SingerAlbum);
