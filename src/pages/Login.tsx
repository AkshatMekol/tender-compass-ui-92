import { useNavigate } from "react-router-dom";
import LoginPage from "../components/LoginPage";

const Login = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    console.log("Logged in! 2");

    navigate("/smart-search");
  };

  return <LoginPage onLogin={handleLogin} />;
};

export default Login;
