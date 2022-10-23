import { getBanner } from "@/http/api";
import { Carousel, Skeleton } from "@douyinfe/semi-ui";
import { useQuery } from "@tanstack/react-query";

const Banner = () => {
  const { data, isLoading } = useQuery(["banner"], getBanner);
  const { banners = [] } = data || {};

  return (
    <>
      <Skeleton
        placeholder={
          <div className="px-32 bg-cover bg-center h-96">
            <Skeleton.Image className="w-full" />
          </div>
        }
        loading={isLoading}
        active
      >
        {banners?.length > 0 && (
          <Carousel
            className="w-full h-96"
            speed={1000}
            animation="fade"
            autoPlay={true}
            arrowType="hover"
            theme="dark"
          >
            {banners?.map((item, index) => {
              return (
                <div
                  key={index}
                  className="px-32 bg-cover bg-center flex justify-center"
                  style={{
                    backgroundImage: `url(${item.imageUrl}?imageView&blur=40x20)`
                  }}
                >
                  <img className="h-full" src={item.imageUrl} alt="" />
                </div>
              );
            })}
          </Carousel>
        )}
      </Skeleton>
    </>
  );
};

export default Banner;
