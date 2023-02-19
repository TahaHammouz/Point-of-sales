import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { Layout } from "antd";
import React from "react";
const { Header } = Layout;
const CustomHeader = ({ collapsed, toggle, colorBgContainer }) => {
  return (
    <Header style={{ padding: 0, backgroundColor: colorBgContainer }}>
      {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
        className: "trigger",
        onClick: () => toggle(!collapsed),
      })}
    </Header>
  );
};
export default CustomHeader;
