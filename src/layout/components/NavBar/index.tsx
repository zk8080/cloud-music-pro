import { IconMoon, IconPulse, IconSun } from "@douyinfe/semi-icons";
import { Avatar, Nav, Tooltip } from "@douyinfe/semi-ui";
import { useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./index.scss";

function NavBar() {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const [themeMode, setThemeMode] = useState<"dark" | "light">("light");

  const switchMode = () => {
    const body = document.body;
    if (body.hasAttribute("theme-mode")) {
      body.removeAttribute("theme-mode");
      setThemeMode("light");
    } else {
      body.setAttribute("theme-mode", "dark");
      setThemeMode("dark");
    }
  };

  const selectKeys = useMemo(() => [pathname], [pathname]);

  return (
    <Nav
      mode={"horizontal"}
      className="cloud-layout--navbar px-32 shrink-0"
      selectedKeys={selectKeys}
      items={[
        { itemKey: "/", text: "首页" },
        { itemKey: "/category", text: "歌单" }
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

          <Avatar size="small" className="ml-3 cursor-pointer" color="red">
            M
          </Avatar>
        </div>
      }
    />
  );
}

export default NavBar;
