import React from "react";
import { storiesOf } from "@storybook/react";
import { withKnobs, text } from "@storybook/addon-knobs";
import { action } from "@storybook/addon-actions";
import classes from "./AuthForm.module.css";

const mockSubmit = (event) => {
  event.preventDefault();
  const formData = new FormData(event.target);
  const username = formData.get("username");
  const password = formData.get("password");
  console.log("Username:", username);
  console.log("Password:", password);
};

storiesOf("AuthForm", module)
  .addDecorator(withKnobs)
  .add("default", () => (
    <main className={classes.auth}>
      <section className={classes.section}>
        <form method="post" className={classes.form} onSubmit={mockSubmit}>
          <h2>Welcome 👋</h2>
          <hr />
          <div>
            <label className={classes.label} htmlFor="username">
              Username
            </label>
            <input
              placeholder="Enter Username"
              className={classes.input}
              id="username"
              name="username"
              value={text("Username", "")}
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
              value={text("Password", "")}
            />
          </div>
          <button className={classes.button} onClick={action("Login clicked")}>
            Login
          </button>
        </form>
      </section>
    </main>
  ));
