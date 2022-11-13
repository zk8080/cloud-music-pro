import { logout } from "@/http/api";
import { loginInfoState, loginVisibleState } from "@/recoil/layout";
import { IconGithubLogo, IconMoon, IconPulse, IconSun } from "@douyinfe/semi-icons";
import { Avatar, Button, Card, Nav, Popover, Tooltip, Typography } from "@douyinfe/semi-ui";
import { useMutation } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useRecoilState, useSetRecoilState } from "recoil";
import "./index.scss";

const { Meta } = Card;
const { Text } = Typography;

function NavBar() {
  const setShowLogin = useSetRecoilState(loginVisibleState);
  const [{ nickname, avatarUrl, userId, signature }, setLoginInfo] = useRecoilState(loginInfoState);
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const [themeMode, setThemeMode] = useState<"dark" | "light">("light");

  const switchMode = () => {
    const body = document.body;
    if (body.hasAttribute("theme-mode")) {
      document.documentElement.classList.remove("dark");
      body.removeAttribute("theme-mode");
      setThemeMode("light");
    } else {
      document.documentElement.classList.add("dark");
      body.setAttribute("theme-mode", "dark");
      setThemeMode("dark");
    }
  };

  const selectKeys = useMemo(() => [pathname], [pathname]);

  // 退出登录
  const logoutMutation = useMutation(
    () => {
      return logout();
    },
    {
      onSuccess: async () => {
        setLoginInfo({});
      }
    }
  );

  return (
    <Nav
      mode={"horizontal"}
      className="cloud-layout--navbar shrink-0"
      selectedKeys={selectKeys}
      items={[
        { itemKey: "/", text: "首页" },
        { itemKey: "/category", text: "歌单" },
        { itemKey: "/singer", text: "歌手" }
      ]}
      onClick={(item) => {
        navigate(item.itemKey as string);
      }}
      header={{
        logo: <IconPulse className="text-4xl" size="inherit" />,
        text: "❤️Music"
      }}
      footer={
        <div className="flex items-center">
          {themeMode === "dark" ? (
            <Tooltip content="切换到亮色模式">
              <IconSun className="text-3xl cursor-pointer" size="inherit" onClick={switchMode} />
            </Tooltip>
          ) : (
            <Tooltip content="切换到暗色模式">
              <IconMoon className="text-3xl cursor-pointer" size="inherit" onClick={switchMode} />
            </Tooltip>
          )}
          <Tooltip content="查看GitHub">
            <IconGithubLogo
              className="text-3xl cursor-pointer ml-4"
              onClick={() => {
                window.open("https://github.com/zk8080/cloud-music-pro");
              }}
            />
          </Tooltip>
          {userId ? (
            <Popover
              content={
                <Card
                  className="w-56"
                  title={<Meta title={nickname} avatar={<Avatar alt="avatarUrl" size="default" src={avatarUrl} />} />}
                  footerStyle={{ display: "flex", justifyContent: "flex-end" }}
                  footer={
                    <Button
                      theme="solid"
                      type="danger"
                      onClick={() => {
                        logoutMutation.mutate();
                      }}
                    >
                      退出登录
                    </Button>
                  }
                >
                  <Text>{signature}</Text>
                </Card>
              }
            >
              <Avatar size="small" className="ml-4 cursor-pointer" color="red" src={avatarUrl}></Avatar>
            </Popover>
          ) : (
            <Button
              onClick={() => {
                setShowLogin(true);
              }}
              theme="borderless"
              type="primary"
              className="bg-transparent ml-2"
            >
              登录
            </Button>
          )}
        </div>
      }
    />
  );
}

export default NavBar;
