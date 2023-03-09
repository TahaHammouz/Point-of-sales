import React from "react";
import { storiesOf } from "@storybook/react";
import { Provider } from "react-redux";
import store from "src/redux";
import Items from "./index";
import { Col, Row } from "antd";

const mockItems = [
  {
    id: 1,
    image: "https://via.placeholder.com/100x100",
    name: "Mock Item 1",
    price: 10.99,
  },
  {
    id: 2,
    image: "https://via.placeholder.com/100x100",
    name: "Mock Item 2",
    price: 15.99,
  },
  {
    id: 3,
    image: "https://via.placeholder.com/100x100",
    name: "Mock Item 3",
    price: 20.99,
  },
];

storiesOf("Items", module)
  .addDecorator((story) => <Provider store={store}>{story()}</Provider>)
  .add("default", () => (
    <Row gutter={15}>
      {mockItems.map((item) => (
        <Col span={6} xs={24} lg={5} md={12} sm={6} key={item.id}>
          <Items key={item.id} item={item} />
        </Col>
      ))}
    </Row>
  ));
