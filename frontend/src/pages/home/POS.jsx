import { Col, Row, Button } from "antd";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchProducts } from "../../redux/slices/productSlice";
import styles from "./POS.module.css";
const POS = () => {
  const products = useSelector((state) => state.product.products);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);
  console.log(products);
  return (
    <Row gutter={[16, 16]}>
      {products.map((prod) => (
        <Col span={7} xs={25} key={prod.id}>
          <div className={styles.item}>
            <h4 className={styles.name}>{prod.name}</h4>
            <img src={prod.image} alt="product" height="100" width="100" />
            <h4 className={styles.price}>
              <b>Price : </b>
              {prod.price} $
            </h4>
            <div className="d-flex justify-content-end">
              <Button className={styles.button}>Add To Cart</Button>
            </div>
          </div>
        </Col>
      ))}
    </Row>
  );
};

export default POS;
