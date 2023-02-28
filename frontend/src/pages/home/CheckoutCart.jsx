import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Table, InputNumber } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import CustomTable from "../../components/UI/Table/Table";
import { addItemToCart,updateCartItemOnServer } from "../../redux/slices/cartSlice";

const CheckoutCart = () => {
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);
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
      render: (text, record) => <a>{text}$</a>,
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
      render: (text, record) => (
        <InputNumber
          min={1}
          
          value={record.quantity}
          onChange={(value) => {
            dispatch(updateCartItemOnServer(record.id, value));
          }}
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
      render: (text, record) => <DeleteOutlined />,
    },
  ];
  console.log(cartItems);
  return (
    <CustomTable
      columns={columns}
      dataSource={cartItems}
      rowKey={(record) => record.id}
      bordered
      pagination={false}
    />
  );
};

export default CheckoutCart;
