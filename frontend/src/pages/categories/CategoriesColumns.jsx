import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
export const columns = [
  {
    title: "Category Name",
    dataIndex: "category",
    key: "category",
  },
  {
    title: "Actions",
    key: "actions",
    render: (_, record) => (
      <div className="d-flex">
        <EditOutlined
          className="mx-2"
          onClick={() => {
            console.log(_.id);
          }}
        />
        <DeleteOutlined
          className="mx-2"
          onClick={() => {
            console.log(_.id);
          }}
        />
      </div>
    ),
  },
];
