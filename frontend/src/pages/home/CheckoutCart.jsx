import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Table, InputNumber } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import CustomTable from "../../components/UI/Table/Table";
import {
  removeCartItem,
  updateCartItemOnServer,
  fetchCartItems,
} from "../../redux/slices/cartSlice";

const CheckoutCart = () => {
  const cartItems = useSelector((state) => state.cart.items);
  const loading = useSelector((state) => state.cart.loading);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCartItems());
  }, [dispatch]);

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
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      render: (text) => <a>{text}$</a>,
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
        />
      ),
    },
    {
      title: "Total",
      dataIndex: "total",
      key: "total",
      render: (text, record) => <a>{record.total}$</a>,
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
    <CustomTable
      columns={columns}
      dataSource={cartItems}
      rowKey={(record) => record.id}
      bordered
      pagination={false}
      isLoading={loading}
    />
  );
};

export default CheckoutCart;
