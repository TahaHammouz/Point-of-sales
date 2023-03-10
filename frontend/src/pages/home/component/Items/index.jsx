import Button from "src/components/UI/Button/Button";
import React from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "src/redux/slices/cartSlice";
import styles from "./Items.module.css";

const Items = ({ item }) => {
  const dispatch = useDispatch();
  const handleAddToCart = () => {
    const cartItem = {
      id: item.id,
      image: item.image,
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
      <img src={item.image} alt="item" height="100" width="100" />
      <h4 className={styles.name}>{item.name}</h4>
      <h4 className={styles.price}>${item.price}</h4>
      <div className="d-flex justify-content-center">
        <Button onClick={handleAddToCart}>Add To Cart</Button>
      </div>
    </div>
  );
};

export default Items;
