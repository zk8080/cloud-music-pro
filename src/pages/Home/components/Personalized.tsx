import { getPersonalized } from "@/http/api";
import { PersonalizedItem } from "@/types/home";
import { chunk } from "@/utils";
import { Card, Carousel, Typography } from "@douyinfe/semi-ui";
import { useEffect, useState } from "react";

const { Title } = Typography;

function Personalized() {
  const [personalizedList, setPersonalizedList] = useState<PersonalizedItem[][]>([]);

  useEffect(() => {
    const getList = async () => {
      const res = await getPersonalized({ limit: 20 });
      if (res.code === 200) {
        const newList = chunk(res.result || [], 5);
        setPersonalizedList(newList || []);
      }
    };
    getList();
  }, []);

  return (
    <>
      <Title heading={2} ellipsis={{ showTooltip: true }} className="flex items-center justify-center my-5">
        热门推荐
      </Title>
      {personalizedList?.length > 0 && (
        <Carousel
          className="w-full h-80"
          speed={1000}
          animation="fade"
          showIndicator={false}
          autoPlay={false}
          arrowType="hover"
          theme="dark"
        >
          {personalizedList.map((item, index) => {
            return (
              <div key={index} className="px-32 flex items-center justify-between">
                {item.map((childItem) => {
                  const { id, picUrl, name } = childItem || {};
                  return (
                    <Card key={id} className="w-56" shadows="hover" cover={<img alt="example" src={picUrl} />}>
                      <Title heading={5} ellipsis={{ showTooltip: true }}>
                        {name}
                      </Title>
                    </Card>
                  );
                })}
              </div>
            );
          })}
        </Carousel>
      )}
    </>
  );
}

export default Personalized;
