import { Col, Row, Button, Input } from "antd";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchProducts } from "../../redux/slices/productSlice";
import { addItemToCart } from "../../redux/slices/cartSlice";
import Items from "./Items";

const POS = () => {
  const [searchValue, setSearchValue] = React.useState("");
  const products = useSelector((state) => state.product.products);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <>
      <div>
        <Input.Search
          placeholder="Search products"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          style={{ marginBottom: "20px" }}
        />
      </div>
      <Row gutter={20}>
        {products
          .filter((item) =>
            item.name.toLowerCase().includes(searchValue.toLowerCase())
          )
          .map((item) => {
            return (
              <Col xs={24} lg={7} md={12} sm={14} key={item.id}>
                <Items item={item} />
              </Col>
            );
          })}
      </Row>
    </>
  );
};

export default POS;
