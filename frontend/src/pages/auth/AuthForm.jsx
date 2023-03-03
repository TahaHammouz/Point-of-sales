import { Form } from "react-router-dom";
import classes from "./AuthForm.module.css";

const AuthForm = () => {
  return (
    <main className={classes.auth}>
      <section>
        <Form method="post" className={classes.form} >
          <div label>
            <label className={classes.label} htmlFor="username">username</label>
            <input id="username" name="username" />
          </div>
          <div className={classes.control}>
            <label className={classes.label} htmlFor="password">Password</label>
            <input className={classes.input} type="password" id="password" name="password" />
          </div>
          <button className={classes.button}>Login</button>
        </Form>
      </section>
    </main>
  );
};

export default AuthForm;
