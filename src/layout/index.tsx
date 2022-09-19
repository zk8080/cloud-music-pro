import { BackTop, Layout, Spin } from "@douyinfe/semi-ui";
import { Outlet } from "react-router-dom";
import NavBar from "./components/NavBar";
import { IconArrowUp } from "@douyinfe/semi-icons";
import "./index.scss";
import MyFooter from "./components/Footer";
import { useIsFetching } from "@tanstack/react-query";

const { Header, Footer, Content } = Layout;

function MyLayout() {
  const isFetching = useIsFetching();
  return (
    <Layout className="cloud-music--layout pt-[60px]">
      <Spin spinning={isFetching > 0} tip="loading...">
        <Header className="fixed top-0 z-50 w-full backdrop-blur">
          <NavBar />
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
      </Spin>
    </Layout>
  );
}

export default MyLayout;
