import { BackTop } from "@douyinfe/semi-ui";
import { Outlet } from "react-router-dom";
import NavBar from "./components/NavBar";
import { IconArrowUp } from "@douyinfe/semi-icons";
import "./index.scss";

function Layout() {
  return (
    <div className="cloud-music--layout">
      <NavBar />
      <Outlet></Outlet>
      <BackTop>
        <IconArrowUp />
      </BackTop>
    </div>
  );
}

export default Layout;
