import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";
import { Layout } from "antd";
import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "../../pages/Root/Root.css";
const { Header } = Layout;
const CustomHeader = ({ collapsed, toggle, colorBgContainer }) => {
  const cartItems = useSelector((state) => state.cart.items);
  const navigate = useNavigate();
  return (
    <Header style={{ padding: 0, backgroundColor: colorBgContainer }}>
      {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
        className: "trigger",
        onClick: () => toggle(!collapsed),
      })}
      <div className="cart-count d-flex align-items-center">
        <b>
          <p className="mt-3 mr-2">{cartItems.length}</p>
        </b>
        <ShoppingCartOutlined onClick={() => navigate("/cart")} />
      </div>
    </Header>
  );
};
export default CustomHeader;
