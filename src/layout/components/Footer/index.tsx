import { IconPulse } from "@douyinfe/semi-icons";
import { Typography } from "@douyinfe/semi-ui";

const { Title, Text } = Typography;

function MyFooter() {
  return (
    <div className="flex items-center justify-center flex-col h-32 px-32 shrink-0">
      <Title heading={3}>
        <IconPulse className="text-2xl" size="inherit" />
        ❤️Music
      </Title>
      <Text>基于React和Vite以及Semi Design开发的个人学习音乐网站</Text>
    </div>
  );
}

export default MyFooter;
