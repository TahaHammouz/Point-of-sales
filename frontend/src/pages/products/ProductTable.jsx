import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CustomTable from "../../components/UI/Table/Table";
import { Input, Modal, Button, Form, notification, Select } from "antd";
import * as Yup from "yup";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";

import {
  fetchProducts,
  removeProduct,
  setLoading,
  updateProduct,
} from "../../redux/slices/productSlice";
const { Search } = Input;
const editProductSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  price: Yup.number()
    .typeError("Price must be a number")
    .required("Price is required")
    .moreThan(0, "Price must be greater than or equal to 0"),
  category: Yup.string().required("Category is required"),
  code: Yup.string().required("Code is required"),
  image: Yup.string()
    .url("Image must be a valid URL")
    .required("Image is required"),
});
const ProductTable = () => {
  const products = useSelector((state) => state.product.products);
  const loading = useSelector((state) => state.product.loading);
  const categories = useSelector((state) => state.categories.categories);
  const [searchInput, setSearchInput] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editValues, setEditValues] = useState(null);

  const dispatch = useDispatch();

  const filteredProducts =
    products &&
    products.filter((product) => {
      return product?.name.toLowerCase().includes(searchInput.toLowerCase());
    });

  const handleDelete = (id) => {
    dispatch(removeProduct(id)).then(() => {
      dispatch(fetchProducts());
    });
  };
  const handleEdit = (record) => {
    setIsModalVisible(true);
    setEditValues(record);
    setEditValues({ ...record, code: record.code });
  };

  const handleEditChange = (key, value) => {
    setEditValues((prevValues) => ({
      ...prevValues,
      [key]: value,
    }));
  };

  const handleEditSubmit = async (code) => {
    try {
      dispatch(setLoading(true));
      const productToUpdate = products.find((product) => product.code === code);
      const { id, ...updatedValues } = editValues;
      dispatch(updateProduct(id, { ...productToUpdate, ...updatedValues }));
      setIsModalVisible(false);
      setEditValues(initialValues);
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        const validationErrors = {};
        error.inner.forEach((err) => {
          validationErrors[err.path] = err.message;
          notification.error({
            message: `${validationErrors[err.path]}`,
          });
        });
        console.log(validationErrors);
      }
    } finally {
      dispatch(setLoading(false));
    }
  };

  const columns = [
    {
      title: "Product Name",
      dataIndex: "name",
      key: "name",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Image",
      dataIndex: "image",
      key: "image",
      render: (text) => (
        <div style={{ width: "50px", height: "50px" }}>
          <img src={text} alt="Product" style={{ width: "100%", height: "100%" }} />
        </div>
      ),
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      render: (text) => <a>{text}$</a>,
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
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <div className="d-flex">
          <EditOutlined className="mx-2" onClick={() => handleEdit(record)} />
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
      <Modal
        title="Edit Product"
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={[
          <Button key="cancel" onClick={() => setIsModalVisible(false)}>
            Cancel
          </Button>,
          <Button
            key="submit"
            type="primary"
            onClick={() => handleEditSubmit(editValues.code)}
          >
            Save
          </Button>,
        ]}
      >
        <Form layout="vertical">
          <Form.Item label="Name">
            <Input
              value={editValues?.name}
              onChange={(e) => handleEditChange("name", e.target.value)}
            />
          </Form.Item>
          <Form.Item label="Price">
            <Input
              value={editValues?.price}
              onChange={(e) => handleEditChange("price", e.target.value)}
            />
          </Form.Item>
          <Form.Item label="Category">
            <Select
              value={editValues?.category}
              onChange={(value) => handleEditChange("category", value)}
            >
              {categories.map((category) => (
                <Select.Option key={category.id} value={category.category}>
                  {category.category}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item label="Code">
            <Input
              value={editValues?.code}
              onChange={(e) => handleEditChange("code", e.target.value)}
            />
          </Form.Item>
          <Form.Item label="Image">
            <img
              src={editValues?.image}
              alt="product"
              width="100"
              height="100"
            />
            <Input
              value={editValues?.image}
              onChange={(e) => handleEditChange("image", e.target.value)}
            />
          </Form.Item>
        </Form>
      </Modal>

      <Search
        type="text"
        placeholder="Search products"
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
        style={{ width: 300, marginBottom: 20 }}
      />
      <CustomTable
        columns={columns}
        dataSource={filteredProducts}
        rowKey={(record) => record.code}
        pagination={{ pageSize: 5 }}
        bordered
        isLoading={loading}
      />
    </>
  );
};

export default ProductTable;
