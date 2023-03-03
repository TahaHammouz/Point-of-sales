import classes from "./Auth.module.css";
import { Form } from "react-router-dom";

const AuthForm = () => {
  return (
    <main className={classes.auth}>
      <section>
        <Form method="post">
          <div className={classes.control}>
            <label htmlFor="username">username</label>
            <input id="username" name="username" />
          </div>
          <div className={classes.control}>
            <label htmlFor="password">Password</label>
            <input type="password" id="password" name="password" />
          </div>
          <button>Login</button>
        </Form>
      </section>
    </main>
  );
};

export default AuthForm;
