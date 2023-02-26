import CustomTable from "../../components/UI/Table/Table";
import { useState, useRef } from "react";
import { Input, Modal, Form } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import {
  deleteCategoryById,
  updateCategory,
} from "../../redux/slices/categorySlice";
import { fetchCategories } from "../../redux/slices/categorySlice";
import { useDispatch, useSelector } from "react-redux";

const { Search } = Input;

const CategoryTable = () => {
  const [searchInput, setSearchInput] = useState("");
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [editedCategory, setEditedCategory] = useState(null);
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.categories.categories);

  const filteredCategories = categories.filter((category) => {
    if (!category.hasOwnProperty("category")) {
      return false;
    }
    return category.category
      .toLowerCase()
      .includes(searchInput.trim().toLowerCase());
  });

  const handleDelete = (id) => {
    dispatch(deleteCategoryById(id)).then(() => {
      dispatch(fetchCategories());
    });
  };

  const handleEditClick = (category) => {
    setEditedCategory(category);
    setEditModalVisible(true);
  };

  const handleEditModalOk = () => {
    const { id } = editedCategory;
    const form = editFormRef.current;
    form.validateFields().then((values) => {
      dispatch(updateCategory({ id, category: values.category })).then(
        (updatedCategory) => {
          dispatch(fetchCategories());
          setEditedCategory(updatedCategory);
          setEditModalVisible(false);
          form.resetFields();
        }
      );
    });
  };

  const handleEditModalCancel = () => {
    setEditModalVisible(false);
    setEditedCategory(null);
    const form = editFormRef.current;
    form.resetFields();
  };

  const editFormRef = useRef(null);

  const columns = [
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
            onClick={() => handleEditClick(record)}
          />
          <DeleteOutlined
            className="mx-2"
            onClick={() => handleDelete(record.id)}
          />
        </div>
      ),
    },
  ];

  return (
    <>
      <Search
        type="text"
        placeholder="Search categories"
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
        style={{ width: 300, marginBottom: 20 }}
      />
      <CustomTable
        pagination={{ pageSize: 6 }}
        bordered
        columns={columns}
        dataSource={filteredCategories}
        rowKey={(record) => record.id}
      />
      <Modal
        title="Edit Category"
        open={editModalVisible}
        onOk={handleEditModalOk}
        onCancel={handleEditModalCancel}
      >
        <Form
          ref={editFormRef}
          initialValues={{ category: editedCategory?.category }}
        >
          <Form.Item
            name="category"
            rules={[
              { required: true, message: "Please enter a category name" },
            ]}
          >
            <Input name="category" placeholder="Category Name" />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default CategoryTable;
