import React from "react";
import { Link } from "react-router-dom";
import Button from "src/components/UI/Button/Button";
import styles from "./LandPage.module.css";

const LandPage = () => {
  return (
    <section className={styles.banner}>
      <div className={styles.content}>
        <h3>
          React POS
          <br></br> Manage your supermarket
        </h3>
        <p></p>
        <Link to="/home">
          <Button>shop now </Button>
        </Link>
      </div>
    </section>
  );
};

export default LandPage;
