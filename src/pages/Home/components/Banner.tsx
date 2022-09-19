import { getBanner } from "@/http/api";
import { Carousel } from "@douyinfe/semi-ui";
import { useQuery } from "@tanstack/react-query";

const Banner = () => {
  const { data } = useQuery(["banner"], getBanner);
  const { banners = [] } = data || {};

  return (
    <>
      {banners?.length > 0 && (
        <Carousel className="w-full h-96" speed={1000} animation="fade" autoPlay={false} arrowType="hover">
          {banners?.map((item, index) => {
            return (
              <div
                key={index}
                className="px-32 bg-cover bg-center"
                style={{
                  backgroundImage: `url(${item.imageUrl}?imageView&blur=40x20)`
                }}
              >
                <img className="w-full" src={item.imageUrl} alt="" />
              </div>
            );
          })}
        </Carousel>
      )}
    </>
  );
};

export default Banner;
