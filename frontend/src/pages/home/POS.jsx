import { Col, Row, Button, Input } from "antd";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { fetchProducts } from "../../redux/slices/productSlice";
import { addItemToCart } from "../../redux/slices/cartSlice";
import Items from "./Items";

const POS = () => {
  const [searchValue, setSearchValue] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const products = useSelector((state) => state.product.products);
  const categories = [...new Set(products.map((item) => item.category))];
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <>
      <Input.Search
        placeholder="Search products"
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        style={{ marginBottom: "20px" }}
      />
      <Row gutter={20} style={{ marginBottom: "20px" }}>
        <Col>
          <Button
            type={!selectedCategory ? "primary" : ""}
            onClick={() => setSelectedCategory("")}
          >
            All products
          </Button>
        </Col>
        {categories.map((category) => (
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
      <Row gutter={15}>
        {products
          .filter(
            (item) =>
              item.name.toLowerCase().includes(searchValue.toLowerCase()) &&
              ("" === selectedCategory || item.category === selectedCategory)
          )
          .map((item) => {
            return (
              <Col xs={24} lg={5} md={12} sm={14} key={item.id}>
                <Items item={item} />
              </Col>
            );
          })}
      </Row>
    </>
  );
};

export default POS;
