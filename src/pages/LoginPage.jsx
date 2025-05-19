// src/pages/LoginPage.jsx
import AuthForm from "../components/AuthForm";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const navigate = useNavigate();

  const handleLogin = async (data) => {
    try {
      const res = await axios.post(
        "http://localhost:9095/api/auth/login",
        data
      );
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("username", data.username);
      navigate("/dashboard");
    } catch (err) {
      alert("Invalid credentials");
    }
  };

  return (
    <AuthForm onSubmit={handleLogin} formTitle="Login" buttonText="Login" />
  );
};

export default LoginPage;
