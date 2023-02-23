// import MainNavigation from "../../components/MainNavigation/MainNavigation";
import classes from "./Error.module.css";
import { useNavigate } from "react-router-dom";
function ErrorPage() {
  const navigate = useNavigate();
  const errorHandler = () => {
  navigate("/home")
}
  return (
    <>
      <main className={classes.main}>
        <h1>An error occurred!</h1>
        <p>Could not find this page!</p>
        <button onClick={errorHandler}>Go Home</button>
      </main>
    </>
  );
}

export default ErrorPage;
