import React from "react";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { Layout } from "antd";

const { Header } = Layout;

const CustomHeader = ({ collapsed, setCollapsed, colorBgContainer }) => {
  return (
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
  );
};

export default CustomHeader;
