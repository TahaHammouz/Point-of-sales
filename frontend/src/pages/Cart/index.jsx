import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { InputNumber } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import CustomTable from "src/components/UI/Table/Table";
import CheckoutSummary from "./component/CheckoutSummary";
import {
  removeCartItem,
  updateCartItemOnServer,
} from "src/redux/slices/cartSlice";
import styles from "./component/CheckoutSummary/CheckoutSummary.module.css";

const Cart = () => {
  const cartItems = useSelector((state) => state.cart.items);
  const loading = useSelector((state) => state.cart.loading);
  const dispatch = useDispatch();

  const handleQuantityChange = (record, value) => {
    dispatch(updateCartItemOnServer(record.id, value));
  };

  const handleRemoveItem = (record) => {
    dispatch(removeCartItem(record.id));
  };

  const columns = [
    {
      title: "Product Name",
      dataIndex: "name",
      key: "name",
      render: (text) => <h4>{text}</h4>,
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      render: (text) => <h4>${text}</h4>,
    },
    {
      title: "Image",
      dataIndex: "image",
      key: "image",
      render: (image, record) => <img src={image} height="60" width="60" />,
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
      render: (text, record) => (
        <InputNumber
          min={1}
          value={record.quantity}
          onChange={(value) => handleQuantityChange(record, value)}
          className={styles.input}
        />
      ),
    },
    {
      title: "Total",
      dataIndex: "total",
      key: "total",
      render: (text, record) => <h4>${text}</h4>,
    },
    {
      title: "",
      dataIndex: "actions",
      key: "actions",
      render: (text, record) => (
        <DeleteOutlined onClick={() => handleRemoveItem(record)} />
      ),
    },
  ];

  return (
    <>
      <div>
        <CustomTable
          columns={columns}
          dataSource={cartItems}
          rowKey={(record) => record.id}
          bordered
          pagination={false}
          isLoading={loading}
          height={299}
          
        />
        <hr />
        <CheckoutSummary />
      </div>
    </>
  );
};

export default Cart;
