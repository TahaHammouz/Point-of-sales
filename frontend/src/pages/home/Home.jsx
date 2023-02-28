import { Col, Row } from "antd";
import CheckoutCart from "./CheckoutCart";
import POS from "./POS";
import styles from "./Home.module.css";

function Home() {
  return (
    <div className={styles.home}>
      <Row gutter={20}>
        <Col span={9} className={styles.POS}>
          <POS />
        </Col>
        <Col span={9} offset={1} className={styles.Checkout}>
          <CheckoutCart />
        </Col>
      </Row>
    </div>
  );
}

export default Home;
