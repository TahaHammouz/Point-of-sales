import { Menu } from "antd";
import {
  UserOutlined,
  UnorderedListOutlined,
  ProfileOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
const SideMenu = () => {
  const menuItems = [
    {
      key: "1",
      icon: <UserOutlined />,
      label: (
        <Link to="/home" style={{ textDecoration: "none" }}>
          Home
        </Link>
      ),
    },
    {
      key: "2",
      icon: <UnorderedListOutlined />,
      label: (
        <Link to="/products" style={{ textDecoration: "none" }}>
          Products
        </Link>
      ),
    },
    {
      key: "3",
      icon: <ProfileOutlined />,
      label: (
        <Link to="/categories" style={{ textDecoration: "none" }}>
          Categories
        </Link>
      ),
    },
    {
      key: "4",
      icon: <LogoutOutlined />,
      label: (
        <Link to="/logout" style={{ textDecoration: "none" }}>
          Logout
        </Link>
      ),
    },
  ];
  return (
    <Menu
      theme="dark"
      mode="inline"
      defaultSelectedKeys={["1"]}
      items={menuItems}
    />
  );
};
export default SideMenu;
