import { Col, Row } from "antd";
import { Fragment } from "react";
import CheckoutCart from "./CheckoutCart";
import POS from "./POS";
import styles from "./Home.module.css";

function Home() {
  return (
    <div style={{ background: "#f5f5f5", padding: "20px" }}>
      <Row gutter={20}>
        <Col span={16}>
          <POS />
        </Col>
        <Col span={7} offset={1}>
          <CheckoutCart />
        </Col>
      </Row>
    </div>
  );
}

export default Home;
