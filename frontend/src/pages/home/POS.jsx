import { Col, Row, Button, Input } from "antd";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { fetchProducts } from "../../redux/slices/productSlice";
import { addItemToCart, fetchCartItems } from "../../redux/slices/cartSlice";
import Items from "./Items";
import { fetchCategories } from "../../redux/slices/categorySlice";

const POS = () => {
  const [searchValue, setSearchValue] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const products = useSelector((state) => state.product.products);
  const categories = [...new Set(products.map((item) => item.category))];
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProducts());
    dispatch(fetchCartItems());
    dispatch(fetchCategories());
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
    </>
  );
};

export default POS;
