import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
export const columns = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
    render: (text) => <a>{text}</a>,
  },
  {
    title: "Image",
    dataIndex: "image",
    key: "image",
    render: (text) => <img src={text} alt="Product" style={{ width: 100 }} />,
  },
  {
    title: "Price",
    dataIndex: "price",
    key: "price",
  },
  {
    title: "Category",
    dataIndex: "category",
    key: "category",
  },
  {
    title: "Code",
    dataIndex: "code",
    key: "code",
  },
  {
    title: "Action",
    key: "action",
    render: () => (
      <div className="d-flex">
        <DeleteOutlined className="mx-2" />
        <EditOutlined className="mx-2" />
      </div>
    ),
  },
];
