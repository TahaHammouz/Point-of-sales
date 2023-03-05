import { Col, Row } from "antd";
import React from "react";
import Items from "src/pages/home/component/items";

const Products = ({ products, searchValue, selectedCategory }) => {
  return (
    <Row gutter={15}>
      {products
        .filter(
          (item) =>
            item.name.toLowerCase().includes(searchValue.toLowerCase()) &&
            ("" === selectedCategory || item.category === selectedCategory)
        )
        .map((item) => {
          return (
            <Col span={6} xs={24} lg={6} md={12} sm={6} key={item.id}>
              <Items item={item} />
            </Col>
          );
        })}
    </Row>
  );
};

export default Products;
