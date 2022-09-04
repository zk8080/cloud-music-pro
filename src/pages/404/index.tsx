import React from "react";
import { Button, Empty } from "@douyinfe/semi-ui";
import { IllustrationNotFound, IllustrationNotFoundDark } from "@douyinfe/semi-illustrations";
import { useNavigate } from "react-router-dom";

function Index() {
  const navigate = useNavigate();
  return (
    <div>
      <Empty
        image={<IllustrationNotFound style={{ width: 150, height: 150 }} />}
        darkModeImage={<IllustrationNotFoundDark style={{ width: 150, height: 150 }} />}
        title="404"
        description="不存在此页面～"
      >
        <div>
          <Button
            theme="solid"
            type="primary"
            onClick={() => {
              navigate("/");
            }}
          >
            返回首页
          </Button>
        </div>
      </Empty>
    </div>
  );
}

export default Index;
