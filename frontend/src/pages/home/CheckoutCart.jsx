import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Table, InputNumber } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import CustomTable from "../../components/UI/Table/Table";

const CheckoutCart = () => {
  const dispatch = useDispatch();

  const products = [
    { id: 1, name: "Product 1", price: 10.00, quantity: 2 },
    { id: 2, name: "Product 2", price: 15.00, quantity: 1 },
    { id: 3, name: "Product 3", price: 20.00, quantity: 3 },
    { id: 3, name: "Product 3", price: 20.00, quantity: 3 },
    { id: 3, name: "Product 3", price: 20.00, quantity: 3 },
    { id: 3, name: "Product 3", price: 20.00, quantity: 3 },
    { id: 3, name: "Product 3", price: 20.00, quantity: 3 },
    { id: 3, name: "Product 3", price: 20.00, quantity: 3 },
    { id: 3, name: "Product 3", price: 20.00, quantity: 3 },
    { id: 3, name: "Product 3", price: 20.00, quantity: 3 },
  ];

  const columns = [
    {
      title: "Product Name",
      dataIndex: "name",
    },
    {
      title: "Price",
      dataIndex: "price",
      render: (text, record) => `$${record.price.toFixed(2)}`,
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      render: (text, record) => (
        <InputNumber
          min={1}
          max={10}
          value={record.quantity}
         // onChange={(value) => dispatch(updateCartQuantity(record.id, value))}
        />
      ),
    },
    {
      title: "Total",
      dataIndex: "total",
      render: (text, record) => `$${(record.price * record.quantity).toFixed(2)}`,
    },
    {
      title: "",
      dataIndex: "actions",
      render: (text, record) => (
        <Button
          type="link"
          danger
          onClick={() => dispatch(removeFromCart(record.id))}
        >
          <DeleteOutlined />
        </Button>
      ),
    },
  ];

  const subTotal = products.reduce(
    (accumulator, product) => accumulator + product.price * product.quantity,
    0
  );

  const tax = subTotal * 0.1; // 10% tax rate
  const discount = 5; // $5 discount

  const total = subTotal + tax - discount;

  return (
    <>
      <CustomTable
        columns={columns}
        dataSource={products}
        pagination={false}
      />
      <div className="checkout-totals">
        <div className="checkout-totals__row">
          <h5>Subtotal:</h5>
          <span>${subTotal.toFixed(2)}</span>
        </div>
        <div className="checkout-totals__row">
          <h5>Tax:</h5>
          <span>${tax.toFixed(2)}</span>
        </div>
        <div className="checkout-totals__row">
          <h5>Discount:</h5>
          <span>${discount.toFixed(2)}</span>
        </div>
        <div className="checkout-totals__row--total">
          <h4>Total:</h4>
          <span>${total.toFixed(2)}</span>
        </div>
      </div>
    </>
  );
};

export default CheckoutCart;
