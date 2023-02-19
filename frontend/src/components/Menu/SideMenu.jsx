import { Menu } from "antd";
import {
  UserOutlined,
  UnorderedListOutlined,
  ProfileOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
const SideMenu = () => {
  return (
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
  );
};
export default SideMenu;
