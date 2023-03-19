import { Form } from "react-router-dom";
import classes from "./AuthForm.module.css";
import React from "react";

const AuthForm = () => {
  return (
    <main className={classes.auth}>
      <section className={classes.section}>
        <Form method="post" className={classes.form}>
          <h2>Welcome 👋</h2>
          <hr />
          <div label>
            <label className={classes.label} htmlFor="username">
              username
            </label>
            <input
              placeholder="Enter Username"
              className={classes.input}
              id="username"
              name="username"
            />
          </div>
          <div className={classes.control}>
            <label className={classes.label} htmlFor="password">
              Password
            </label>
            <input
              placeholder="Enter Password"
              className={classes.input}
              type="password"
              id="password"
              name="password"
            />
          </div>
          <button className={classes.button}>Login</button>
        </Form>
      </section>
    </main>
  );
};

export default AuthForm;
