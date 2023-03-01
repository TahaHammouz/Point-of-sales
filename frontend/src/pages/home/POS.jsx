import { Col, Row, Button } from "antd";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchProducts } from "../../redux/slices/productSlice";
import { addItemToCart } from "../../redux/slices/cartSlice";
import Items from "./Items";

const POS = () => {
  const products = useSelector((state) => state.product.products);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <Row gutter={20}>
      {products.map((item) => {
        return (
          <Col xs={24} lg={9} md={12} sm={14} key={item.id}>
            <Items item={item} />
          </Col>
        );
      })}
    </Row>
  );
};

export default POS;
