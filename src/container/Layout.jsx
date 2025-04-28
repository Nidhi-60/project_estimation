import { Outlet } from "react-router-dom";
import Sidebar from "../common/Sidebar";
import TopBar from "../common/TopBar";
import { Layout as LayoutComponent, Menu } from "antd";
const { Sider, Content } = LayoutComponent;

const Layout = () => {
  return (
    <LayoutComponent>
      <TopBar />

      <LayoutComponent>
        <Sider width={200}>
          <Sidebar />
        </Sider>
        <LayoutComponent style={{ padding: "0 40px 24px" }}>
          <Content
            style={{
              padding: "0px 0px 0px 33px",
              margin: 0,
              minHeight: 280,
            }}
          >
            <Outlet />
          </Content>
        </LayoutComponent>
      </LayoutComponent>
    </LayoutComponent>
  );
};

export default Layout;
