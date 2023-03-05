import { Col, Row, Button } from "antd";
import React from "react";

const Categories = ({ selectedCategory, setSelectedCategory, categories }) => {
  return (
    <Row gutter={20} style={{ marginBottom: "20px" }}>
      <Col>
        <Button
          type={!selectedCategory ? "primary" : ""}
          onClick={() => setSelectedCategory("")}
        >
          All products
        </Button>
      </Col>
      {Array.isArray(categories) &&
        categories.map((category) => (
          <Col key={category}>
            <Button
              type={category === selectedCategory ? "primary" : ""}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </Button>
          </Col>
        ))}
    </Row>
  );
};

export default Categories;
