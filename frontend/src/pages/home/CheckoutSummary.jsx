import React, { useState } from "react";
import { useSelector } from "react-redux";
import { InputNumber } from "antd";
import styles from "./CheckoutSummary.module.css";

const CheckoutSummary = () => {
  const cartItems = useSelector((state) => state.cart.items);
  const [tax, setTax] = useState(0);
  const [discount, setDiscount] = useState(0);

  const subTotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const taxAmount = subTotal * (tax / 100);
  const discountAmount = subTotal * (discount / 100);
  const totalPrice = subTotal + taxAmount - discountAmount;

  return (
      <div className={styles["checkout-summary"]}>
         
      <div>
        <label>Subtotal:</label>
        <span>{subTotal.toFixed(2)}$</span>
      </div>
      <div>
        <label>Tax:</label>
        <InputNumber
          value={tax}
          onChange={(value) => setTax(value)}
          formatter={(value) => `${value}%`}
          parser={(value) => value.replace("%", "")}
          size="small"
         
        />
      </div>
      <div>
        <label>Discount:</label>
        <InputNumber
          value={discount}
          onChange={(value) => setDiscount(value)}
          formatter={(value) => `${value}%`}
          parser={(value) => value.replace("%", "")}
          size="small"
        />
      </div>
      <div>
        <label>Tax Amount:</label> <span>{taxAmount.toFixed(2)}$</span>
      </div>
      <div>
        <label>Discount Amount:</label>
        <span>{discountAmount.toFixed(2)}$</span>
      </div>
      <div>
        <label>Total Price:</label> <h3>{totalPrice.toFixed(2)}$</h3>
      </div>
    </div>
  );
};

export default CheckoutSummary;
