import { BackTop, Layout } from "@douyinfe/semi-ui";
import { Outlet } from "react-router-dom";
import NavBar from "./components/NavBar";
import { IconArrowUp } from "@douyinfe/semi-icons";
import "./index.scss";
import MyFooter from "./components/Footer";

const { Header, Footer, Content } = Layout;

function MyLayout() {
  return (
    <Layout className="cloud-music--layout">
      <Header>
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
    </Layout>
  );
}

export default MyLayout;