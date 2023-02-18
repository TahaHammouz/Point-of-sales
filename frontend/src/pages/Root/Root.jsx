import { Link, Outlet } from "react-router-dom";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
  UnorderedListOutlined,
  ProfileOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { Layout, Menu, theme } from "antd";
import React, { useState } from "react";
import "./Root.css";
const { Header, Sider, Content } = Layout;
const RootLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="logo" ><h3>POS</h3></div>
        <Menu theme="dark" mode="inline" defaultSelectedKeys={["1"]}>
          <Menu.Item key="1" icon={<UserOutlined />}>
            <Link to="/home" style={{ textDecoration: "none" }}>
              Home
            </Link>
          </Menu.Item>
          <Menu.Item key="2" icon={<UnorderedListOutlined />}>
            <Link to="/products" style={{ textDecoration: "none" }}>
              Products
            </Link>
          </Menu.Item>
          <Menu.Item key="3" icon={<ProfileOutlined />}>
            <Link to="/categories" style={{ textDecoration: "none" }}>
              Categories
            </Link>
          </Menu.Item>
          <Menu.Item key="4" icon={<LogoutOutlined />}>
            <Link to="/logout" style={{ textDecoration: "none" }}>
              Logout
            </Link>
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout className="site-layout">
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
        >
          {React.createElement(
            collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
            {
              className: "trigger",
              onClick: () => setCollapsed(!collapsed),
            }
          )}
        </Header>
        <Content
          style={{
            margin: "10px",
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};
export default RootLayout;
