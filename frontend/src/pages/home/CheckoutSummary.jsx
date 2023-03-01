import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Button, InputNumber } from "antd";
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
      <br />
      <div className={styles.container}>
        <label>Subtotal:</label>
        <span>{subTotal.toFixed(2)}$</span>
      </div>

      <div className={styles.container}>
        <label>Tax:</label>
        <InputNumber
          value={tax}
          onChange={(value) => setTax(value)}
          formatter={(value) => `${value}%`}
          parser={(value) => value.replace("%", "")}
          size="small"
        />
      </div>
      <div className={styles.container}>
        <label>Discount:</label>
        <InputNumber
          value={discount}
          onChange={(value) => setDiscount(value)}
          formatter={(value) => `${value}%`}
          parser={(value) => value.replace("%", "")}
          size="small"
        />
      </div>
      <div className={styles.container}>
        <label>Tax Amount:</label> <span>${taxAmount.toFixed(2)}</span>
      </div>
      <div className={styles.container}>
        <label>Discount Amount:</label>
        <span>${discountAmount.toFixed(2)}</span>
      </div>
      <hr />
      <div className={styles.container}>
        <label className={styles.total}>Total Price:</label>
        <h4>${totalPrice.toFixed(2)}</h4>
      </div>
      <div>
        <Button type="danger">Cancel</Button>
        <Button type="primary">Payment</Button>
      </div>
    </div>
  );
};

export default CheckoutSummary;
