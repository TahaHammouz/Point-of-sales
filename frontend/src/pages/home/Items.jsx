import { Button } from "antd";
import React from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/slices/cartSlice";
import styles from "./Items.module.css";

const Items = ({ item }) => {
  const dispatch = useDispatch();
  const handleAddToCart = () => {
    const cartItem = {
      id: item.id,
      name: item.name,
      price: item.price,
      quantity: 1,
      total: item.price * 1,
    };
    dispatch(addToCart(cartItem));
    console.log(cartItem);
  };

  return (
    <div className={styles.item}>
      <h4>{item.name}</h4>
      <img src={item.image} alt="item" height="100" width="100" />
      <h4>
        <b>Price : </b>
        {item.price}$
      </h4>
      <div className="d-flex justify-content-end">
        <Button onClick={handleAddToCart}>Add To Cart</Button>
      </div>
    </div>
  );
};

export default Items;
