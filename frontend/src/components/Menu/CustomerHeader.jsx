import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
const { Header} = Layout;
const CustomHeader = ({ collapsed, toggle }) => {
    return (
      <Header style={{ padding: 0 }}>
        {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
          className: "trigger",
          onClick: () => toggle(!collapsed),
        })}
      </Header>
    );
  };