import { BackTop, Layout } from "@douyinfe/semi-ui";
import { Outlet } from "react-router-dom";
import NavBar from "./components/NavBar";
import { IconArrowUp } from "@douyinfe/semi-icons";
import "./index.scss";
import MyFooter from "./components/Footer";
import Login from "./components/Login";
import { useToggle } from "ahooks";

const { Header, Footer, Content } = Layout;

function MyLayout() {
  const [loginVisible, { toggle }] = useToggle();

  return (
    <Layout className="cloud-music--layout pt-[60px]">
      <Header className="fixed top-0 z-50 w-full backdrop-blur">
        <NavBar handleLogin={toggle} />
      </Header>
      <Content>
        <Outlet></Outlet>
      </Content>
      <Footer>
        <MyFooter />
      </Footer>
      <BackTop>
        <IconArrowUp />
      </BackTop>
      <Login visible={loginVisible} onClose={toggle} />
    </Layout>
  );
}

export default MyLayout;
