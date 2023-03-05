import React, { useState } from "react";
import { useSelector } from "react-redux";
import { InputNumber } from "antd";
import styles from "./CheckoutSummary.module.css";
import Button from "src/components/UI/Button/Button";

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
    <div className={styles["checkout-summary"]} style={{ textAlign: 'left' }}>
      <div className={styles.container}>
        <label>Subtotal: &nbsp;</label>
        <span>{subTotal.toFixed(2)}$</span>
      </div>
      <div className={styles.container}>
        <label>Tax: &nbsp;</label>
        <InputNumber
          value={tax}
          min="0"
          onChange={(value) => setTax(value)}
          formatter={(value) => `${value}%`}
          parser={(value) => value.replace("%", "")}
          size="large"
          className={styles.input}
        />
      </div>
      <div className={styles.container}>
        <label>Discount: &nbsp;</label>
        <InputNumber
          value={discount}
          min="0"
          onChange={(value) => setDiscount(value)}
          formatter={(value) => `${value}%`}
          parser={(value) => value.replace("%", "")}
          size="large"
          className={styles.input}
        />
      </div>

      <div className={styles.container}>
        <label>Tax Amount:&nbsp; </label>
        <span>${taxAmount.toFixed(2)}</span>
      </div>
      <div className={styles.container}>
        <label>Discount Amount: &nbsp;</label>
        <span>${discountAmount.toFixed(2)}</span>
      </div>
      <div className={styles.container}>
        <label className={styles.total}>Total Price: </label>
        <h3>${totalPrice.toFixed(2)}</h3>
      </div>
      <div className={styles.actions}>
        <Button>Cancel</Button>
        <Button>Charge Bill</Button>
      </div>
    </div>
  );
};

export default CheckoutSummary;
