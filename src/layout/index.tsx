import { BackTop, Layout } from "@douyinfe/semi-ui";
import { Outlet, useLocation } from "react-router-dom";
import NavBar from "./components/NavBar";
import { IconArrowUp } from "@douyinfe/semi-icons";
import "./index.scss";
import MyFooter from "./components/Footer";
import Login from "./components/Login";
import { useRecoilState, useSetRecoilState } from "recoil";
import { loginInfoState, loginVisibleState } from "@/recoil/layout";
import { useCallback } from "react";
import { useQuery } from "@tanstack/react-query";
import { getLoginInfo } from "@/http/api";

const { Header, Footer, Content } = Layout;

function MyLayout() {
  const { pathname } = useLocation();
  const [showLogin, setShowLogin] = useRecoilState(loginVisibleState);
  const setLoginInfo = useSetRecoilState(loginInfoState);
  const toggle = useCallback(() => {
    setShowLogin(!showLogin);
  }, [showLogin]);

  useQuery(["loginStatus"], getLoginInfo, {
    refetchOnWindowFocus: false,
    onSuccess: (data) => {
      const { code, profile } = data || {};
      if (code === 200) {
        setLoginInfo(profile || {});
      }
    }
  });

  return (
    <Layout className="cloud-music--layout pt-[60px]">
      <Header className="fixed top-0 z-50 w-full backdrop-blur">
        <NavBar />
      </Header>
      <Content>
        <Outlet></Outlet>
      </Content>
      {pathname !== "/player" && (
        <Footer>
          <MyFooter />
        </Footer>
      )}
      <BackTop style={{ bottom: 100 }}>
        <IconArrowUp />
      </BackTop>
      <Login visible={showLogin} onClose={toggle} />
    </Layout>
  );
}

export default MyLayout;
