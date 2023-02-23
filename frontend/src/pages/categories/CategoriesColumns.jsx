import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { deleteCategoryById } from "../../redux/slices/categorySlice";
import store from "../../redux/index";
import { fetchCategories } from "../../redux/slices/categorySlice";

const handleDelete = (id) => {
  store.dispatch(deleteCategoryById(id)).then(() => {
    store.dispatch(fetchCategories());
  });
};
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
          onClick={() => handleDelete(record.id)}
        />
      </div>
    ),
  },
];
