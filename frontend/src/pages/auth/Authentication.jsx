import { redirect } from "react-router-dom";
import AuthForm from "./AuthForm";
import { API_BASE_URL } from "../../constants/api";
const AuthenticationPage = () => {
  return <AuthForm />;
};

export default AuthenticationPage;

export async function action({ request }) {
  const data = await request.formData();
  const authData = {
    username: data.get("username"),
    password: data.get("password"),
  };

  const response = await fetch(
    `${API_BASE_URL}/users?username=${authData.username}&password=${authData.password}`
  );

  if (response.ok) {
    const user = await response.json();
    if (user.length > 0) {
      const fakeToken = "tahahammouztoken";
      localStorage.setItem("token", fakeToken);
      return redirect("/home");
    } else {
      return { status: 401 };
    }
  } else {
    return { status: response.status };
  }
}
