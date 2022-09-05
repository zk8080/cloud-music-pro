import { getBanner } from "@/http/api";
import { Carousel } from "@douyinfe/semi-ui";
import { useEffect, useState } from "react";
import { BannerItem } from "@/types/home";

const Banner = () => {
  const [bannerList, setBannerList] = useState<BannerItem[]>([]);

  useEffect(() => {
    const getBannerList = async () => {
      const res = await getBanner();
      if (res.code === 200) {
        setBannerList(res.banners);
      }
    };
    getBannerList();
  }, []);

  return (
    <>
      {bannerList.length > 0 && (
        <Carousel className="w-full h-96" speed={1000} animation="fade" autoPlay={false} arrowType="hover">
          {bannerList.map((item, index) => {
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
