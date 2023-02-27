import { Outlet } from "react-router-dom";
import { Layout } from "antd";
import React, { useState } from "react";
import "./Root.css";
import SideMenu from "../../components/Menu/SideMenu";
import CustomHeader from "../../components/Menu/CustomHeader";
import CustomLayout from "../../components/Menu/CustomLayout";

const { Sider, Content } = Layout;
const RootLayout = () => {
  const [collapsed, setCollapsed] = useState(false);

  const toggleCollapsed = (value) => {
    setCollapsed(value);
  };

  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="logo">
          <h3>{collapsed ? "RP" : "React POS"}</h3>
        </div>
        <SideMenu />
      </Sider>
      <CustomLayout>
        <CustomHeader
          collapsed={collapsed}
          toggle={toggleCollapsed}
          colorBgContainer={"white"}
        />
        <Content
          style={{
            margin: "10px",
            padding: 24,
            minHeight: 280,
          }}
        >
          <Outlet />
        </Content>
      </CustomLayout>
    </Layout>
  );
};

export default RootLayout;
